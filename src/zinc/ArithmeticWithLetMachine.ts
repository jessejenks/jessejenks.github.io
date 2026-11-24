import { instr, int, paren, span } from "./render";
import { BasicStackMachine } from "./StackMachine";
import {
    StackMachineRenderer as BaseStackMachineRenderer,
    instructionColumn,
    stackColumn,
} from "./StackMachineRenderer";

export const enum TokenKind {
    EOF,
    LParen,
    RParen,
    Star,
    Plus,
    Dash,
    Equal,
    Int,
    Identifier,
    Let,
    In,
}

export type Token =
    | {
          kind:
              | TokenKind.EOF
              | TokenKind.LParen
              | TokenKind.RParen
              | TokenKind.Star
              | TokenKind.Plus
              | TokenKind.Dash
              | TokenKind.Equal
              | TokenKind.Let
              | TokenKind.In;
      }
    | { kind: TokenKind.Identifier; name: string }
    | { kind: TokenKind.Int; value: number };

export class Tokenizer {
    protected index = 0;
    protected row = 1;
    protected col = 1;
    protected currToken: Token | null = null;

    constructor(protected input: string = "") {}

    setInput(input: string) {
        this.index = 0;
        this.row = 1;
        this.col = 1;
        this.currToken = null;
        this.input = input;
    }

    eof(): boolean {
        if (this.currToken !== null) {
            return this.currToken.kind === TokenKind.EOF;
        }
        this.skipWhiteSpace();
        return this.index >= this.input.length;
    }

    peek(): Token {
        if (this.currToken === null) {
            this.currToken = this.getNextToken();
        }
        return this.currToken;
    }

    next(): Token {
        if (this.currToken === null) {
            return this.getNextToken();
        }
        const node = this.currToken;
        this.currToken = null;
        return node;
    }

    protected getNextToken(): Token {
        if (this.eof()) {
            return { kind: TokenKind.EOF };
        }

        switch (this.char()) {
            case 40:
                this.index++;
                return { kind: TokenKind.LParen };
            case 41:
                this.index++;
                return { kind: TokenKind.RParen };
            case 42:
                this.index++;
                return { kind: TokenKind.Star };
            case 43:
                this.index++;
                return { kind: TokenKind.Plus };
            case 45:
                this.index++;
                return { kind: TokenKind.Dash };
            case 61:
                this.index++;
                return { kind: TokenKind.Equal };
            default:
                return this.intOrIdentifier();
        }
    }

    protected intOrIdentifier(): Token {
        let c = this.char();
        if (c === 48) {
            this.index++;
            return { kind: TokenKind.Int, value: 0 };
        }

        const start = this.index;
        if (49 <= c && c <= 57) {
            this.index++;
            c = this.char();
            while (48 <= c && c <= 57) {
                this.index++;
                c = this.char();
            }
            const value = Number.parseInt(this.input.slice(start, this.index));
            return { kind: TokenKind.Int, value };
        }

        if (97 <= c && c <= 122) {
            this.index++;
            c = this.char();
            while ((97 <= c && c <= 122) || (65 <= c && c <= 90)) {
                this.index++;
                c = this.char();
            }
            const name = this.input.slice(start, this.index);
            switch (name) {
                case "let":
                    return { kind: TokenKind.Let };
                case "in":
                    return { kind: TokenKind.In };
                default:
                    return { kind: TokenKind.Identifier, name };
            }
        }

        throw new Error(`Unexpected character "${this.input.charAt(this.index)}" @ (${this.row}, ${this.col})`);
    }

    protected skipWhiteSpace() {
        while (this.index < this.input.length) {
            switch (this.char()) {
                case 9:
                case 13:
                case 32:
                    this.index++;
                    this.col++;
                    break;
                case 10:
                    this.index++;
                    this.row++;
                    this.col = 1;
                    break;
                default:
                    return;
            }
        }
    }

    readWhiteSpace() {
        const start = this.index;
        this.skipWhiteSpace();
        return { text: this.input.slice(start, this.index) };
    }

    protected char(): number {
        return this.input.charCodeAt(this.index);
    }
}

function tokenToString(tok: Token): string {
    switch (tok.kind) {
        case TokenKind.EOF:
            return "<eof>";
        case TokenKind.LParen:
            return "(";
        case TokenKind.RParen:
            return ")";
        case TokenKind.Star:
            return "*";
        case TokenKind.Plus:
            return "+";
        case TokenKind.Dash:
            return "-";
        case TokenKind.Int:
            return tok.value.toString();
        case TokenKind.Equal:
            return "=";
        case TokenKind.Identifier:
            return tok.name;
        case TokenKind.Let:
            return "let";
        case TokenKind.In:
            return "in";
    }
}

const PREFIX_BINDING_POWER = { [TokenKind.Dash]: 5 };

const INFIX_BINDING_POWER = {
    [TokenKind.Plus]: [1, 2] as const,
    [TokenKind.Dash]: [1, 2] as const,
    [TokenKind.Star]: [3, 4] as const,
};

export const enum UnOp {
    Negate,
}

export const enum BinOp {
    Add,
    Sub,
    Mul,
}

const TOK_TO_UN_OP = {
    [TokenKind.Dash]: UnOp.Negate,
};

const TOK_TO_BIN_OP = {
    [TokenKind.Plus]: BinOp.Add,
    [TokenKind.Dash]: BinOp.Sub,
    [TokenKind.Star]: BinOp.Mul,
};

export const enum ExpressionKind {
    Int,
    UnOp,
    BinOp,
    Identifier,
    LetIn,
}

export type Expression =
    | { kind: ExpressionKind.Int; value: number }
    | { kind: ExpressionKind.UnOp; op: UnOp; expr: Expression }
    | { kind: ExpressionKind.BinOp; op: BinOp; left: Expression; right: Expression }
    | { kind: ExpressionKind.Identifier; name: string }
    | { kind: ExpressionKind.LetIn; variable: string; expr: Expression; body: Expression };

export class Parser {
    protected stream: Tokenizer;

    constructor() {
        this.stream = new Tokenizer();
    }

    parse(input: string): Expression {
        this.stream.setInput(input);
        return this.expression(0);
    }

    protected expression(minBp: number) {
        let left = this.nud();
        while (minBp < this.lbp()) {
            left = this.led(left);
        }
        return left;
    }

    protected lbp(): number {
        const tok = this.stream.peek();
        switch (tok.kind) {
            case TokenKind.Plus:
            case TokenKind.Dash:
            case TokenKind.Star:
                return INFIX_BINDING_POWER[tok.kind][0];
            default:
                return 0;
        }
    }

    protected nud(): Expression {
        const tok = this.stream.next();
        switch (tok.kind) {
            case TokenKind.LParen: {
                const expr = this.expression(0);
                const next = this.stream.next();
                if (next.kind !== TokenKind.RParen) {
                    throw new Error(`Expected closing parentheses, got "${tokenToString(next)}"`);
                }
                return expr;
            }
            case TokenKind.Dash: {
                const rbp = PREFIX_BINDING_POWER[tok.kind];
                const expr = this.expression(rbp);
                return { kind: ExpressionKind.UnOp, op: TOK_TO_UN_OP[tok.kind], expr };
            }
            case TokenKind.Int:
                return { kind: ExpressionKind.Int, value: tok.value };
            case TokenKind.Identifier:
                return { kind: ExpressionKind.Identifier, name: tok.name };
            case TokenKind.Let:
                return this.letIn();
            case TokenKind.EOF:
                throw new Error(`Unexpected end of input`);
            default:
                throw new Error(`Unexpected token "${tokenToString(tok)}"`);
        }
    }

    protected led(left: Expression): Expression {
        const tok = this.stream.next();
        switch (tok.kind) {
            case TokenKind.Plus:
            case TokenKind.Dash:
            case TokenKind.Star: {
                const [, rbp] = INFIX_BINDING_POWER[tok.kind];
                const right = this.expression(rbp);
                return { kind: ExpressionKind.BinOp, op: TOK_TO_BIN_OP[tok.kind], left, right };
            }
            default:
                throw new Error(`Expected infix operator, got "${tokenToString(tok)}"`);
        }
    }

    protected letIn(): Expression {
        // already read let
        let tok = this.stream.next();
        if (tok.kind !== TokenKind.Identifier) {
            throw new Error(`Expected an identifier after 'let' but got ${tokenToString(tok)}`);
        }
        const variable = tok.name;
        tok = this.stream.next();
        if (tok.kind !== TokenKind.Equal) {
            throw new Error(`Expected an '=' while parsing let expression but got ${tokenToString(tok)}`);
        }
        const expr = this.expression(0);
        tok = this.stream.next();
        if (tok.kind !== TokenKind.In) {
            throw new Error(`Expected an 'in' while parsing let expression but got ${tokenToString(tok)}`);
        }
        const body = this.expression(0);
        return { kind: ExpressionKind.LetIn, variable, expr, body };
    }
}

export const enum InstrKind {
    Push,
    Prim,
    Access,
    Bind,
    Drop,
}

export const enum PrimOp {
    Negate,
    Add,
    Sub,
    Mul,
}

export type Instr =
    | { kind: InstrKind.Push; value: number }
    | { kind: InstrKind.Prim; op: PrimOp }
    | { kind: InstrKind.Access; index: number }
    | { kind: InstrKind.Bind }
    | { kind: InstrKind.Drop };

export class Compiler {
    protected instructions: Instr[];

    constructor() {
        this.instructions = [];
    }

    compile(expr: Expression) {
        this.instructions.length = 0;
        this.compileExpr(expr, []);
    }

    getInstructions(): readonly Instr[] {
        return this.instructions;
    }

    protected compileExpr(expr: Expression, names: string[]) {
        switch (expr.kind) {
            case ExpressionKind.Int:
                this.instructions.push({ kind: InstrKind.Push, value: expr.value });
                break;
            case ExpressionKind.UnOp:
                this.compileExpr(expr.expr, names);
                switch (expr.op) {
                    case UnOp.Negate:
                        this.instructions.push({ kind: InstrKind.Prim, op: PrimOp.Negate });
                        break;
                }
                break;
            case ExpressionKind.BinOp:
                this.compileExpr(expr.left, names);
                this.compileExpr(expr.right, names);
                switch (expr.op) {
                    case BinOp.Add:
                        this.instructions.push({ kind: InstrKind.Prim, op: PrimOp.Add });
                        break;
                    case BinOp.Sub:
                        this.instructions.push({ kind: InstrKind.Prim, op: PrimOp.Sub });
                        break;
                    case BinOp.Mul:
                        this.instructions.push({ kind: InstrKind.Prim, op: PrimOp.Mul });
                        break;
                }
                break;
            case ExpressionKind.Identifier: {
                const index = names.lastIndexOf(expr.name);
                if (index < 0) {
                    throw new Error(`Unknown identifier ${expr.name}`);
                }
                this.instructions.push({ kind: InstrKind.Access, index: names.length - 1 - index });
                break;
            }
            case ExpressionKind.LetIn:
                this.compileExpr(expr.expr, names);
                this.instructions.push({ kind: InstrKind.Bind });
                names.push(expr.variable);
                this.compileExpr(expr.body, names);
                names.pop();
                this.instructions.push({ kind: InstrKind.Drop });
        }
    }
}

export class StackMachine extends BasicStackMachine<Instr, number> {
    private env: number[];

    constructor() {
        super();
        this.env = [];
    }

    get hasHalted(): boolean {
        return this.pc >= this.instructions.length;
    }

    step() {
        const instruction = this.instructions[this.pc];
        switch (instruction.kind) {
            case InstrKind.Push:
                this.stack.push(instruction.value);
                this.pc++;
                break;
            case InstrKind.Prim: {
                const right = this.pop();
                switch (instruction.op) {
                    case PrimOp.Negate:
                        this.stack.push(-right);
                        break;
                    case PrimOp.Add: {
                        const left = this.pop();
                        this.stack.push(left + right);
                        break;
                    }
                    case PrimOp.Sub: {
                        const left = this.pop();
                        this.stack.push(left - right);
                        break;
                    }
                    case PrimOp.Mul: {
                        const left = this.pop();
                        this.stack.push(left * right);
                        break;
                    }
                }
                this.pc++;
                break;
            }
            case InstrKind.Access:
                if (instruction.index >= this.env.length) {
                    throw new Error(`Cannot access index ${instruction.index}`);
                }
                this.stack.push(this.env[this.env.length - 1 - instruction.index]);
                this.pc++;
                break;
            case InstrKind.Bind:
                this.env.push(this.pop());
                this.pc++;
                break;
            case InstrKind.Drop:
                if (this.env.length === 0) {
                    throw new Error("Cannot drop from empty environment");
                }
                this.env.pop();
                this.pc++;
                break;
        }
    }

    envView(): readonly number[] {
        return this.env;
    }

    peek(): number {
        if (this.stack.length === 0) {
            throw new Error("Empty stack");
        }
        return this.stack[this.stack.length - 1];
    }
}

function instructionToLabel(parent: HTMLElement, instruction: Instr) {
    switch (instruction.kind) {
        case InstrKind.Push:
            parent.append(instr("Push"), paren("("), int(instruction.value), paren(")"));
            break;
        case InstrKind.Prim:
            parent.append(instr("Prim"), paren("("));
            switch (instruction.op) {
                case PrimOp.Negate:
                    parent.append(instr("negate"));
                    break;
                case PrimOp.Add:
                    parent.append(instr("add"));
                    break;
                case PrimOp.Sub:
                    parent.append(instr("sub"));
                    break;
                case PrimOp.Mul:
                    parent.append(instr("mul"));
                    break;
            }
            parent.append(paren(")"));
            break;
        case InstrKind.Access:
            parent.append(instr("Access"), paren("("), span(`#${instruction.index}`, "variable"), paren(")"));
            break;
        case InstrKind.Bind:
            parent.append(instr("Bind"));
            break;
        case InstrKind.Drop:
            parent.append(instr("Drop"));
            break;
    }
}

export class StackMachineRenderer extends BaseStackMachineRenderer<Instr, number, StackMachine> {
    constructor(parentElement: HTMLElement) {
        const m = new StackMachine();
        super(parentElement, m, [
            instructionColumn(m, instructionToLabel),
            stackColumn(
                "Stack",
                () => m.stackView(),
                (p, n) => p.append(int(n)),
            ),
            stackColumn(
                "Env",
                () => m.envView(),
                (p, n) => p.append(int(n)),
                true,
            ),
        ]);
    }
}

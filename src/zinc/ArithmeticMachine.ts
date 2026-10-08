import { BasicStackMachine } from "./StackMachine";
import {
    StackMachineRenderer as BaseStackMachineRenderer,
    instructionColumn,
    stackColumn,
} from "./StackMachineRenderer";

const enum TokenKind {
    EOF,
    LParen,
    RParen,
    Star,
    Plus,
    Dash,
    Int,
}

type Token =
    | { kind: TokenKind.EOF | TokenKind.LParen | TokenKind.RParen | TokenKind.Star | TokenKind.Plus | TokenKind.Dash }
    | { kind: TokenKind.Int; value: number };

class Tokenizer {
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
            default:
                return this.int();
        }
    }

    protected int(): Token {
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
}

export type Expression =
    | { kind: ExpressionKind.Int; value: number }
    | { kind: ExpressionKind.UnOp; op: UnOp; expr: Expression }
    | { kind: ExpressionKind.BinOp; op: BinOp; left: Expression; right: Expression };

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
}

export const enum InstrKind {
    Push,
    Prim,
}

export const enum PrimOp {
    Negate,
    Add,
    Sub,
    Mul,
}

export type Instr = { kind: InstrKind.Push; value: number } | { kind: InstrKind.Prim; op: PrimOp };

export class Compiler {
    protected instructions: Instr[];

    constructor() {
        this.instructions = [];
    }

    compile(expr: Expression) {
        this.instructions.length = 0;
        this.compileExpr(expr);
    }

    getInstructions(): readonly Instr[] {
        return this.instructions;
    }

    protected compileExpr(expr: Expression) {
        switch (expr.kind) {
            case ExpressionKind.Int:
                this.instructions.push({ kind: InstrKind.Push, value: expr.value });
                break;
            case ExpressionKind.UnOp:
                this.compileExpr(expr.expr);
                switch (expr.op) {
                    case UnOp.Negate:
                        this.instructions.push({ kind: InstrKind.Prim, op: PrimOp.Negate });
                        break;
                }
                break;
            case ExpressionKind.BinOp:
                this.compileExpr(expr.left);
                this.compileExpr(expr.right);
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
        }
    }
}

export class StackMachine extends BasicStackMachine<Instr, number> {
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
        }
    }

    peek(): number {
        if (this.stack.length === 0) {
            throw new Error("Empty stack");
        }
        return this.stack[this.stack.length - 1];
    }
}

function instructionToLabel(instruction: Instr): string {
    switch (instruction.kind) {
        case InstrKind.Push:
            return `Push(${instruction.value})`;
        case InstrKind.Prim:
            switch (instruction.op) {
                case PrimOp.Negate:
                    return "Prim(negate)";
                case PrimOp.Add:
                    return "Prim(add)";
                case PrimOp.Sub:
                    return "Prim(sub)";
                case PrimOp.Mul:
                    return "Prim(mul)";
            }
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
                (n) => n.toString(),
            ),
        ]);
    }
}

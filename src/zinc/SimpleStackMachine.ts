import { BasicStackMachine } from "./StackMachine";
import {
    StackMachineRenderer as BaseStackMachineRenderer,
    instructionColumn,
    stackColumn,
} from "./StackMachineRenderer";

const enum TokenKind {
    EOF,
    Push,
    Pop,
    Int,
    Semi,
}

type Token =
    | { kind: TokenKind.EOF | TokenKind.Push | TokenKind.Pop | TokenKind.Semi }
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

        let c = this.char();
        if (c === 59) {
            this.index++;
            return { kind: TokenKind.Semi };
        }

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
            const name = this.input.slice(start, this.index).toLowerCase();
            switch (name) {
                case "push":
                    return { kind: TokenKind.Push };
                case "pop":
                    return { kind: TokenKind.Pop };
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
        case TokenKind.Push:
            return "push";
        case TokenKind.Pop:
            return "pop";
        case TokenKind.Semi:
            return ";";
        case TokenKind.Int:
            return tok.value.toString();
    }
}

export const enum InstrKind {
    Push,
    Pop,
}

export type Instr = { kind: InstrKind.Push; value: number } | { kind: InstrKind.Pop };

export class Parser {
    protected stream: Tokenizer;

    constructor() {
        this.stream = new Tokenizer();
    }

    parse(input: string): Instr[] {
        this.stream.setInput(input);
        return this.instructions();
    }

    protected instructions(): Instr[] {
        const instrs: Instr[] = [this.instruction()];
        while (this.stream.peek().kind === TokenKind.Semi) {
            this.stream.next();
            instrs.push(this.instruction());
        }
        if (this.stream.peek().kind !== TokenKind.EOF) {
            throw new Error(`Expected end of input, got "${tokenToString(this.stream.peek())}"`);
        }
        return instrs;
    }

    protected instruction(): Instr {
        const tok = this.stream.next();
        if (tok.kind === TokenKind.Pop) {
            return { kind: InstrKind.Pop };
        }

        if (tok.kind === TokenKind.Push) {
            const value = this.stream.next();
            if (value.kind !== TokenKind.Int) {
                throw new Error(`Expected an integer, but got "${tokenToString(value)}"`);
            }
            return { kind: InstrKind.Push, value: value.value };
        }
        throw new Error(`Expected a 'push' or 'pop', but got "${tokenToString(tok)}"`);
    }
}

export class Compiler {
    instructions: Instr[];
    constructor() {
        this.instructions = [];
    }
    compile(expression: Instr[]): void {
        this.instructions = expression;
    }
    getInstructions(): readonly Instr[] {
        return this.instructions;
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
            case InstrKind.Pop: {
                this.pop();
                this.pc++;
                break;
            }
        }
    }
}

function instructionToLabel(instruction: Instr): string {
    switch (instruction.kind) {
        case InstrKind.Push:
            return `Push(${instruction.value})`;
        case InstrKind.Pop:
            return "Pop";
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

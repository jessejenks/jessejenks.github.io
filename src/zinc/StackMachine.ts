export interface InspectableMachine<I, V> {
    readonly programCounter: number;
    readonly hasHalted: boolean;
    clear(): void;
    reset(): void;
    load(instructions: readonly I[]): void;
    instructionView(): readonly I[];
    step(): void;
}

export abstract class BasicStackMachine<I, V> implements InspectableMachine<I, V> {
    protected pc: number;
    protected instructions: readonly I[];
    protected stack: V[];

    constructor() {
        this.pc = 0;
        this.instructions = [];
        this.stack = [];
    }

    get programCounter(): number {
        return this.pc;
    }

    abstract get hasHalted(): boolean;

    clear(): void {
        this.pc = 0;
        this.stack.length = 0;
        this.instructions = [];
    }

    reset(): void {
        this.pc = 0;
        this.stack.length = 0;
    }

    load(instructions: readonly I[]): void {
        this.instructions = instructions;
    }

    protected pop(): V {
        if (this.stack.length === 0) {
            throw new Error("Cannot pop from empty stack");
        }
        return this.stack.pop()!;
    }

    instructionView(): readonly I[] {
        return this.instructions;
    }

    stackView(): readonly V[] {
        return this.stack;
    }

    abstract step(): void;
}

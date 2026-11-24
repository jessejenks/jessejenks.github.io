import { list, pure } from "zinc";
import { listToArray } from "./listUtils";
import { InspectableMachine } from "./StackMachine";
import { instructionColumn, stackColumn, StackMachineRenderer } from "./StackMachineRenderer";
import { instr, paren, punc, span } from "./render";

export class MarkedKrivineMachine
    extends pure.markedKrivine.Machine
    implements InspectableMachine<pure.markedKrivine.Instruction, pure.markedKrivine.Closure>
{
    get programCounter(): number {
        return this.pc;
    }

    get hasHalted(): boolean {
        return this.halted;
    }

    clear(): void {
        this.load([]);
    }

    reset(): void {
        this.load(this.instructions);
    }

    instructionView(): readonly pure.markedKrivine.Instruction[] {
        return this.instructions;
    }

    stackView(): readonly pure.markedKrivine.Closure[] {
        return listToArray(this.stack);
    }

    envView(): readonly pure.markedKrivine.Closure[] {
        return listToArray(this.env);
    }

    getFinalExpression(compiler: pure.markedKrivine.Compiler): pure.ast.Expression {
        return this.readback(compiler.getReadback());
    }
}

function instructionToLabel(parent: HTMLElement, instruction: pure.markedKrivine.Instruction) {
    switch (instruction.kind) {
        case pure.markedKrivine.InstructionKind.Access:
            parent.append(instr("Access"), paren("("), span(`#${instruction.n}`, "variable"), paren(")"));
            break;
        case pure.markedKrivine.InstructionKind.Push:
            parent.append(instr("Push"), paren("("), span(`@${instruction.addr}`, "pointer"), paren(")"));
            break;
        case pure.markedKrivine.InstructionKind.Reduce:
            parent.append(instr("Reduce"), paren("("), span(`@${instruction.addr}`, "pointer"), paren(")"));
            break;
        case pure.markedKrivine.InstructionKind.Grab:
            parent.append(instr("Grab"));
            break;
    }
}

function stackValueToLabel(parent: HTMLElement, value: pure.markedKrivine.Closure) {
    closureToString(parent, value);
}

function closureToString(parent: HTMLElement, closure: pure.markedKrivine.Closure) {
    parent.append(paren("("));
    if (closure.marked) {
        parent.append(punc("!"));
    }
    parent.append(span(`@${closure.addr}`, "pointer"), punc(","), " ");
    envToString(parent, closure.env);
    parent.append(paren(")"));
}

function envToString(parent: HTMLElement, env: pure.markedKrivine.Environment) {
    parent.append(paren("["));
    let l = env;
    let first = true;
    while (!list.isEmpty(l)) {
        if (first) {
            first = false;
        } else {
            parent.append(punc(","), " ");
        }
        closureToString(parent, l.head);
        l = l.tail;
    }
    parent.append(paren("]"));
}

function envValueToLabel(parent: HTMLElement, value: pure.markedKrivine.Closure) {
    closureToString(parent, value);
}

export class MarkedKrivineMachineRenderer extends StackMachineRenderer<
    pure.markedKrivine.Instruction,
    pure.markedKrivine.Closure,
    MarkedKrivineMachine
> {
    constructor(parentElement: HTMLElement) {
        const m = new MarkedKrivineMachine();
        super(parentElement, m, [
            instructionColumn(m, instructionToLabel),
            stackColumn("Stack", () => m.stackView(), stackValueToLabel),
            stackColumn("Env", () => m.envView(), envValueToLabel, true),
        ]);
    }
}

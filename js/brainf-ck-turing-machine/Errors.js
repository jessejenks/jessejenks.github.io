class InterpreterError extends Error {
    constructor(message, instructionPointer, tapePointer) {
        super(
            message
            + " <span class=\"error-location\">("
                + "instruction: " + instructionPointer
                + ", tape: " + tapePointer
            + ")</span>"
        );
    }
}
class TooMuchRecursionError extends InterpreterError {
    constructor(instructionPointer, tapePointer) {
        super("Too much recursion", instructionPointer, tapePointer);
        this.name = "TooMuchRecursionError";
    }
}

class TapeOutOfBoundsError extends InterpreterError {
    constructor(instructionPointer, tapePointer) {
        super("Tape pointer went out of bounds", instructionPointer, tapePointer);
        this.name = "TapeOutOfBoundsError";
    }
}

class MismatchedBracketsError extends InterpreterError {
    constructor(expectedBracketType, instructionPointer, tapePointer) {
        super("Expected a " + expectedBracketType + " bracket", instructionPointer, tapePointer);
        this.name = "MismatchedBracketsError";
    }
}
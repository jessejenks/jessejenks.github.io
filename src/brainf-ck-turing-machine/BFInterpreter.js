const maxWhileIterations = 500;
const maxGlobalIterations = 2000;

class BFInterpreter {
    constructor() {
        this.input = "";
        this.asciiOutputMode = false;
        this.initialize();
        this.done = true;
    }

    setInput(input) {
        this.input = input;
    }

    setAsciiOutputMode(bool) {
        this.asciiOutputMode = bool;
    }

    initialize() {
        this.instructionPointer = 0;
        this.tape = new Uint8Array(15);
        this.tapePointer = 0;
        this.awaitingInput = false;
        this.done = false;
        this.globalCounter = 0;
    }

    stop() {
        this.awaitingInput = false;
        this.done = true;
    }

    writeToTape(value) {
        this.tape[this.tapePointer] = value;
        this.awaitingInput = false;
    }

    step() {
        if (this.reachedEoF()) {
            this._finish();
            return;
        }
        let currentInstruction;
        let whileCounter;
        let loopStack;

        this.globalCounter++;
        if (this.globalCounter > maxGlobalIterations) {
            this.done = true;
            throw new TooMuchRecursionError(this.instructionPointer, this.tapePointer);
        }

        currentInstruction = this.getCurrentInstruction();

        while (!validInstructionRegEx.test(currentInstruction)) {
            this.instructionPointer++;
            if (this.reachedEoF()) {
                this._finish();
                return;
            }

            currentInstruction = this.getCurrentInstruction();
        }

        switch (currentInstruction) {
        case SYMBOLS.RIGHT:
            this.tapePointer++;
            if (this.tapePointerIsOutOfBounds()) {
                throw new TapeOutOfBoundsError(this.instructionPointer, this.tapePointer);
            }
            break;

        case SYMBOLS.LEFT:
            this.tapePointer--;
            if (this.tapePointerIsOutOfBounds()) {
                throw new TapeOutOfBoundsError(this.instructionPointer, this.tapePointer);
            }
            break;

        case SYMBOLS.INCREMENT:
            this.tape[this.tapePointer]++;
            break;

        case SYMBOLS.DECREMENT:
            this.tape[this.tapePointer]--;
            break;

        case SYMBOLS.BRACKET_LEFT:
            if (this.tape[this.tapePointer] !== 0) {
                break;
            }

            whileCounter = 0;
            loopStack = 1;
            while (loopStack > 0 && whileCounter < maxWhileIterations) {
                this.instructionPointer++;
                if (this.reachedEoF()) {
                    throw new MismatchedBracketsError("right", this.instructionPointer, this.tapePointer);
                }
                if (this.getCurrentInstruction() === SYMBOLS.BRACKET_LEFT) {
                    loopStack++;
                } else if (this.getCurrentInstruction() === SYMBOLS.BRACKET_RIGHT) {
                    loopStack--;
                }
                whileCounter++;
            }
            break;

        case SYMBOLS.BRACKET_RIGHT:
            if (this.tape[this.tapePointer] === 0) {
                break;
            }

            whileCounter = 0;
            loopStack = 1;
            while (loopStack > 0 && whileCounter < maxWhileIterations) {
                this.instructionPointer--;
                if (this.instructionPointer < 0) {
                    throw new MismatchedBracketsError("left", this.instructionPointer, this.tapePointer);
                }
                if (this.getCurrentInstruction() === SYMBOLS.BRACKET_RIGHT) {
                    loopStack++;
                } else if (this.getCurrentInstruction() === SYMBOLS.BRACKET_LEFT) {
                    loopStack--;
                }
                whileCounter++;
            }
            break;

        case SYMBOLS.OUTPUT:
            this._writeOutput(this.tape[this.tapePointer]);
            break;

        case SYMBOLS.INPUT:
            this._awaitInput();
            this.instructionPointer++;
            return;
        }

        this._finishStep();
        this.instructionPointer++;
    }

    _writeOutput(output) {
        if (this.asciiOutputMode) {
            this.writeOutput(String.fromCharCode(output));
        } else {
            this.writeOutput(output);
        }
    }

    writeOutput() {
        throw new Error("Not Implemented");
    }

    _awaitInput() {
        this.awaitingInput = true;
        this.awaitInput();
    }

    awaitInput() {
        throw new Error("Not Implemented");
    }

    _finishStep() {
        this.finishStep();
    }

    finishStep() {
        throw new Error("Not Implemented");
    }

    _finish() {
        this.done = true;
        this.finish();
    }

    finish() {
        throw new Error("Not Implemented");
    }

    reachedEoF() {
        return this.instructionPointer >= this.input.length;
    }

    tapePointerIsOutOfBounds() {
        return this.tapePointer < 0 || this.tapePointer >= this.tape.length;
    }

    getCurrentInstruction() {
        return this.input.charAt(this.instructionPointer);
    }

    getCurrentInstructionPointer() {
        return this.instructionPointer;
    }
}
class BFController {
    constructor(interpreter, animator) {
        this.interpreter = interpreter;
        this.animator = animator;
        this.initialize();
    }

    initialize() {
        this.interpreter.writeOutput = this._interpreterWriteOutput.bind(this);
        this.interpreter.awaitInput = this._interpreterAwaitInput.bind(this);
        this.interpreter.finishStep = this.interpreterFinishStep.bind(this);
        this.interpreter.finish = this.interpreterFinish.bind(this);

        this.animator.finishStep = this.animatorFinishStep.bind(this);
    }

    _interpreterWriteOutput(output) {
        this.interpreterWriteOutput(output);
    }

    interpreterWriteOutput() {
        throw new Error("Not Implemented");
    }
    
    _interpreterAwaitInput() {
        this.interpreterAwaitInput();
    }

    interpreterAwaitInput() {
        throw new Error("Not Implemented");
    }

    interpreterFinishStep() {
        this.animator.drawTuringMachine(
            this.interpreter.getCurrentInstructionPointer(),
            this.interpreter.tape,
            this.interpreter.tapePointer,
        );
    }

    interpreterFinish() {
        this.interpreterWriteOutput("EOF", "eof");
        this.animator.drawTape();
        this._finish();
    }

    animatorFinishStep() {
        this.continue();
    }

    _finish() {
        this.finish();
    }

    finish() {
        throw new Error("Not Implemented");
    }

    drawInitialTape() {
        this.animator.drawInitialTuringMachine(this.interpreter.tape);
    }

    run(input) {
        this.interpreter.initialize();
        this.interpreter.setInput(input);
        this.animator.setInstructions(input);
        this.continue();
    }

    continue() {
        try {
            this.interpreter.step();
        } catch (err) {
            this._writeError(err);
        }
    }

    _writeError(error) {
        this.writeError(error);
    }

    writeError() {
        throw new Error("Not Implemented");
    }
}
const fps = 100;
const fpsInterval = 1000/fps;

class TuringMachineAnimator {
    constructor(canvasNode) {
        this.canvasNode = canvasNode;
        this.ctx = initializeCanvas(this.canvasNode);
        
        const rect = this.canvasNode.getBoundingClientRect();
        this.width = rect.width;
        this.height = rect.height;

        this.now = 0;
        this.then = 0;
        this.elapsed = 0;

        this.animationDuration = 209;
        this.animationElapsed = 0;

        this.animationFrameId = null;

        this.paused = false;

        this.instructions = [];

        this.currentInstructionPointer = 0;
        this.currentInstruction = "";

        this.currentTape = [];
        this.currentTapePointer = 0;

        this.setContextStyle();
    }

    setContextStyle() {
        this.ctx.strokeStyle = "#e8e8e8";
        this.ctx.fillStyle = this.ctx.strokeStyle;
        this.ctx.lineWidth = 2;
        this.ctx.lineCap = "round";
        this.ctx.lineJoin = "round";
        this.ctx.font = "12px monospace";
        this.ctx.textAlign = "center";
        this.ctx.textBaseline = "middle";
    }

    changeSpeed(speed) {
        this.animationDuration = 10 + ((10 - speed)/10)*(2000 - 10);
    }

    windowChangedSize() {
        this.stop();
        this.ctx = initializeCanvas(this.canvasNode);
        const rect = this.canvasNode.getBoundingClientRect();
        this.width = rect.width;
        this.height = rect.height;
        this.setContextStyle();
    }

    stop() {
        if (this.animationFrameId === null) {
            return;
        }
        window.cancelAnimationFrame(this.animationFrameId);
        this.animationFrameId = null;
    }

    setInstructions(input) {
        this.instructions = input.split("");
    }

    drawInitialTuringMachine(tape) {
        this.currentInstructionPointer = 0;
        this.currentTape = tape;
        this.currentTapePointer = 0;
        this.drawTape();
        this.drawTapeHead();
    }

    drawTuringMachine(instructionPointer, tape, tapePointer) {
        this.currentInstructionPointer = instructionPointer;
        this.currentInstruction = this.instructions[instructionPointer];
        this.currentTape = tape;
        this.currentTapePointer = tapePointer;
        this.initialize();
    }

    initialize() {
        this.animationElapsed = 0;
        this.then = window.performance.now();
        this.draw();
    }

    draw() {
        this.animationFrameId = window.requestAnimationFrame(this.draw.bind(this));

        this.now = window.performance.now();
        this.elapsed = this.now - this.then;

        if (this.elapsed > fpsInterval) {
            this.ctx.clearRect(0, 0, this.width, this.height);

            this.drawTape();

            this.then = this.now - (this.elapsed % fpsInterval);
            this.animationElapsed += this.elapsed;

            this.drawTapeHead(this.animationElapsed/this.animationDuration);

            if (this.animationElapsed > this.animationDuration) {
                this.stop();
                this._finishStep();
            }
        }
    }

    _finishStep() {
        this.finishStep();
    }

    finishStep() {
        throw new Error("Not Implemented");
    }

    drawTape() {
        this.drawInstructions();
        this.drawTapeCells();
    }

    drawInstructions() {
        let x = 10;
        let i;
        for (let i = 0; i < this.instructions.length; i++) {
            if (!validInstructionRegEx.test(this.instructions[i])) {
                continue;
            }
            x += 10;
            this.ctx.fillText(this.instructions[i], x, 10);
            
            if (this.currentInstructionPointer === i) {
                this.drawInstructionPointerArrow(x);
            }
        }
    }

    drawInstructionPointerArrow(x) {
        this.ctx.beginPath();
        this.ctx.moveTo(x, 20);
        this.ctx.lineTo(x, 30);
        this.ctx.stroke();

        this.ctx.beginPath();
        this.ctx.moveTo(x-2, 25);
        this.ctx.lineTo(x, 20);
        this.ctx.lineTo(x+2, 25);
        this.ctx.stroke();
    }

    drawTapeCells() {
        this.ctx.beginPath();
        this.ctx.moveTo(0, this.height/2);
        this.ctx.lineTo(this.width, this.height/2);
        this.ctx.stroke();

        this.ctx.beginPath();
        this.ctx.moveTo(0, this.height/2 + 50);
        this.ctx.lineTo(this.width, this.height/2 + 50);
        this.ctx.stroke();

        let x;
        for (let i = 0; i < this.currentTape.length; i++) {
            x = this.width * (i / this.currentTape.length);
            this.ctx.fillText(
                this.currentTape[i],
                x + this.width / (2 * this.currentTape.length),
                this.height/2 + 25,
            );

            if (i > 0) {
                this.ctx.beginPath();
                this.ctx.moveTo(x, this.height/2);
                this.ctx.lineTo(x, this.height/2 + 50);
                this.ctx.stroke();
            }
        }
    }

    drawTapeHead(t) {
        switch (this.currentInstruction) {
        case SYMBOLS.RIGHT:
            this.drawTapeHeadMovingRight(t);
            break;

        case SYMBOLS.LEFT:
            this.drawTapeHeadMovingLeft(t);
            break;

        case SYMBOLS.INCREMENT:
            this.drawTapeHeadIncrement(t);
            break;

        case SYMBOLS.DECREMENT:
            this.drawTapeHeadDecrement(t);
            break;

        case SYMBOLS.BRACKET_LEFT:
            this.drawTapeHeadBracketLeft();
            break;

        case SYMBOLS.BRACKET_RIGHT:
            this.drawTapeHeadBracketRight();
            break;

        case SYMBOLS.OUTPUT:
            this.drawTapeHeadOutput(t);
            break;

        case SYMBOLS.INPUT:
            this.drawTapeHeadInput(t);
            break;

        default:
            this.drawTapeHeadDefault();
            break;
        }
    }

    drawTapeHeadMovingRight(t) {
        const x = this.getDefaultTapeXPosition() + this.width * ((t - 1) / this.currentTape.length);
        this.drawTapeHeadShape(x, this.getDefaultTapeYPosition());
    }

    drawTapeHeadMovingLeft(t) {
        const x = this.getDefaultTapeXPosition() + this.width * ((1 - t) / this.currentTape.length);
        this.drawTapeHeadShape(x, this.getDefaultTapeYPosition());
    }

    drawTapeHeadIncrement(t) {
        const x = this.width * ((this.currentTapePointer + 0.5) / this.currentTape.length);
        const y = this.getDefaultTapeYPosition() + 10*Math.sin(Math.PI*t);
        this.drawTapeHeadShape(x, y);
        this.ctx.fillText("+", x, y + 15);
    }

    drawTapeHeadDecrement(t) {
        const x = this.getDefaultTapeXPosition();
        const y = this.getDefaultTapeYPosition() + 10*Math.sin(Math.PI*t);
        this.drawTapeHeadShape(x, y);
        this.ctx.fillText("-", x, y + 15);
    }

    drawTapeHeadBracketLeft() {
        this.drawTapeHeadShape(
            this.getDefaultTapeXPosition(),
            this.getDefaultTapeYPosition(),
        );
    }

    drawTapeHeadBracketRight() {
        this.drawTapeHeadShape(
            this.getDefaultTapeXPosition(),
            this.getDefaultTapeYPosition(),
        );
    }

    drawTapeHeadOutput() {
        this.drawTapeHeadShape(
            this.getDefaultTapeXPosition(),
            this.getDefaultTapeYPosition(),
        );
    }

    drawTapeHeadInput() {
        this.drawTapeHeadShape(
            this.getDefaultTapeXPosition(),
            this.getDefaultTapeYPosition(),
        );
    }

    drawTapeHeadDefault() {
        this.drawTapeHeadShape(
            this.getDefaultTapeXPosition(),
            this.getDefaultTapeYPosition(),
        );
    }

    getDefaultTapeXPosition() {
        return this.width * ((this.currentTapePointer + 0.5) / this.currentTape.length);
    }

    getDefaultTapeYPosition() {
        return this.height / 3;
    }

    drawTapeHeadShape(x, y) {
        this.ctx.beginPath();
        this.ctx.moveTo(
            x + 5,
            y - 8.660254038,
        );
        this.ctx.lineTo(
            x,
            y + 5,
        );
        this.ctx.lineTo(
            x - 5,
            y - 8.660254038,
        );
        this.ctx.stroke();
    }
}
const fps = 100;
const fpsInterval = 1000/fps;

class StackMachineAnimator extends CanvasAnimator {
    constructor(canvasNode) {
        super(canvasNode);

        this.pc = 0
        this.program = ["10", "20", "+"]
        this.text = this.program.join(" ")
        this.stack = [];
    }

    frame() {
        const x = 0
        this.ctx.fillText(this.text, x, 18);
        const partial = (this.pc === 0 ? "" : " ") + this.program.slice(0, this.pc).join(" ");
        const offset = this.ctx.measureText(partial)
        const char = this.ctx.measureText(this.program[this.pc])
        this.drawInstructionPointerArrow(x + offset.width + char.width / 2)

        for (let i = 0; i < this.stack.length; i++) {
            this.ctx.fillText(this.stack[i], 10, 100 - i * 12);
        }
    }

    setContextStyle() {
        this.ctx.strokeStyle = "#e8e8e8";
        this.ctx.fillStyle = this.ctx.strokeStyle;
        this.ctx.lineWidth = 1;
        this.ctx.lineCap = "round";
        this.ctx.lineJoin = "round";
        this.ctx.font = "12px monospace";
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

    drawStack() {

    }
}
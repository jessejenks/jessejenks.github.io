export class Clock {
    protected fpsInterval: number;
    protected then = 0;
    protected animationFrameId: number | null = null;

    constructor(
        protected fps: number,
        protected frame: () => void,
    ) {
        this.fpsInterval = 1000 / fps;
    }

    start() {
        if (this.animationFrameId !== null) {
            return;
        }
        this.then = window.performance.now();
        this.animationFrameId = window.requestAnimationFrame(this.draw.bind(this));
    }

    stop() {
        if (this.animationFrameId === null) {
            return;
        }
        window.cancelAnimationFrame(this.animationFrameId);
        this.animationFrameId = null;
    }

    protected draw() {
        this.animationFrameId = window.requestAnimationFrame(this.draw.bind(this));
        const now = window.performance.now();
        const elapsed = now - this.then;
        if (elapsed > this.fpsInterval) {
            this.frame();
            this.then = now - (elapsed % this.fpsInterval);
        }
    }
}

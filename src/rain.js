(function() {
const cv = document.createElement("canvas");
cv.setAttribute("id", "rain");
cv.setAttribute("style", "position: fixed; top: 0; left: 0; z-index: -1; width: 100vw; height: 100vh;");
document.querySelector("body").appendChild(cv);

const pixelRatio = window.devicePixelRatio || 1;
let rect = cv.getBoundingClientRect();
cv.width = rect.width * pixelRatio;
cv.height = rect.height * pixelRatio;

const ctx = cv.getContext("2d");
ctx.scale(pixelRatio, pixelRatio);

const fps = 50;
const fpsInterval = 1000/fps;

let animationFrameID;
let now, then, elapsed;

class RainDrop {
    constructor(x, y, delay, duration) {
        this.x = x;
        this.y = y;
        this.radius = (cv.height - 2 * this.y) * (23 / 27);
        this.delay = delay;
        this.animationCounter = -this.delay;
        this.duration = duration;

        this.theta = 7 * Math.PI / 5;
    }

    show() {
        if (this.animationCounter >= 0) {
            let t = this.animationCounter / this.duration;
            let rQuad = this.radius * easeOutQuad(t);
            let rCubic = this.radius * easeOutCubic(t);

            ctx.beginPath();
            ctx.moveTo(this.x + rQuad * Math.cos(this.theta), this.y - rQuad * Math.sin(this.theta));
            ctx.lineTo(this.x + rCubic * Math.cos(this.theta), this.y - rCubic * Math.sin(this.theta));
            ctx.stroke();
        }
    }

    update() {
        this.animationCounter++;
        if (this.animationCounter > this.duration) {
            this.x = randomLerp(50, rect.width + 50);
            this.y = randomLerp(0, rect.height * 0.4);
            this.delay = randomLerp(0.2, 4) * fps;
            this.animationCounter = -this.delay;
        }
    }
}

const numRaindrops = 100;

const rainAnimationDuration = 2 * fps;

const rainDrops = new Array(numRaindrops);

function preInitialize() {
    for (let i = 0; i < rainDrops.length; i++) {
        rainDrops[i] = new RainDrop(
            ...randomPoint(),
            randomLerp(0.2, 4) * fps,
            rainAnimationDuration,
        );
    }
    initialize();
}

const randomPoint = () => [randomLerp(50, rect.width + 50), randomLerp(0, rect.height * 0.4)];

function initialize() {
    ctx.strokeStyle = "#3e5265";
    ctx.lineWidth = 2;
    ctx.lineCap = "round";

    then = window.performance.now();
    draw();
}


function draw() {
    animationFrameID = requestAnimationFrame(draw);

    now = window.performance.now();
    elapsed = now - then;

    if (elapsed > fpsInterval) {
        ctx.clearRect(0, 0, cv.width, cv.height);

        let rainDrop;
        for (let i = 0; i < rainDrops.length; i++) {
            rainDrop = rainDrops[i];

            rainDrop.show();
            rainDrop.update();
        }

    	then = now - (elapsed % fpsInterval);
    }

}

window.onresize = () => {
    cancelAnimationFrame(animationFrameID);
    rect = cv.getBoundingClientRect();
    cv.width = rect.width * pixelRatio;
    cv.height = rect.height * pixelRatio;
    ctx.scale(pixelRatio, pixelRatio);
    preInitialize();
}

preInitialize();
})();
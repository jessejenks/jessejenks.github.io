(() => {
const cv = document.createElement('canvas');
cv.id = 'about';
cv.setAttribute('style', 'position: fixed; top: 0; left: 0; z-index: -1;');
cv.width = window.innerWidth;
cv.height = window.innerHeight;

document.getElementsByTagName("BODY")[0].appendChild(cv);

const ctx = cv.getContext('2d');

const fps = 50;
const fpsInterval = 1000/fps;

let animationFrameID;
let now, then, elapsed;

class RainDrop {
    constructor(x, y, delay, duration) {
        this.x = x;
        this.y = y;
        // this.radius = r;
        this.radius = (cv.height - 2*this.y)*(23/27);
        this.delay = delay;
        this.animationCounter = -this.delay;
        this.duration = duration;

        this.theta = 
        // 5*Math.PI/4;
        7*Math.PI/5;
    }

    show() {
        if (this.animationCounter >= 0) {
            let t = this.animationCounter/this.duration;
            let rQuad = this.radius*easeOutQuad(t);
            let rCubic = this.radius*easeOutCubic(t);

            ctx.beginPath();
            ctx.moveTo(this.x + rQuad*Math.cos(this.theta), this.y - rQuad*Math.sin(this.theta));
            ctx.lineTo(this.x + rCubic*Math.cos(this.theta), this.y - rCubic*Math.sin(this.theta));
            ctx.stroke();
        }
    }

    update() {
        this.animationCounter++;
        if (this.animationCounter > this.duration) {
            [this.x, this.y] = [randomLerp(50, cv.width+50), randomLerp(0, cv.height*.4)];
            this.delay = randomLerp(.2,4)*fps,
            this.animationCounter = -this.delay;
        }
    }
}

const numRaindrops = 100;

const rainAnimationDuration = 2*fps;

let rainDrops;

const preInitialize =() => {
    const randomPoint = () => [randomLerp(50, cv.width+50), randomLerp(0, cv.height*.4)];

    rainDrops =   [...Array(numRaindrops)]
                    .map(_ => new RainDrop(
                                ...randomPoint(),
                                randomLerp(.2,4)*fps,
                                rainAnimationDuration,
                            )
                        );
    initialize();
}

const initialize = () => {
    then = window.performance.now();
    draw();

    ctx.strokeStyle = "#eef2f6";
    // "#9bbbd8";
    ctx.lineWidth = 3;
    ctx.lineCap = 'round';
}


const draw = () => {
    animationFrameID = requestAnimationFrame(draw);

    now = window.performance.now();
    elapsed = now - then;

    if (elapsed > fpsInterval) {
        ctx.clearRect(0,0,cv.width,cv.height);

        rainDrops.forEach(rainDrop => {
            rainDrop.show();
            rainDrop.update();
        });

    	then = now - (elapsed % fpsInterval);
    }

}

window.onresize = () => {
    cancelAnimationFrame(animationFrameID);
    cv.width = window.innerWidth;
    cv.height = 
    // document.getElementsByTagName("BODY")[0].scrollHeight;
    window.innerHeight;
    preInitialize();
}

preInitialize();
})();
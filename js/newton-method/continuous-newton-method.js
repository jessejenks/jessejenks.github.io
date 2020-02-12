(function() {
const trajectoryCv = document.querySelector("#trajectories");
const arrowCv = document.querySelector("#trajectory-arrows");

const width = 400;
const height = 400;

trajectoryCv.style.setProperty("width", width + "px");
trajectoryCv.style.setProperty("height", height + "px");

arrowCv.style.setProperty("width", width + "px");
arrowCv.style.setProperty("height", height + "px");
arrowCv.style.setProperty("left", 0);

const trajectoryCtx = initializeCanvas(trajectoryCv);
const arrowCtx = initializeCanvas(arrowCv);

trajectoryCtx.strokeStyle = "#e8e8e8";

arrowCtx.strokeStyle = "red";
arrowCtx.lineWidth = 2;
arrowCtx.lineCap = "round";
arrowCtx.lineJoin = "round";

const fps = 50;
const fpsInterval = 1000/fps;
let animationFrameId;
let now, then, elapsed;

const dt = 0.01;
const threshold = 0.00001;

const n = 8;
const points = [];

const arrowAngleOffset = Math.PI/8;
const arrowSize = 4;

function initialize() {

    for (let j = 0; j < n; j++) {
        for (let i = 0; i < n; i++) {
            points.push(
                new Complex(-2 + 4*i/(n - 1), -2 + 4*j/(n-1))
            );
        }
    }

    then = window.performance.now();

    draw();
}

function draw() {
    animationFrameId = window.requestAnimationFrame(draw);

    now = window.performance.now();
    elapsed = now - then;

    if (elapsed > fpsInterval) {
        arrowCtx.clearRect(0, 0, width, height);

        updatePositions();

        then = now - (elapsed % fpsInterval);
    }
}
function p(z) {
    // z^4 - 3z^2 + 3
    return z.power(4).subtract(z.multiply(z).scalarMult(3)).addReal(3);
}

function pPrime(z) {
    // 4*z^3 - 2*3*z^1 + 0
    return z.power(3).scalarMult(4).subtract(z.scalarMult(6));
}

let top, bottom, dP, newP;
let theta;
let shouldCancelAnimationFrame = false;
function updatePositions() {
    for (let i = 0; i < points.length; i++) {
        top = p(points[i]);
        bottom = pPrime(points[i]);
        dP = top.divide(bottom).scalarMult(dt);
        newP = points[i].subtract(dP);

        trajectoryCtx.beginPath();
        trajectoryCtx.moveTo(width*(points[i].real + 2)/4, height - height*(points[i].imag + 2)/4);
        trajectoryCtx.lineTo(width*(newP.real + 2)/4, height - height*(newP.imag + 2)/4);
        trajectoryCtx.stroke();

        theta = Math.atan2(dP.imag, dP.real);

        arrowCtx.beginPath();
        arrowCtx.moveTo(
            width*(newP.real + 2)/4 + arrowSize*Math.cos(theta - arrowAngleOffset),
            height - height*(newP.imag + 2)/4 - arrowSize*Math.sin(theta - arrowAngleOffset),
        );
        arrowCtx.lineTo(
            width*(newP.real + 2)/4,
            height - height*(newP.imag + 2)/4,
        );
        arrowCtx.lineTo(
            width*(newP.real + 2)/4 + arrowSize*Math.cos(theta + arrowAngleOffset),
            height - height*(newP.imag + 2)/4 - arrowSize*Math.sin(theta + arrowAngleOffset),
        );
        arrowCtx.stroke();

        if (dP.mag_sqr() < threshold*threshold) {
            shouldCancelAnimationFrame = true;
        }

        points[i] = newP;
    }

    if (shouldCancelAnimationFrame) {
        cancelAnimationFrame(animationFrameId);
    }
}

initialize();
})()
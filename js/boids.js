(function() {
const cv = document.createElement("canvas");
cv.setAttribute("id", "boids");
cv.setAttribute("style", "position: fixed; top: 0; left: 0; z-index: -1; width: 100vw; height: 100vh;");
document.querySelector("body").appendChild(cv);

const pixelRatio = window.devicePixelRatio || 1;
let rect = cv.getBoundingClientRect();
cv.width = rect.width * pixelRatio;
cv.height = rect.height * pixelRatio;

const ctx = cv.getContext("2d");
ctx.scale(pixelRatio, pixelRatio);

let DEBUG_MODE = false;

let animationFrameId;
const fps = 60;
const fpsInterval = 1000/fps;
let now, then, elapsed;

const numBoids = 150;
const boidPositions = new Float32Array(numBoids * 2);
const boidVelocities = new Float32Array(numBoids * 2);

const seeingDistance = 80;
const seeingDistanceSquared = seeingDistance * seeingDistance;

const minimumDistance = 10;
const minimumDistanceSquared = minimumDistance * minimumDistance;

const maxVelocity = 2;
const maxVelocitySquared = maxVelocity * maxVelocity;

const boidSize = 2;

const mousePosition = { x: 0, y: 0 };

// forces
const centeringForce = { x: 0, y: 0 };
let centeringCounter = 0;

const avoidanceForce = { x: 0, y: 0 };
let avoidanceCounter = 0;

const matchVelocityForce = { x: 0, y: 0 };
let matchVelocityCounter = 0;

const mouseForce = { x: 0, y: 0 };

const windForce = { x: 0, y: 0 };

const centeringForceScaleFactor = 0.08;
const avoidanceForceScaleFactor = 0.3;
const matchVelocityForceScaleFactor = 0.1;
const windForceScaleFactor = 0.01;
const mouseForceScaleFactor = 1;

const force = { x: 0, y: 0 };

const thisBoid = { x: 0, y: 0 };
const otherBoid = { x: 0, y: 0, quadrance: 0 };

const paddingX = 150;
const paddingY = 150;

function initialize() {
    ctx.fillStyle = "#3e5265";
    ctx.strokeStyle = ctx.fillStyle;
    ctx.lineWidth = 2*boidSize;
    ctx.lineCap = "round";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    initializePositionsAndVelocities();

    then = window.performance.now();
    draw();
}

function initializePositionsAndVelocities() {
    for (let i = 0; i < boidPositions.length; i += 2) {
        boidPositions[i] = paddingX + Math.random() * (rect.width - 2*paddingX);
        boidPositions[i+1] = paddingY + Math.random() * (rect.height - 2*paddingY);

        boidVelocities[i] = Math.random();
        boidVelocities[i+1] = 2*Math.random()-1;
    }
}

function draw() {
    animationFrameId = window.requestAnimationFrame(draw);

    now = window.performance.now();
    elapsed = now - then;

    if (elapsed > fpsInterval) {
        ctx.clearRect(0, 0, rect.width, rect.height);

        drawBoids();
        updateBoids();

        then = now - (elapsed % fpsInterval);
    }
}

function drawBoids() {
    for (let i = 0; i < boidPositions.length; i += 2) {
        if (DEBUG_MODE) {
            ctx.fillText(i/2, boidPositions[i], boidPositions[i+1] - 10);
        } else {
            ctx.beginPath();
            ctx.moveTo(boidPositions[i], boidPositions[i+1]);
            ctx.lineTo(
                boidPositions[i] - 10*boidVelocities[i]/maxVelocity,
                boidPositions[i+1] - 10*boidVelocities[i+1]/maxVelocity
            );
            ctx.stroke();
        }
    }
}

function updateBoids() {
    for (let i = 0; i < boidPositions.length; i += 2) {
        setForce(i, force);

        boidVelocities[i] += force.x;
        boidVelocities[i+1] += force.y;

        limitVelocity(i);
    }

    for (let i = 0; i < boidPositions.length; i += 2) {
        boidPositions[i] += boidVelocities[i];
        boidPositions[i+1] += boidVelocities[i+1];

        boundPosition(i);
    }
}

let windTheta;
let currentQuadrance, avoidanceFactor;
function setForce(i, force) {
    centeringForce.x = 0;
    centeringForce.y = 0;
    centeringCounter = 0;

    avoidanceForce.x = 0;
    avoidanceForce.y = 0;
    avoidanceCounter = 0;

    matchVelocityForce.x = 0;
    matchVelocityForce.y = 0;
    matchVelocityCounter = 0;

    mouseForce.x = 0;
    mouseForce.y = 0;

    thisBoid.x = boidPositions[i];
    thisBoid.y = boidPositions[i+1];

    windTheta = getWindTheta(thisBoid.y/rect.height);
    windForce.x = Math.cos(windTheta);
    windForce.y = -Math.sin(windTheta);

    currentQuadrance = quadrance(thisBoid.x, thisBoid.y, mousePosition.x, mousePosition.y);
    avoidanceFactor = Math.min(minimumDistanceSquared/currentQuadrance, 1);

    if (avoidanceFactor > 1/9) {
        mouseForce.x = -(mousePosition.x - thisBoid.x) * avoidanceFactor;
        mouseForce.y = -(mousePosition.y - thisBoid.y) * avoidanceFactor;
    }

    for (let j = 0; j < boidPositions.length; j += 2) {
        if (j === i) {
            continue;
        }

        otherBoid.x = boidPositions[j];
        otherBoid.y = boidPositions[j+1];

        setTorusEquivalentPoint(thisBoid, otherBoid);
        currentQuadrance = otherBoid.quadrance;

        if (currentQuadrance < seeingDistanceSquared) {
            centeringForce.x += otherBoid.x;
            centeringForce.y += otherBoid.y;
            centeringCounter++;

            matchVelocityForce.x += boidVelocities[j];
            matchVelocityForce.y += boidVelocities[j+1];
            matchVelocityCounter++;
        }

        avoidanceFactor = Math.min(minimumDistanceSquared/currentQuadrance, 1);
        if (avoidanceFactor > 1/9) {
            avoidanceForce.x -= (otherBoid.x - thisBoid.x) * avoidanceFactor;
            avoidanceForce.y -= (otherBoid.y - thisBoid.y) * avoidanceFactor;
            avoidanceCounter++;
        }
    }

    if (centeringCounter > 0) {
        centeringForce.x /= centeringCounter;
        centeringForce.y /= centeringCounter;

        centeringForce.x -= thisBoid.x;
        centeringForce.y -= thisBoid.y;

        normalizeForce(centeringForce);
    }

    if (matchVelocityCounter > 0) {
        matchVelocityForce.x /= matchVelocityCounter;
        matchVelocityForce.y /= matchVelocityCounter;

        matchVelocityForce.x -= boidVelocities[i];
        matchVelocityForce.y -= boidVelocities[i+1];

        normalizeForce(matchVelocityForce);
    }

    if (avoidanceCounter > 0) {
        normalizeForce(avoidanceForce);
    }

    force.x = centeringForce.x * centeringForceScaleFactor
        + avoidanceForce.x     * avoidanceForceScaleFactor
        + matchVelocityForce.x * matchVelocityForceScaleFactor
        + mouseForce.x         * mouseForceScaleFactor
        + windForce.x          * windForceScaleFactor
    ;
    force.y = centeringForce.y * centeringForceScaleFactor
        + avoidanceForce.y     * avoidanceForceScaleFactor
        + matchVelocityForce.y * matchVelocityForceScaleFactor
        + mouseForce.y         * mouseForceScaleFactor
        + windForce.y          * windForceScaleFactor
    ;

    if (DEBUG_MODE) {
        ctx.strokeStyle = "green";
        ctx.beginPath();
        ctx.moveTo(thisBoid.x, thisBoid.y);
        ctx.lineTo(
            thisBoid.x + centeringForce.x * centeringForceScaleFactor * 50,
            thisBoid.y + centeringForce.y * centeringForceScaleFactor * 50
        );
        ctx.stroke();

        ctx.strokeStyle = "orange";
        ctx.beginPath();
        ctx.moveTo(thisBoid.x, thisBoid.y);
        ctx.lineTo(
            thisBoid.x + avoidanceForce.x * avoidanceForceScaleFactor * 50,
            thisBoid.y + avoidanceForce.y * avoidanceForceScaleFactor * 50
        );
        ctx.stroke();

        ctx.strokeStyle = "yellow";
        ctx.beginPath();
        ctx.moveTo(thisBoid.x, thisBoid.y);
        ctx.lineTo(
            thisBoid.x + matchVelocityForce.x * matchVelocityForceScaleFactor * 50,
            thisBoid.y + matchVelocityForce.y * matchVelocityForceScaleFactor * 50
        );
        ctx.stroke();

        ctx.strokeStyle = "aqua";
        ctx.beginPath();
        ctx.moveTo(thisBoid.x, thisBoid.y);
        ctx.lineTo(
            thisBoid.x + windForce.x * windForceScaleFactor * 50,
            thisBoid.y + windForce.y * windForceScaleFactor * 50,
        );
        ctx.stroke();

        ctx.strokeStyle = "pink";
        ctx.beginPath();
        ctx.moveTo(thisBoid.x, thisBoid.y);
        ctx.lineTo(
            thisBoid.x + mouseForce.x * mouseForceScaleFactor * 50,
            thisBoid.y + mouseForce.y * mouseForceScaleFactor * 50
        );
        ctx.stroke();
    }
}

let x;
function getWindTheta(heightRatio) {
    return Math.PI*(3/2 - 4/7*bump(randomMix(heightRatio)));
}

function bump(x) {
    return 1 - 2*Math.abs(x - 0.5);
}

function randomMix(x) {
    return 0.7*x + 0.3*Math.random();
}

let x1, y1, x2, y2;
let shiftedX, shiftedY;
let shortestQuadrance, currentShortestQuadrance;
function setTorusEquivalentPoint(currentPos, closestPos) {
    x1 = currentPos.x;
    y1 = currentPos.y;
    x2 = closestPos.x;
    y2 = closestPos.y;

    shortestQuadrance = quadrance(x1, y1, x2, y2);

    shiftedX = x2 < rect.width/2  ? x2 + rect.width  : x2 - rect.width;
    shiftedY = y2 < rect.height/2 ? y2 + rect.height : y2 - rect.height;

    currentShortestQuadrance = quadrance(x1, y1, shiftedX, y2);
    if (currentShortestQuadrance < shortestQuadrance) {
        shortestQuadrance = currentShortestQuadrance;
        closestPos.x = shiftedX;
    }

    currentShortestQuadrance = quadrance(x1, y1, x2, shiftedY);
    if (currentShortestQuadrance < shortestQuadrance) {
        shortestQuadrance = currentShortestQuadrance;
        closestPos.x = x2;
        closestPos.y = shiftedY;
    }

    currentShortestQuadrance = quadrance(x1, y1, shiftedX, shiftedY);
    if (currentShortestQuadrance < shortestQuadrance) {
        shortestQuadrance = currentShortestQuadrance;
        closestPos.x = shiftedX;
        closestPos.y = shiftedY;
    }

    closestPos.quadrance = shortestQuadrance;
}

function quadrance(x1, y1, x2, y2) {
    return (x1 - x2)*(x1 - x2) + (y1 - y2)*(y1 - y2);
}

function normalizeForce(force) {
    const mag = Math.sqrt(force.x*force.x + force.y*force.y);
    force.x = force.x/mag;
    force.y = force.y/mag;
}

function limitVelocity(i) {
    let quad = boidVelocities[i] * boidVelocities[i] + boidVelocities[i+1] * boidVelocities[i+1];
    if (quad > maxVelocitySquared) {
        quad = Math.sqrt(quad);
        boidVelocities[i] = maxVelocity * boidVelocities[i] / quad;
        boidVelocities[i+1] = maxVelocity * boidVelocities[i+1] / quad;
    }
}

function boundPosition(i) {
    if (boidPositions[i] < 0) {
        boidPositions[i] = rect.width;
    } else if (boidPositions[i] > rect.width) {
        boidPositions[i] = 0;
    }

    if (boidPositions[i+1] < 0) {
        boidPositions[i+1] = rect.height;
    } else if (boidPositions[i+1] > rect.height) {
        boidPositions[i+1] = 0;
    }
}

window.onresize = function() {
    window.cancelAnimationFrame(animationFrameId);
    rect = cv.getBoundingClientRect();
    cv.width = rect.width * pixelRatio;
    cv.height = rect.height * pixelRatio;
    ctx.scale(pixelRatio, pixelRatio);
    initialize();
}

window.onkeyup = function(keyboardEvent) {
    if (keyboardEvent.key === "d") {
        DEBUG_MODE = !DEBUG_MODE;
        if (DEBUG_MODE) {
            ctx.lineWidth = 1;
            const d = document.createElement("CODE");
            d.innerText = "DEBUG_MODE (d)";
            d.setAttribute("id", "debug-message");
            d.setAttribute("style", "position: fixed; top: 100px; right: 100px;");
            document.querySelector("body").appendChild(d);
        } else {
            ctx.strokeStyle = ctx.fillStyle;
            ctx.lineWidth = boidSize*2;
            document.querySelector("#debug-message").remove();
        }
    }

    if (keyboardEvent.key === "r") {
        initializePositionsAndVelocities();
    }
}

window.onmousemove = function(mouseEvent) {
    mousePosition.x = mouseEvent.clientX;
    mousePosition.y = mouseEvent.clientY;
}

initialize();
})();
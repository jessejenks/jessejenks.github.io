(function() {
const cv = document.createElement("canvas");
cv.setAttribute("id", "links");
cv.setAttribute("style", "position: absolute; top: 0; left: 0; z-index: -1; width: 100vw; height: 100vh;");
document.querySelector("body").appendChild(cv);

const pixelRatio = window.devicePixelRatio || 1;
let rect = cv.getBoundingClientRect();
cv.width = rect.width * pixelRatio;
cv.height = rect.height * pixelRatio;

const ctx = cv.getContext("2d");
ctx.scale(pixelRatio, pixelRatio);

const boxWidth = 15;
const epsilon = 0.02;
const numColors = Math.floor(1/epsilon);

// precompute colors
const colors = new Array(numColors);
const cellSizes = new Array(numColors);

let failCounter = 0;
const maxNumFails = 10;

let cells, frontier;
let gridWidth, gridHeight;

let animationFrameID;
let now, then, elapsed;

const fps = 50;
const fpsInterval = 1000/fps;

function preInitialize() {
    let sin;
    for (let i = 0; i < numColors; i++) {
        sin = Math.sin(Math.PI * i/(numColors - 1));
        colors[i] = lerpColor("#48808e", "#3e5265", sin);
        cellSizes[i] = (0.4 + 0.6 * sin) * 0.45
        // sinebow(i * epsilon, 0.2);
    }
    initialize();
}

function initialize() {
    gridWidth = Math.floor(rect.width/boxWidth)+1;
    gridHeight = Math.floor(rect.height/boxWidth)+1;

    cells = new Int8Array(Math.floor(gridWidth * gridHeight));
    for (let i = 0; i < cells.length; i++) {
        cells[i] = -1;
    }

    const seedIndex = Math.floor(gridHeight / 2) * gridWidth + Math.floor(gridWidth/2);
    frontier = [seedIndex];
    cells[seedIndex] = 0;
    failCounter = 0;

    then = window.performance.now();
    draw();
}

function draw() {
    animationFrameID = requestAnimationFrame(draw);

    now = window.performance.now();
    elapsed = now - then;

    if (elapsed > fpsInterval) {
        ctx.clearRect(0, 0, cv.width, cv.height);

        for (let i = 0; i < cells.length; i++) {
            if (cells[i] < 0) {
                continue;
            }

            ctx.fillStyle = colors[cells[i]];

            ctx.beginPath();
            ctx.arc(
                boxWidth * (i % gridWidth),
                boxWidth * Math.floor(i/gridWidth),
                boxWidth * cellSizes[cells[i]],
                0, 2*Math.PI,
            );
            ctx.fill();
        }

        if (failCounter < maxNumFails) {
            update();
            then = now - (elapsed % fpsInterval);
        } else {
            cancelAnimationFrame(animationFrameID);
        }
    }
}

let currentCell;
let neighbors, neighbor;

let newValue;
let currentPermutation;
function update() {
    if (frontier.length == 0) {
        failCounter++;
        return;
    }

    currentCell = Math.random() < 0.8 ? frontier.pop() : frontier.shift();

    neighbors = getNeighbors(currentCell);

    newValue = (cells[currentCell]+1) % colors.length;

    currentPermutation = choice(permutations);
    for (let i = 0; i < neighbors.length; i++) {
        neighbor = neighbors[currentPermutation[i]];
        if (cells[neighbor] === -1) {
            frontier.push(neighbor);
            cells[neighbor] = newValue;
        }
    }
}

let top, bottom, left, right;
function getNeighbors(cell) {
    top = cells.length - gridWidth + cell;
    if (cell >= gridWidth) {
        top = cell - gridWidth;
    }

    bottom = cell + gridWidth;
    if (Math.floor(cell/gridWidth) === gridHeight-1) {
        bottom = cell%gridWidth;
    }

    left = cell - 1;
    if (cell % gridWidth === 0) {
        left = cell + gridWidth - 1;
    }

    right = cell + 1;
    if (cell % gridWidth === gridWidth) {
        right = cell - gridWidth + 1;
    }

    return [top, bottom, left, right];
}

window.onresize = function() {
    cancelAnimationFrame(animationFrameID);
    rect = cv.getBoundingClientRect();
    cv.width = rect.width * pixelRatio;
    cv.height = rect.height * pixelRatio;
    ctx.scale(pixelRatio, pixelRatio);
    initialize();
}

window.onkeyup = function(keyboardEvent) {
    if (keyboardEvent.key === "r") {
        initialize();
    }
}

preInitialize();
})();
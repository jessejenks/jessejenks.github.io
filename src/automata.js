(function() {
const cv = document.createElement("canvas");
cv.setAttribute("id", "automata");
cv.setAttribute("style", "position: absolute; top: 0; left: 0; z-index: -1; width: 100vw; height: 100vh;");
document.querySelector("body").appendChild(cv);

const pixelRatio = window.devicePixelRatio || 1;
let rect = cv.getBoundingClientRect();
cv.width = rect.width * pixelRatio;
cv.height = rect.height * pixelRatio;

const ctx = cv.getContext("2d");
ctx.scale(pixelRatio, pixelRatio);

const nameDiv = document.getElementById("name-of-rule");
const authorDiv = document.getElementById("author-of-rule");
const encodingDiv = document.getElementById("encoding-of-rule");

const nextButton = document.getElementById("next-rule-button");
const prevButton = document.getElementById("previous-rule-button");
const playPauseButton = document.getElementById("play-pause-button");
const resetButton = document.getElementById("reset-button");
const stayButton = document.getElementById("stay-button");
nextButton.onclick = nextRule;
prevButton.onclick = previousRule;
playPauseButton.onclick = togglePauseAnimation;
resetButton.onclick = reset;
stayButton.onclick = toggleStayOnRule;

const greetingBitmaps = [
    [
        0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
        0,1,0,0,0,1,0,1,1,1,0,1,0,0,0,1,1,0,1,1,1,0,1,1,1,1,1,0,1,1,1,0,
        0,1,0,1,0,1,0,1,0,0,0,1,0,0,0,1,0,0,1,0,1,0,1,0,1,0,1,0,1,0,0,0,
        0,1,0,1,0,1,0,1,1,1,0,1,0,0,0,1,0,0,1,0,1,0,1,0,1,0,1,0,1,1,1,0,
        0,1,0,1,0,1,0,1,0,0,0,1,0,0,0,1,0,0,1,0,1,0,1,0,1,0,1,0,1,0,0,0,
        0,1,1,1,1,1,0,1,1,1,0,1,1,1,0,1,1,0,1,1,1,0,1,0,0,0,1,0,1,1,1,0,
        0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
        0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
    ],
    [
        0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
        0,0,0,0,0,0,1,0,1,0,0,1,0,0,0,0,
        0,0,0,0,0,0,1,0,1,0,0,0,0,0,0,0,
        0,0,0,0,0,0,1,1,1,0,0,1,0,0,0,0,
        0,0,0,0,0,0,1,0,1,0,0,1,0,0,0,0,
        0,0,0,0,0,0,1,0,1,0,0,1,0,0,0,0,
        0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
        0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
    ],
];

const colorPalette = ["#f18c8e", "#f0b7a4", "#f1d1b5"];
let cellColors;

const boxSize = 12;
const scale = 3;

let gridWidth, gridHeight, paddingTop;
let cells, cells2;

let whichMessageIndex;
let messageWidth;
let shouldDisplayMessage;

let animationFrameID;
const fps = 8;
const fpsInterval = 1000/fps;
let now, then, elapsed;
let animationDisplayCounter = 0;
const delay = 2*fps;
const duration = 10*fps;

let paused = false;
let stayOnCurrentRule = false;

const shuffledRules = fisherYates(ruleDefinitions.length-1).concat(ruleDefinitions.length-1);
let shuffledRuleIndex = shuffledRules.length-1;
let whichRule;

let drawOnce;
let alternateCellBufferCounter;

function initialize() {
    gridWidth = Math.floor(rect.width / boxSize) + 1;
    gridHeight = Math.floor(rect.height / boxSize) + 1;

    cells = new Uint8Array(gridWidth * gridHeight);
    cells2 = new Uint8Array(cells.length);
    cellColors = new Uint8Array(cells.length);

    cellColors = cellColors.map(() => Math.floor(Math.random()*colorPalette.length));

    paddingTop = 4;

    if (gridWidth > 32*scale) {
        whichMessageIndex = 0;
        messageWidth = 32;
    } else if (gridWidth > 16*scale) {
        whichMessageIndex = 1;
        messageWidth = 16;
    } else {
        whichMessageIndex = -1;
    }
    shouldDisplayMessage = whichMessageIndex > -1 && gridHeight > 8;

    whichRule = shuffledRules[shuffledRuleIndex];

    drawOnce = true;

    alternateCellBufferCounter = 0;

    then = window.performance.now();

    fillCellArrays();
    displayRule(ruleDefinitions[whichRule]);
    draw();
}

function fillCellArrays() {
    if (shouldDisplayMessage) {
        let j = paddingTop * gridWidth;
        let isAlive;

        for (let i = 0; i < greetingBitmaps[whichMessageIndex].length; i++) {
            if (i % messageWidth === 0) {
                j = recenterIndex(j, gridWidth, messageWidth);
            }

            isAlive = greetingBitmaps[whichMessageIndex][i];

            if (isAlive) {
                cells[j] = Boolean(isAlive);
                for (let p = 0; p < scale; p++) {
                    for (let q = 0; q < scale; q++) {
                        cells[j + p * gridWidth + q] = true;
                    }
                }
            }

            j += scale;
        }
    } else {
        let sideLength = 22;

        for (let i = 0; i < sideLength; i++) {
            for (let j = 0; j < sideLength; j++) {
                cells[(j + 3) * gridWidth + i + Math.floor(gridWidth / 2 - sideLength / 2)] = true;
            }
        }
    }
}

function recenterIndex(j, width, messageWidth) {
    j -= (j%width);
    j += Math.floor((width - scale*messageWidth)/2);
    j += scale*width;
    return j;
}

function draw() {
    animationFrameID = requestAnimationFrame(draw);

    if (paused && !drawOnce) {
        return;
    }

    now = window.performance.now();
    elapsed = now - then;

    if (elapsed > fpsInterval) {
        if (drawOnce || animationDisplayCounter >= delay) {
            ctx.clearRect(0, 0, rect.width, rect.height);

            const isEvenFrame = alternateCellBufferCounter === 0;
            const c1 = isEvenFrame ? cells : cells2;
            const c2 = isEvenFrame ? cells2 : cells;

            for (let i = 0; i < c1.length; i++) {
                if (c1[i]) {
                    ctx.fillStyle = colorPalette[cellColors[i]];
                    ctx.fillRect(
                        (i % gridWidth) * boxSize,
                        Math.floor(i / gridWidth) * boxSize,
                        boxSize,
                        boxSize,
                    );
                }
            }

            update(ruleDefinitions[whichRule], c1, c2, gridWidth, gridHeight);

            alternateCellBufferCounter = (++alternateCellBufferCounter) % 2;

            if (drawOnce) {
                drawOnce = false;
            }
        }

        animationDisplayCounter++;

        if (!stayOnCurrentRule && animationDisplayCounter >= delay + duration) {
            alternateCellBufferCounter = 0;
            animationDisplayCounter = 0;
            drawOnce = true;
            shuffledRuleIndex = (++shuffledRuleIndex) % shuffledRules.length;
            whichRule = shuffledRules[shuffledRuleIndex];
            displayRule(ruleDefinitions[whichRule]);
            cells.fill(0);
            fillCellArrays();
        }

        then = now - (elapsed % fpsInterval);
    }
}

function update(rule, cells, cells2, w, h) {
    let sum = 0;
    let i, j, which;
    let onLeft, onRight, onTop, onBottom, onEdge;
    const l = cells.length;

    for (i = 0; i < l; i++) {
        onLeft = onTheLeft(i, w);
        onRight = onTheRight(i, w);

        onTop = onTheTop(i, w);
        onBottom = onTheBottom(i, w, h);

        sum =   +(onTop ? cells[l - w + (i % w)] : cells[i - w])
                +(onBottom ? cells[i % w] : cells[i + w])
                +(onLeft ? cells[i + w - 1] : cells[i - 1])
                +(onRight ? cells[i - w + 1] : cells[i + 1])
                
                +(onTop ?
                    (onLeft ?
                        cells[l-1] : cells[l-w + (i%w)-1]
                    )
                    :
                    (onLeft ? 
                        cells[i-1] : cells[i-w-1]
                    )
                )

                +(onTop ?
                    (onRight ?
                        cells[l-w] : cells[l-w + (i%w)+1]
                    )
                    :
                    (onRight ?
                        cells[i-2*w+1] : cells[i-w+1]
                    )
                )

                +(onBottom ? 
                    (onLeft ?
                        cells[w-1] :cells[(i%w)-1]
                    )
                    :
                    (onLeft ?
                        cells[i+2*w-1] : cells[i+w-1]
                    )
                )
                +(onBottom ?
                    (onRight ?
                        cells[0] : cells[(i%w)+1]
                    )
                    :
                    (onRight ?
                        cells[i+1] : cells[i+w+1]
                    )
                );
    
        which = cells[i] ? 1 : 2;

        cells2[i] = false;
        for (j = 0; j < rule[which].length; ++j) {
            if (sum === rule[which][j]) {
                cells2[i] = true;
                break;
            }
        }
    }
}

const onTheLeft = (i, w) => i % w === 0;
const onTheRight = (i, w) => i % w === w - 1;

const onTheTop = (i, w) => Math.floor(i / w) === 0;
const onTheBottom = (i, w, h) => Math.floor(i / w) === h - 1;

window.onresize = function() {
    cancelAnimationFrame(animationFrameID);
    rect = cv.getBoundingClientRect();
    cv.width = rect.width * pixelRatio;
    cv.height = rect.height * pixelRatio;
    ctx.scale(pixelRatio, pixelRatio);
    initialize();
}

window.onkeyup = function(keyboardEvent) {
    if (keyboardEvent.key === "ArrowRight") {
        nextRule();
    }

    if (keyboardEvent.key === "ArrowLeft") {
        previousRule();
    }

    if (keyboardEvent.key === "p") {
        togglePauseAnimation();
    }

    if (keyboardEvent.key === "s") {
        toggleStayOnRule();
    }

    if (keyboardEvent.key === "r") {
        reset();
    }
}

function nextRule() {
    shuffledRuleIndex = (++shuffledRuleIndex) % shuffledRules.length;
    whichRule = shuffledRules[shuffledRuleIndex];
    animationDisplayCounter = delay;
    displayRule(ruleDefinitions[whichRule]);
}

function previousRule() {
    shuffledRuleIndex--;
    if (shuffledRuleIndex < 0) {
        shuffledRuleIndex = ruleDefinitions.length-1;
    }
    whichRule = shuffledRules[shuffledRuleIndex];
    animationDisplayCounter = delay;
    displayRule(ruleDefinitions[whichRule]);
}

function displayRule(rule) {
    nameDiv.innerText = "\""+rule[0]+"\"";
    authorDiv.innerText = rule[3] ? "by : " + rule[3] : "";
    encodingDiv.innerText = "Rule : {"
        + rule[1].join(",")
        + "}/{"
        + rule[2].join(",")
        + "}";
}

function togglePauseAnimation() {
    paused = !paused;
    if (paused) {
        playPauseButton.innerText = "Play  (P)";
    } else {
        playPauseButton.innerText = "Pause (P)";
    }
}

function toggleStayOnRule() {
    stayOnCurrentRule = !stayOnCurrentRule;
    if (stayOnCurrentRule) {
        stayButton.innerText = "Stop Staying On Rule (S)";
    } else {
        stayButton.innerText = "Stay On Rule (S)";
    }
}

function reset() {
    initialize();
}

initialize();
})();
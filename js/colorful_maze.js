(() => {
const cv = document.createElement('canvas');
cv.id = 'links';
cv.setAttribute('style', 'position: absolute; top: 0; left: 0; z-index: -1;');
cv.width = window.innerWidth;
cv.height = window.innerHeight;

document.getElementsByTagName("BODY")[0].appendChild(cv);

const ctx = cv.getContext('2d');


const boxWidth = 15;//35;
const epsilon = 0.02;
const numCols = Math.floor(1/epsilon);
// precompute colors
const cols = new Array(numCols);
let failCounter = 0;
const maxNumFails = 10;

let cells, frontier;
let gridWidth, gridHeight;

let animationFrameID;
let now, then, elapsed;

const fps = 50;
const fpsInterval = 1000/fps;

const preInitialize = () => {
    for (let i = 0; i<numCols; ++i) {
        cols[i] = sinebow(i*epsilon, .2);
    }
    initialize();
}

const initialize = () => {
    gridWidth = Math.floor(cv.width/boxWidth)+1;
    gridHeight = Math.floor(cv.height/boxWidth)+1;

    // console.log(gridWidth, gridHeight)

    cells = new Int8Array(Math.floor(gridWidth*gridHeight));
    cells.fill(-1);

    // const randIndex = Math.floor(Math.random()*cells.length);

    const seedIndex = Math.floor(cells.length/2);
    frontier = [seedIndex];
    cells[seedIndex] = 0;
    then = window.performance.now();
    draw();
}
// ctx.fillStyle = sinebow(.666, .8);

const draw = () => {
    animationFrameID = requestAnimationFrame(draw);

    now = window.performance.now();
    elapsed = now - then;

    if (elapsed > fpsInterval) {
        ctx.clearRect(0,0,cv.width,cv.height);

        cells.forEach((cell,i) => {
            if (cell > -1) {
                ctx.fillStyle = cols[cell];

                // ctx.beginPath();
                // ctx.fillRect(
                //     boxWidth*(i%gridWidth),
                //     boxWidth*Math.floor(i/gridWidth),
                //     boxWidth,
                //     boxWidth);

                ctx.beginPath();
                ctx.arc(
                    boxWidth*(i%gridWidth),
                    boxWidth*Math.floor(i/gridWidth),
                    colIndexToRadius(cell)*boxWidth,
                    0, 2*Math.PI);
                ctx.fill();
            }
        })

        if (failCounter < maxNumFails) update();


        then = now - (elapsed % fpsInterval);
    }
}

const colIndexToRadius = cell => 
// (.4 + .6*cell/numCols)*.45;
(.4 + .6*Math.sin(Math.PI*cell/numCols))*.45;
// .4*(.6 + .4*Math.random());
// .45*(.2 + .8*Math.random());

const update = () => {
    // console.log('updating');
    let curr;
    let neighbors;
    if (frontier.length > 0) {
        curr = Math.random() < .8 ? frontier.pop() : frontier.shift();

        neighbors = getNeighbors(curr);


        const newValue = (cells[curr]+1)%cols.length;

        const perm = choice(permutations);

        let neighbor;
        perm.forEach(i => {
            neighbor = neighbors[i];

            if (cells[neighbor] === -1) {
                frontier.push(neighbor);
                cells[neighbor] = newValue;
            }
        })
    } else {
        failCounter++;
    }

}

const getNeighbors = (cell) => {
    const top = cell < gridWidth ?
        cells.length - gridWidth + cell :
        cell - gridWidth;
    const bottom = Math.floor(cell/gridWidth) === gridHeight-1 ?
        cell%gridWidth:
        cell + gridWidth;

    const left = cell % gridWidth === 0 ?
        cell + gridWidth - 1:
        cell - 1;
    const right = cell % gridWidth === gridWidth - 1 ?
        cell - gridWidth + 1:
        cell + 1;

    return [top, bottom, left, right];
}

window.onresize = () => {
    cancelAnimationFrame(animationFrameID);
    cv.width = window.innerWidth;
    cv.height = window.innerHeight;
    failCounter = 0;
    initialize();
}

preInitialize();
})();
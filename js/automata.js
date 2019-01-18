(() => {
const cv = document.createElement('canvas');
cv.id = 'automata';
cv.setAttribute('style', 'position: absolute; top: 0; left: 0; z-index: -1;');
cv.width = window.innerWidth;
cv.height = window.innerHeight;

document.getElementsByTagName("BODY")[0].appendChild(cv);

// const pixelRatio = window.devicePixelRatio;

const ctx = cv.getContext('2d');
// ctx.scale(pixelRatio, pixelRatio);
// ctx.save();

const nameDiv = document.getElementById("name-of-rule");
const authorDiv = document.getElementById("author-of-rule");
const encodingDiv = document.getElementById("encoding-of-rule");


const greetingBitmap = [
    [
        0, 0,0,0,0,0, 0,0,0,0,0, 0,0,0,0, 0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
        0, 1,0,0,0,1, 0,1,1,1,0, 1,0,0,0, 1,1,0,1,1,1,0,1,1,1,1,1,0,1,1,1,0,
        0, 1,0,1,0,1, 0,1,0,0,0, 1,0,0,0, 1,0,0,1,0,1,0,1,0,1,0,1,0,1,0,0,0,
        0, 1,0,1,0,1, 0,1,1,1,0, 1,0,0,0, 1,0,0,1,0,1,0,1,0,1,0,1,0,1,1,1,0,
        0, 1,0,1,0,1, 0,1,0,0,0, 1,0,0,0, 1,0,0,1,0,1,0,1,0,1,0,1,0,1,0,0,0,
        0, 1,1,1,1,1, 0,1,1,1,0, 1,1,1,0, 1,1,0,1,1,1,0,1,0,0,0,1,0,1,1,1,0,
        0, 0,0,0,0,0, 0,0,0,0,0, 0,0,0,0, 0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
        0, 0,0,0,0,0, 0,0,0,0,0, 0,0,0,0, 0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0
    ],
    [
        0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,
        0,0,0,0,0,0,1,0,1,0, 0,1,0,0,0,0,
        0,0,0,0,0,0,1,0,1,0, 0,0,0,0,0,0,
        0,0,0,0,0,0,1,1,1,0, 0,1,0,0,0,0,
        0,0,0,0,0,0,1,0,1,0, 0,1,0,0,0,0,
        0,0,0,0,0,0,1,0,1,0, 0,1,0,0,0,0,
        0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,
        0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0
    ]
];

// const colorPalette = Array(5).fill(0).map((a,i) => lerpColor("#ffe4e1", "#fa8072", i/4));
const colorPalette =
// ['#568ea6', '#305f72']
['#f18c8e','#f0b7a4','#f1d1b5'];
let cellColors;

const boxSize = 12;
const scale = 3;

let gridWidth, gridHeight, paddingTop;
let cells, cells2;

let whichMessageIndex, modSize;
let screenIsBigEnough;

let animationFrameID;
let alternateCellBufferCounter;
const fps = 10;
const fpsInterval = 1000/fps;
let now, then, elapsed;
let animationCounter = 0;
const delay = 2*fps;
const duration = 10*fps;
let currentFrameCount = 0;
let paused = false;
const shuffledRules = fisherYates(ruleDefinitions.length-1).concat(ruleDefinitions.length-1);
// [...Array(ruleDefinitions.length).keys()];//
let shuffledRuleIndex = shuffledRules.length-1;
let whichRule;
let drawOnce;


function initialize() {
    gridWidth = Math.floor(cv.width/boxSize)+1;
    gridHeight = Math.floor(cv.height/boxSize)+1;

    cells = new Uint8Array(gridWidth*gridHeight);
    cells2 = new Uint8Array(cells.length);
    cellColors = new Uint8Array(cells.length);

    cellColors = cellColors.map(_ => Math.floor(Math.random()*colorPalette.length));


    paddingTop = 4;    

    if (gridWidth > 32*scale) {
        whichMessageIndex = 0;
        modSize = 32;
    } else if (gridWidth > 16*scale) {
        whichMessageIndex = 1;
        modSize = 16;
    } else {
        whichMessageIndex = -1;
    }
    screenIsBigEnough = whichMessageIndex > -1 && gridHeight > 8;

    fillCellArrays();

    whichRule = 
    // ruleDefinitions.length-1;
    shuffledRules[shuffledRuleIndex];

    displayRule(ruleDefinitions[whichRule]);

    drawOnce = true;

    alternateCellBufferCounter = 0;

    then = window.performance.now();

    draw();
}

const fillCellArrays = () => {
    if (screenIsBigEnough) {

        let i;
        let j = paddingTop * gridWidth;

        greetingBitmap[whichMessageIndex].forEach((isAlive,i) => {
            if (i%modSize === 0) {
                j = recenterIndex(j, gridWidth, modSize);
            }

            cells[j] = !!isAlive;

            for (let p = 0; p<scale; ++p) {
                for (let q = 0; q<scale; ++q) {
                    if (!(p === 0 && q === 0)) {
                        cells[j + p*gridWidth + q] = cells[j];
                    }
                }
            }

            j+=scale;


        });
    } else {
        // cells = cells.map(a => Math.random() < .5);//001);

        // butterfly
        // nxn square -> pattern

        // n  -> pattern
        // ---------
        // 1  -> death
        // 2  -> stable 2x2
        // 3  -> 3-blinker
        // 4  -> 4-blinker
        // 5  -> 3-blinker
        // 6  -> 4-blinker
        // 7  -> death
        // 8  -> 4-blinker
        // 9  -> death
        // 10 -> stable 2x2
        // 11 -> death
        // 12 -> stable 2x2
        // 13 -> death
        // 14 -> 4-blinker
        // 15 -> death
        // 16 -> 4-blinker
        // 17 -> death
        // 18 -> 4-blinker
        // 19 -> death
        // 20 -> 4-blinker
        // 21 -> death
        // 22 -> 4-blinker (looks like 18 at some poitn)
        // 23 -> death
        // 24 -> 4-blinker
        // 25 -> death

        ////*** results may be incorrect
        // 26 -> stable 2x2
        // 27 -> death
        // 28 -> 4-blinker
        // 29 -> death
        // 30 -> death
        // 31 -> 4 new blinkers
        // 32 -> 


        let sides = 22;

        for (let i = 0; i<sides; ++i) {
            for (let j = 0; j<sides; ++j) {
                // cells[Math.floor(cells.length/2 + gridWidth/2)] = true;
                // cells[Math.floor(cells.length/2 - sides/2 - sides*gridWidth/2) + i*gridWidth + j] = true;
                cells[(j + 3)*gridWidth + i + Math.floor(gridWidth/2 - sides/2)] = true;
            }
        }


    }
}

const recenterIndex = (j, w, m) => {
    j -= (j%w);
    j += Math.floor((w - scale*m)/2);
    j += scale*w;
    return j;
}

const update = (rule, cells, cells2, w, h) => {
    let sum = 0;
    let i, j, which;
    let onLeft, onRight, onTop, onBottom, onEdge;
    const l = cells.length;

    for (i = 0; i<l; ++i) {
        onLeft = onTheLeft(i,w);
        onRight = onTheRight(i,w);

        onTop = onTheTop(i,w);
        onBottom = onTheBottom(i,w,h);

        // sum =   +cells[i-w]
        //         +cells[i+w]
        //         +cells[i-1]
        //         +cells[i+1]
        //         +cells[i-w-1]
        //         +cells[i-w+1]
        //         +cells[i+w-1]
        //         +cells[i+w+1];

        sum =   +(onTop ? cells[l-w + (i%w)] : cells[i-w])
                +(onBottom ? cells[i%w] : cells[i+w])
                +(onLeft ? cells[i+w-1] : cells[i-1])
                +(onRight ? cells[i-w+1] : cells[i+1])
                
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
        for (j = 0; j<rule[which].length; ++j) {
            if (sum === rule[which][j]) {
                cells2[i] = true;
                break;
            }
        }
    }
}

const onTheLeft = (i, w) => i%w === 0;
const onTheRight = (i, w) => i%w === w-1;

const onTheTop = (i, w) => Math.floor(i/w) === 0;
const onTheBottom = (i, w, h) => Math.floor(i/w) === h-1;

// const onTheEdge = (i, w, h) => {
//     const j = Math.floor(i/w);
//     return (
//             i%w === 0
//         ||  i%w === w-1
//         ||  j   === 0
//         ||  j   === h-1
//     );
// }

const draw = () => {
    animationFrameID = requestAnimationFrame(draw);

    if (!paused) {
        now = window.performance.now();
        elapsed = now - then;

        if (elapsed > fpsInterval) {
            if (drawOnce || animationCounter >= delay) {
                ctx.clearRect(0,0,cv.width, cv.height);

                const isEvenFrame = alternateCellBufferCounter === 0;
                const c1 = isEvenFrame ? cells : cells2;
                const c2 = isEvenFrame ? cells2 : cells;


                c1.forEach((cell, i) => {
                    if (cell) {
                        ctx.fillStyle = colorPalette[cellColors[i]];

                        // `rgb(${Math.random()*255}, ${Math.random()*255}, ${Math.random()*255})`;//"#0af";
                        ctx.fillRect((i%gridWidth)*boxSize, Math.floor(i/gridWidth)*boxSize, boxSize, boxSize);
                    }
                });

                update(ruleDefinitions[whichRule], c1, c2, gridWidth, gridHeight);

                alternateCellBufferCounter = (++alternateCellBufferCounter)%2;
                
                if (drawOnce) drawOnce = false;  
            }

            animationCounter++;

            if (animationCounter >= delay + duration) {
                alternateCellBufferCounter = 0;
                animationCounter = 0;
                drawOnce = true;
                shuffledRuleIndex = (++shuffledRuleIndex)%shuffledRules.length;
                whichRule = shuffledRules[shuffledRuleIndex];
                // console.log(ruleDefinitions[whichRule][0]);
                displayRule(ruleDefinitions[whichRule]);
                cells.fill(0);
                fillCellArrays();
            }

            then = now - (elapsed % fpsInterval);
        }
    }
}

const displayRule = (rule) => {
    nameDiv.innerText = '\''+rule[0]+'\'';
    authorDiv.innerText = rule[3] ? 'by '+rule[3] : '';
    encodingDiv.innerText =
        'rule : {'
        +rule[1].join(',')
        +'}/{'
        + rule[2].join(',')
        +'}';
}

window.onresize = () => {
    cv.width = window.innerWidth;
    cv.height = window.innerHeight;
    cancelAnimationFrame(animationFrameID);
    initialize();
}

window.onkeyup = e => {
    if (e.key === "ArrowRight") {
        shuffledRuleIndex = (++shuffledRuleIndex)%shuffledRules.length;
        whichRule = shuffledRules[shuffledRuleIndex];
        animationCounter = delay;
        displayRule(ruleDefinitions[whichRule]);
    }
    if (e.key === "ArrowLeft") {
        shuffledRuleIndex--;
        if (shuffledRuleIndex < 0) {
            shuffledRuleIndex = ruleDefinitions.length-1;
        }
        whichRule = shuffledRules[shuffledRuleIndex];
        animationCounter = delay;
        displayRule(ruleDefinitions[whichRule]);
    }
    if (e.key === "p") paused = !paused;
    if (e.key === "r") initialize();
}

initialize();

})();
/*
p5.disableFriendlyErrors = true

var x = 256;
var y = 64;
var welcome = [
  [
    0, 0,0,0,0,0, 0,0,0,0,0, 0,0,0,0, 0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
    0, 1,0,0,0,1, 0,1,1,1,0, 1,0,0,0, 1,1,0,1,1,1,0,1,1,1,1,1,0,1,1,1,0,
    0, 1,0,1,0,1, 0,1,0,0,0, 1,0,0,0, 1,0,0,1,0,1,0,1,0,1,0,1,0,1,0,0,0,
    0, 1,0,1,0,1, 0,1,1,1,0, 1,0,0,0, 1,0,0,1,0,1,0,1,0,1,0,1,0,1,1,1,0,
    0, 1,0,1,0,1, 0,1,0,0,0, 1,0,0,0, 1,0,0,1,0,1,0,1,0,1,0,1,0,1,0,0,0,
    0, 1,1,1,1,1, 0,1,1,1,0, 1,1,1,0, 1,1,0,1,1,1,0,1,0,0,0,1,0,1,1,1,0,
    0, 0,0,0,0,0, 0,0,0,0,0, 0,0,0,0, 0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
    0, 0,0,0,0,0, 0,0,0,0,0, 0,0,0,0, 0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0
  ],
  [
    0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
    0,0,0,0,0,0,0,0,0,0,0,0,1,0,1,0, 0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
    0,0,0,0,0,0,0,0,0,0,0,0,1,0,1,0, 0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
    0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,0, 0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
    0,0,0,0,0,0,0,0,0,0,0,0,1,0,1,0, 0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
    0,0,0,0,0,0,0,0,0,0,0,0,1,0,1,0, 0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
    0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
    0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0
  ],


  // ,
  // [
  //   0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
  //   0,0,1,1,1,1,0,1,1,1,1,0,1,1,1,0,1,1,1,1,1,0,1,0,0,0,1,0,0,0,0,0,
  //   0,0,1,0,0,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,1,0,1,1,0,0,1,0,0,0,0,0,
  //   0,0,1,1,1,1,0,1,1,1,1,0,0,1,0,0,1,1,1,1,1,0,1,0,1,0,1,0,0,0,0,0,
  //   0,0,0,0,0,1,0,1,0,0,1,0,0,1,0,0,1,1,0,0,1,0,1,0,0,1,1,0,0,0,0,0,
  //   0,0,1,1,1,1,0,1,0,0,1,0,0,1,0,0,1,1,0,1,1,0,1,0,0,0,1,0,0,0,0,0,
  //   0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
  //   0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0
  // ],
  // [
  //   0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
  //   0,0,1,0,0,0,1,0,1,1,1,0,1,0,1,0,1,1,0,1,0,1,0,1,0,1,0,0,1,0,0,0,
  //   0,0,1,0,0,0,1,0,1,0,1,0,1,0,1,0,1,0,0,1,0,1,0,1,0,1,0,0,1,0,0,0,
  //   0,0,0,1,0,1,0,0,1,1,0,0,1,0,1,0,1,0,0,1,1,1,0,1,0,1,0,0,1,0,0,0,
  //   0,0,0,1,0,1,0,0,1,0,1,0,0,1,0,0,1,0,0,1,0,1,0,1,0,1,0,0,1,0,0,0,
  //   0,0,0,0,1,0,0,0,1,0,1,0,0,1,0,0,1,0,0,1,0,1,0,1,0,1,0,0,1,0,0,0,
  //   0,0,0,0,1,0,0,0,1,0,1,0,0,1,0,0,1,1,0,1,0,1,0,1,0,1,1,0,1,1,0,0,
  //   0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0
  // ]
]
var welcome2 = [];
var cells = [];
var rules = [
  ['maze',[1,2,3,4,5],[3]],
  ['mazectric',[1,2,3,4],[3],'Charles A. Rockafellor'],
  ['maze with mice',[1,2,3,4,5],[3,7]],
  ['electric maze',[1,2,3,4],[4,5]],
  ['coral',[4,5,6,7,8],[3]],
  ['day and night',[3,4,6,7,8],[3,4,6,7,8],'Nathan Thompson'],
  ['gnarl',[1],[1],'Kellie Evans'],
  ['walled cities',[2,3,4,5],[4,5,6,7,8],'David Macfarlane'],
  ['the (classic) game of life',[2,3],[3],'John Conway'],
  ['Flakes', [0,1,2,3,4,5,6,7,8], [3], 'Janko Gravner'],
  ['34 Life',[3,4],[3,4]],
  ['2x2',[1,2,5],[3,6]],
  ['Assimilation',[4,5,6,7],[3,4,5]],
  ['replicator',[1,3,5,7],[1,3,5,7]],
  ['worms',[3,5,6,7],[3,6,7],'Jesse Jenks']
];

// randomly generated but cool
// [2,3,4,5,7],[2]
var rule = 4;
var paused = false;
var message = -1;

var main_color
var white

var cnv;
var scale;// = 2;
function setup() {
  // scale = (window.innerWidth < 640)? 2 : 3;
  scale = 3;
  cnv = createCanvas(scale*x, scale*y);
  cnv.parent('automata');

  let row = [];
  if (message === -1) {
    message = 0;
  }

  message = (window.innerWidth < 640)? 1: 0;
  // message = 0;//floor(random()*welcome.length);

  for (let i = 0; i<welcome[message].length; i++) {
    row.push(welcome[message][i])
    if (i>0 && (i%32) === 31) {
      for (let j = 0; j<8; j++) {
        welcome2 = welcome2.concat(row);
      }
      row = [];
    }
  }
  
  for (let i = 0; i<x*y; i++) {
    cells[i] = welcome2[floor(i/8)];
    // cells[i] = welcome[floor(i/8)];
  }


  main_color = color(90,165,255)
  white = color(255)
  // For generating a random rule
  let randRule = ['randomly generated rule', [], []];
  for (let i = 0; i<=8; i++) {
    if (random() < 0.4) randRule[1].push(i);
    if (random() < 0.2) randRule[2].push(i);
  }
  rules.push(randRule);
  displayRule();
  // background(255);
}

function draw() {
  // console.log(scale);
  // if (mouseIsPressed) {
  //   cells[floor(mouseY/3)*x + floor(mouseX/3)] = true;
  //   cells[floor(mouseY/3)*x + floor(mouseX/3)+1] = true;
  //   cells[floor(mouseY/3)*x + floor(mouseX/3)-1] = true;
  //   cells[floor(mouseY/3 + 1)*x + floor(mouseX/3)] = true;
  //   cells[floor(mouseY/3 - 1)*x + floor(mouseX/3)] = true;
  // }
  // var yVal
  let xPos
  let yPos
  let c
  for (let i = 0; i<cells.length; i++) {
    // yVal = 1-Math.floor(i/x)/y;
    xPos = (i%x)
    yPos = Math.floor(i/x)
    // actually insanely faster
    c = cells[i]? main_color:white; // color(90,150*yVal+50,200+55*yVal): color(255);
    // if (scale === 3) {
      set(3*xPos, 3*yPos, c);
      set(3*xPos+1, 3*yPos, c);
      set(3*xPos, 3*yPos+1, c);
      set(3*xPos+1, 3*yPos+1, c);
    // } else {
      // set(2*xPos, 2*yPos, c);
    // }
  }
  
  if (focused && !paused && frameCount > 40) {
    update();
    updatePixels();
  }
  // if (frameCount%240===0) {
  //   rule++;
  //   rule%=rules.length
  //   displayRule();
  // }
}
function update() {
  let sum = 0
  let r = 0
  for (let i = 0; i<x*y; i++) {
    if (i%x != x-1 && i%x != 0 && Math.floor(i/x) != 0 && Math.floor(i/x) != y-1){
      // oh javascript, you're so crazy
      sum = 0+cells[i-x]+cells[i+x]+cells[i-1]+cells[i+1]+cells[i-x-1]+cells[i-x+1]+cells[i+x-1]+cells[i+x+1];

      if (cells[i]){
        cells[i] = false;
        for (r = 0; r<rules[rule][1].length; r++) if (sum===rules[rule][1][r]) cells[i] = true;
      }
      else{
        cells[i] = false;
        for (r = 0; r<rules[rule][2].length; r++) if (sum===rules[rule][2][r]) cells[i] = true;
      }
    r = 0
    }
  }
}
function keyTyped() {
  if (key === 'r') {
    for (let i = 0; i<cells.length; i++) {
      // cells[i] = (i%x > x/4 && i%x < 3*x/4 && i/x > y/4 && i/x < 3*y/4)? (random() < 0.2) : false;
      cells[i] = welcome2[floor(i/8)];
    }
  } else if (key === 'p') {
    paused = !paused;
  }
}
function keyPressed() {
  if (keyCode === LEFT_ARROW) {
    // rule = floor(random(rules.length));
    rule++;
    rule%=rules.length;
    displayRule();
  } else if (keyCode === RIGHT_ARROW) {
    rule--;
    if (rule < 0) rule = rules.length-1;
    displayRule();
  }
}
function displayRule() {
  let str = '\''+rules[rule][0]+'\'';
  if (rules[rule][3]) str+=' by '+rules[rule][3];
  str+='\nrule: '
  for (var r = 0; r<rules[rule][1].length; r++) str+=rules[rule][1][r];
  str+='/'
  for (var r = 0; r<rules[rule][2].length; r++) str+=rules[rule][2][r];
  // str+='\nThere are currently '+rules.length+' rules with more to be added';
  document.getElementById("name_of_rule").innerText = str;
}

// function windowResized() {
//   if (window.innerWidth < 640) {
//     message = 1;
//     setup();
//   } else {
//     message = 0;
//     setup();
//   }
//   // let new_scale = (window.innerWidth < 640)? 2 : 3;
//   // if (new_scale != scale) {
//   //   scale = new_scale;
//   //   resizeCanvas(scale*x, scale*y);
//   //   for (let i = 0; i<width*height; i++) {
//   //     set(i%width,floor(i/width),white);
//   //   }
//   //   updatePixels();
//   // }
// }
*/
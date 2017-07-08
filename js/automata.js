p5.disableFriendlyErrors = true

var x = 256;
var y = 64;
var welcome = [
  [
    0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
    0,1,0,0,0,1,0,1,1,1,0,1,0,0,0,1,1,0,1,1,1,0,1,1,1,1,1,0,1,1,1,0,
    0,1,0,1,0,1,0,1,0,0,0,1,0,0,0,1,0,0,1,0,1,0,1,0,1,0,1,0,1,0,0,0,
    0,1,0,1,0,1,0,1,1,1,0,1,0,0,0,1,0,0,1,0,1,0,1,0,1,0,1,0,1,1,1,0,
    0,1,0,1,0,1,0,1,0,0,0,1,0,0,0,1,0,0,1,0,1,0,1,0,1,0,1,0,1,0,0,0,
    0,1,1,1,1,1,0,1,1,1,0,1,1,1,0,1,1,0,1,1,1,0,1,0,0,0,1,0,1,1,1,0,
    0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
    0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0
  ]
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

function setup() {
  var cnv = createCanvas(3*x, 3*y);
  cnv.parent('automata');

  var row = [];
  message = floor(random()*welcome.length);
  for (var i = 0; i<welcome[message].length; i++) {
    row.push(welcome[message][i])
    if (i>0 && (i%32) === 31) {
      for (var j = 0; j<8; j++) {
        welcome2 = welcome2.concat(row);
      }
      row = [];
    }
  }
  for (var i = 0; i<x*y; i++) {
    cells[i] = welcome2[floor(i/8)];
  }


  main_color = color(90,165,255)
  white = color(255)
  // For generating a random rule
  var randRule = ['randomly generated rule', [], []];
  for (var i = 0; i<=8; i++) {
    if (random() < 0.4) randRule[1].push(i);
    if (random() < 0.2) randRule[2].push(i);
  }
  rules.push(randRule);
  displayRule();
  // background(255);
}

function draw() {
  // if (mouseIsPressed) {
  //   cells[floor(mouseY/3)*x + floor(mouseX/3)] = true;
  //   cells[floor(mouseY/3)*x + floor(mouseX/3)+1] = true;
  //   cells[floor(mouseY/3)*x + floor(mouseX/3)-1] = true;
  //   cells[floor(mouseY/3 + 1)*x + floor(mouseX/3)] = true;
  //   cells[floor(mouseY/3 - 1)*x + floor(mouseX/3)] = true;
  // }
  var i
  // var yVal
  var xPos
  var yPos
  var c
  for (i = 0; i<cells.length; i++) {
    // yVal = 1-Math.floor(i/x)/y;
    xPos = (i%x)
    yPos = Math.floor(i/x)
    // actually insanely faster
    c = cells[i]? main_color:white; // color(90,150*yVal+50,200+55*yVal): color(255);
    set(3*xPos, 3*yPos, c);
    set(3*xPos+1, 3*yPos, c);
    set(3*xPos, 3*yPos+1, c);
    set(3*xPos+1, 3*yPos+1, c);
  }
  
  if (!paused && frameCount > 45) {
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
  var i
  var sum = 0
  var r = 0
  for (i = 0; i<x*y; i++) {
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
    for (var i = 0; i<cells.length; i++) {
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
  var str = '\''+rules[rule][0]+'\'';
  if (rules[rule][3]) str+=' by '+rules[rule][3];
  str+='\nrule: '
  for (var r = 0; r<rules[rule][1].length; r++) str+=rules[rule][1][r];
  str+='/'
  for (var r = 0; r<rules[rule][2].length; r++) str+=rules[rule][2][r];
  // str+='\nThere are currently '+rules.length+' rules with more to be added';
  document.getElementById("name_of_rule").innerText = str;
}

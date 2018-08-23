p5.disableFriendlyErrors = true

var x, y;// = 64;
var welcome;
var cells;
var rules;

// randomly generated but cool
// [2,3,4,5,7],[2]
// [2,3,4], [1,3,7]
// 4578/12
var rule_count, rule_indices, rule;
var paused;
var message;
var scale;

var main_color, white;


var box_w;

var frameCounter;
function setup() {
	var cv = createCanvas(windowWidth, windowHeight);
	cv.position(0,0);
	cv.style("z-index:-1;");
	cv.style("position:absolute;");
	var elt = document.getElementsByTagName("BODY")[0];
	cv.parent(elt);

	// pixelDensity(1);

	box_w = 5;
	setScale();

	message = -1;
	parent = false;

	// which message to display
	message = 0;
	welcome = [
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
		],
		// [
		// 	0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
		// 	0,0,0,0,0,0,0,0,0,0,0,0,1,0,1,0, 0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
		// 	0,0,0,0,0,0,0,0,0,0,0,0,1,0,1,0, 0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
		// 	0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,0, 0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
		// 	0,0,0,0,0,0,0,0,0,0,0,0,1,0,1,0, 0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
		// 	0,0,0,0,0,0,0,0,0,0,0,0,1,0,1,0, 0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
		// 	0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
		// 	0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0
		// ],


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
	];

	rules = [
		['maze',[1,2,3,4,5],[3]],
		['mazectric',[1,2,3,4],[3],'Charles A. Rockafellor'],
		['maze with mice',[1,2,3,4,5],[3,7]],
		['electric maze',[1,2,3,4],[4,5]],
		['coral',[4,5,6,7,8],[3]],
		['day and night',[3,4,6,7,8],[3,4,6,7,8],'Nathan Thompson'],
		// ['gnarl',[1],[1],'Kellie Evans'],
		['walled cities',[2,3,4,5],[4,5,6,7,8],'David Macfarlane'],
		['the (classic) game of life',[2,3],[3],'John Conway'],
		['Amoeba', [1,3,5,8], [3,5,7], ''],
		['Coagulations', [2,3,5,6,7,8], [3,7,8], ''],
		['Diamoeba', [5,6,7,8], [3,5,6,7,8], 'Dean Hickerson'],
		// ['Long life', [5], [3,4,5], 'Andrew Trevorrow'],
		// ['Flakes', [0,1,2,3,4,5,6,7,8], [3], 'Janko Gravner'],
		// ['34 Life',[3,4],[3,4]],
		// ['2x2',[1,2,5],[3,6]],
		// ['Assimilation',[4,5,6,7],[3,4,5]],
		// ['replicator',[1,3,5,7],[1,3,5,7]],
		['worms',[3,5,6,7],[3,6,7],'me :)']
	];

	// x = Math.floor(width/box_w)+1;
	// y = Math.floor(height/box_w)+1;

	// let row = [];
	// if (message === -1) {
	// 	message = 0;
	// }

	// message = (window.innerWidth < 640)? 1: 0;
	// // message = 0;//floor(random()*welcome.length);

	// for (let i = 0; i<welcome[message].length; i++) {
	// row.push(welcome[message][i])
	// if (i>0 && (i%32) === 31) {
	// for (let j = 0; j<8; j++) {
	// welcome2 = welcome2.concat(row);
	// }
	// row = [];
	// }
	// }

	// for (let i = 0; i<x*y; i++) {
	// cells[i] = welcome2[floor(i/8)];
	// // cells[i] = welcome[floor(i/8)];
	// }

	// for (let i = 0; i<x*y; i++) {
	// 	cells[i] = (Math.random()<0.2)?1:0;
	// }
	
	

	main_color = color(90,165,255);
	white = color(255);

	// // For generating a random rule
	// let randRule = ['randomly generated rule', [], []];
	// for (let i = 0; i<=8; i++) {
	// 	if (random() < 0.4) randRule[1].push(i);
	// 	if (random() < 0.2) randRule[2].push(i);
	// }
	// rules.push(randRule);

	rule_indices = fisher_yates(rules.length);
	rule_count = 0;
	rule = rule_indices[rule_count];

	displayRule();
	// background(255);
	noStroke();
	frameRate(24);

	initialize();
	// background(255);

	loadPixels();
}

function draw() {
	background(255);
	// loadPixels();
	let xPos, yPos, c;
	let j, k;
	for (let i = 0; i<cells.length; i++) {
		xPos = (i%x);
		yPos = Math.floor(i/x);
		c = (cells[i])? main_color : white;
			for (j = 0; j<box_w; j++) {
				for (k = 0; k<box_w; k++) {
					set(xPos*box_w + j, yPos*box_w + k, c);
				}
			}
	}

	if (focused && !paused && frameCounter > 24) {
		update();
	} else {
		frameCounter++;
	}
	updatePixels();


	if (frameCount % (10*24) === 0) {
		initialize();
		rule_count++;
		rule_count%=rules.length;
		rule = rule_indices[rule_count];
		displayRule();
	}
}
function update() {
	let sum = 0;
	let r = 0;
	for (let i = 0; i<x*y; i++) {
		if (i%x != x-1 && i%x != 0 && Math.floor(i/x) != 0 && Math.floor(i/x) != y-1) {
			// oh javascript, you're so crazy
			sum = 0+cells[i-x]+cells[i+x]+cells[i-1]+cells[i+1]+cells[i-x-1]+cells[i-x+1]+cells[i+x-1]+cells[i+x+1];

			if (cells[i]) {
				cells[i] = false;
				for (r = 0; r<rules[rule][1].length; r++) if (sum===rules[rule][1][r]) cells[i] = true;
			} else {
				cells[i] = false;
				for (r = 0; r<rules[rule][2].length; r++) if (sum===rules[rule][2][r]) cells[i] = true;
			}

			r = 0
		}
	}
}

function keyTyped() {
	if (key === 'r') {
		initialize();
	} else if (key === 'p') {
		paused = !paused;
	}
}

function keyPressed() {
	if (keyCode === LEFT_ARROW) {
		rule_count++;
		rule_count%=rules.length;
		rule = rule_indices[rule_count];
		displayRule();
	} else if (keyCode === RIGHT_ARROW) {
		rule_count--;
		if (rule_count<0) rule_count = rules.length-1;
		rule = rule_indices[rule_count];
		displayRule();
	}
}

function displayRule() {
	let str = '\''+rules[rule][0]+'\'';
	if (rules[rule][3]) str+=' by '+rules[rule][3];
	str+='\nrule: '
	let r;
	for (r = 0; r<rules[rule][1].length; r++) str+=rules[rule][1][r];
	str+='/'
	for (r = 0; r<rules[rule][2].length; r++) str+=rules[rule][2][r];
	// str+='\nThere are currently '+rules.length+' rules with more to be added';
	document.getElementById("name_of_rule").innerText = str;
}
// why does this happen??
// I kinda hate javascript???
function setScale() {
	scale = 5;
}
function initialize() {
	x = Math.floor(width/box_w)+1;
	y = Math.floor(height/box_w)+1;

	setScale();

	// console.log("scale "+scale);
	// console.log(width*height);
	// console.log(pixels.length);

	let mod_size = 32;

	if (x > 32*scale) {
		message = 0;
		mod_size = 32;
	} else if (x > 16*scale) {
		message = 1;
		mod_size = 16;
	} else {
		message = -1;
	}

	cells = new Uint8Array(x*y);

	let i;
	if (message > -1 && y > scale*8) {
		let j;

		let k, l;

		j = 3*x;


		for (i = 0; i<welcome[message].length; i++) {
			if (i%mod_size===0) {
				j -= (j%x);
				j += Math.floor((x/scale-mod_size)/2);//Math.floor((x-80)/2);
				j += x;
			}
			// cells[2*j] = welcome[message][i];
			// cells[2*j+1] = welcome[message][i];
			// cells[2*j+x] = welcome[message][i];
			// cells[2*j+x+1] = welcome[message][i];
			for (k = 0; k<scale; k++) {
				for (l = 0; l<scale; l++) {
					cells[scale*j + k*x + l] = welcome[message][i];
				}
			}

			j++;
		}
	} else {
		for (i = 0; i<cells.length; i++) {
			cells[i] = (Math.random()<0.1)?1:0;
		}
	}

	frameCounter = 0;
}

function windowResized() {
	resizeCanvas(windowWidth, windowHeight);
	loadPixels();
	initialize();
}

function fisher_yates (n) {
	let arr = [];
	let i;
	for (i = 0; i<n; ++i) arr[i] = i;

	let j, temp;
	for (i = 0; i<n-1; ++i) {
		j = i + floor(Math.random()*(n-i));

		temp = arr[i];
		arr[i] = arr[j];
		arr[j] = temp;
	}

	return arr;
}
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
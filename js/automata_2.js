p5.disableFriendlyErrors = true

var x, y;// = 64;
var welcome;
var cells, cells2;
var rules;


var rule_count, rule_indices, rule;
var paused;
var stay_on_rule;
var message;
var scale;

var main_color, white;


var box_w;
var top_buffer;

var pause_counter, frame_counter;
var pause_length, pause_on_rule, frames_per_second;
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
	paused = false;
	stay_on_rule = false;

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
		['Maze',[1,2,3,4,5],[3]],
		['Mazectric',[1,2,3,4],[3],'Charles A. Rockafellor'],
		['Maze with Mice',[1,2,3,4,5],[3,7]],
		// ['Electric Maze',[1,2,3,4],[4,5]],
		['Coral',[4,5,6,7,8],[3]],
		['Day and Night',[3,4,6,7,8],[3,4,6,7,8],'Nathan Thompson'],
		['gnarl',[1],[1],'Kellie Evans'],
		['Walled Cities',[2,3,4,5],[4,5,6,7,8],'David Macfarlane'],
		['The (classic) Game of Life',[2,3],[3],'John Conway'],
		['Amoeba', [1,3,5,8], [3,5,7]],
		['Coagulations', [2,3,5,6,7,8], [3,7,8]],
		['Diamoeba', [5,6,7,8], [3,5,6,7,8], 'Dean Hickerson'],
		['Move', [2,4,5], [3,6,8]],
		['Stains', [2,3,5,6,7,8], [3,6,7,8]],
		['Serviettes', [], [2,3,4], ''],
		['Long life', [5], [3,4,5], 'Andrew Trevorrow'],
		['Flakes', [0,1,2,3,4,5,6,7,8], [3], 'Janko Gravner'],
		['34 Life',[3,4],[3,4]],
		['2x2',[1,2,5],[3,6]],
		['Assimilation',[4,5,6,7],[3,4,5]],
		['replicator',[1,3,5,7],[1,3,5,7]],
		['Branchy', [2,3,4,5,7],[2], 'me :)'],
		// ['randomly generated 2', [2,3,4], [1,3,7], 'the Gods of Chaos'],
		// ['randomly generated 3', [4,5,7,8], [1,2], 'the Gods of Chaos'],
		['Worms',[3,5,6,7],[3,6,7],'me :)']
	];

	// randomly generated and cool
	// [2,3,4,5,7],[2]
	// [2,3,4], [1,3,7]
	// 4578/12

	main_color = color(90,165,255);
	white = color(255);

	// // For generating a random rule
	// // not used since it sometimes creates seizure inducing rules
	// 
	// let randRule = ['randomly generated rule', [], []];
	// for (let i = 0; i<=8; i++) {
	// 	if (random() < 0.4) randRule[1].push(i);
	// 	if (random() < 0.2) randRule[2].push(i);
	// }
	// rules.push(randRule);

	rule_indices = fisher_yates(rules.length);
	rule_count = 0;
	rule = rules.length-2;//rule_indices[rule_count];

	displayRule();
	
	frame_counter = 1;

	// delay in seconds;
	// how long to display welcome text
	pause_length = 1.5;
	// how long to stay on a rule
	// until changing to the next one
	pause_on_rule = 6;

	frames_per_second = 24;

	frameRate(frames_per_second);

	initialize();

	loadPixels();
}

function draw() {
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

	if (focused && !paused) {
		if (pause_counter > pause_length*frames_per_second) {
			update();
		} else {
			pause_counter++;
		}

		if (!stay_on_rule && frame_counter % (pause_on_rule*frames_per_second) === 0) {
			initialize();
			rule_count++;
			rule_count%=rules.length;
			rule = rule_indices[rule_count];
			displayRule();
		}
		frame_counter++;
	}
	updatePixels();
}
function update() {
	let sum = 0;
	let r = 0;
	for (let i = 0; i<x*y; i++) {
		if (i%x !== x-1 && i%x !== 0 && Math.floor(i/x) !== 0 && Math.floor(i/x) !== y-1) {
			// counts the number of living neighbors
			// oh javascript, you're so crazy
			sum = 0+cells[i-x]+cells[i+x]+cells[i-1]+cells[i+1]+cells[i-x-1]+cells[i-x+1]+cells[i+x-1]+cells[i+x+1];

			if (cells[i]) {
				cells2[i] = false;
				for (r = 0; r<rules[rule][1].length; r++) if (sum===rules[rule][1][r]) cells2[i] = true;
			} else {
				cells2[i] = false;
				for (r = 0; r<rules[rule][2].length; r++) if (sum===rules[rule][2][r]) cells2[i] = true;
			}

			r = 0
		}
	}

	for (let i = 0; i<cells.length; i++) cells[i] = cells2[i];

	// let sum = 0;
	// let r = 0;
	// for (let i = 0; i<x*y; i++) {
	// 	if (i%x !== x-1 && i%x !== 0 && Math.floor(i/x) !== 0 && Math.floor(i/x) !== y-1) {
	// 		// counts the number of living neighbors
	// 		// oh javascript, you're so crazy
	// 		sum = 0+cells[i-x]+cells[i+x]+cells[i-1]+cells[i+1]+cells[i-x-1]+cells[i-x+1]+cells[i+x-1]+cells[i+x+1];

	// 		if (cells[i]) {
	// 			cells[i] = false;
	// 			for (r = 0; r<rules[rule][1].length; r++) if (sum===rules[rule][1][r]) cells[i] = true;
	// 		} else {
	// 			cells[i] = false;
	// 			for (r = 0; r<rules[rule][2].length; r++) if (sum===rules[rule][2][r]) cells[i] = true;
	// 		}

	// 		r = 0
	// 	}
	// }
}

function keyTyped() {
	if (key === 'r') {
		initialize();
	} else if (key === 'p') {
		paused = !paused;
	} else if (key === 's') {
		stay_on_rule = !stay_on_rule;
	}
}

function keyPressed() {
	if (keyCode === RIGHT_ARROW) {
		rule_count++;
		rule_count%=rules.length;
		rule = rule_indices[rule_count];
		displayRule();
	} else if (keyCode === LEFT_ARROW) {
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

	document.getElementById("name_of_rule").innerText = str;
}

// change scale if screen is small
function setScale() {
	if (windowWidth < 640) {
		scale = 2;
		top_buffer = 14;
	} else {
		scale = 4;
		top_buffer = 6;
	}
}

function initialize() {
	x = Math.floor(width/box_w)+1;
	y = Math.floor(height/box_w)+1;

	setScale();

	console.log("scale "+scale);
	console.log(width*height);
	console.log(pixels.length);

	let mod_size = 32;

	// change message to shorter one if screen size is small
	// not really necessary anymore
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
	cells2 = new Uint8Array(x*y);

	let i;
	if (message > -1 && y > scale*8) {
		let j;

		let k, l;

		j = top_buffer*x;


		for (i = 0; i<welcome[message].length; i++) {
			if (i%mod_size===0) {
				j -= (j%x);
				j += Math.floor((x/scale-mod_size)/2);
				j += x;
			}

			for (k = 0; k<scale; k++) {
				for (l = 0; l<scale; l++) {
					cells[scale*j + k*x + l] = welcome[message][i];
				}
			}

			j++;
		}
	} else {
		// if screen is too small, fill randomly
		for (i = 0; i<cells.length; i++) {
			cells[i] = (Math.random()<0.1)?1:0;
		}
	}

	pause_counter = 0;
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
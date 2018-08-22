var values, cols, frontier, box_w, w, h, epsilon;
var fail_counter, max_fails;
function setup() {
	var cv = createCanvas(windowWidth, windowHeight);
	cv.position(0,0);
	cv.style("z-index:-1;");
	cv.style("position:absolute;");
	// var cv = createCanvas(500,500);
	var elt = document.getElementsByTagName("BODY")[0];
	cv.parent(elt);

	// width and height of each cell
	box_w = 35;

	// color increment
	epsilon = 0.02;

	// precompute colors
	cols = [];
	for (let i = 0; i<1/epsilon; ++i) {
		cols[i] = sinebow(i*epsilon, 0.3);
	}

	max_fails = 50;

	// set up arrays
	initialize();

	noStroke();
	background(255);
	frameRate(20);
}
function draw() {
	if (frontier.length > 0) {
		let x, y;
		let j;
		for (let i = 0; i<frontier.length; ++i) {
			// frontier stores indices of cells
			j = frontier[i];
			// values contains the index of colors
			fill(cols[values[j]]);

			x = j%w;
			y = floor(j/w);

			rect(x*box_w, y*box_w, box_w, box_w);
		}
	}

	// only update if window is in focus
	// also stop updating if couldn't find an unvisited cell
	// after 'max_fails' many attempts
	if (focused && fail_counter<max_fails) {
		update();
	}
}

function update() {
	let curr;
	
	let try_to_update = true;

	if (frontier.length === 0) {
		curr = floor(Math.random()*values.length);
		if (values[curr] == -1) {
			values[curr] = floor(Math.random()*cols.length);
		} else {
			fail_counter++;
			try_to_update = false;
		}
	} else {
		// curr = frontier.shift();
		// curr = frontier.pop();
		curr = (Math.random()<0.9)? frontier.shift(): frontier.pop();
	
		fail_counter = 0;
	}


	if (try_to_update) {
		// to randomize the order of checking directions
		let a = fisher_yates(4);
		// fountain
		// [0,2,3,1];
		let c;
		for (let i = 0; i<a.length; ++i) {
			c = a[i];

			// von Neumann neighborhood
			// Moore neighborhood looks dumb
			if (c === 0) {
				// north
				if (curr-w >= 0 && values[curr-w] === -1) {
					frontier.unshift(curr-w);
					values[curr-w] = alter(values[curr])
				}
			} else if (c === 1) {

				// south
				if (curr + w < values.length && values[curr+w] == -1) {
					frontier.unshift(curr+w);
					values[curr+w] = alter(values[curr])
				}
			} else if (c === 2) {

				// east
				if (curr%w < w-1 && values[curr+1] == -1) {
					frontier.unshift(curr+1);
					values[curr+1] = alter(values[curr])
				}
			} else if (c === 3) {

				// west
				if (curr%w > 0 && values[curr-1] == -1) {
					frontier.unshift(curr-1);
					values[curr-1] = alter(values[curr])
				}
			}
		} // end loop
	}
}
function alter (t) {
	return (t + 1)%cols.length;
	// return cap(t + (2*Math.random() - 1)*epsilon);
	// let p = t + (2*Math.random() - 1)*epsilon;
	// if (p > 1) p-=1;
	// if (p < 0) p+=1;
	// return p;
	// return (t + epsilon)%1;
	// return (t + Math.random()*epsilon)%1;
}

// no longer used
// function cap(t) {
// 	return max(min(t,1), 0);
// }

// used to randomize direction
// TODO
// since array size is always 4
// (since I gave up on moore neighborhood)
// all possible permutations could easily be stored
// and randomly selected from
// UPDATE
// I did that
// NOTE n is ignored
function fisher_yates (n) {

	return permutations[floor(Math.random()*24)];

	// let arr = [];
	// let i;
	// for (i = 0; i<n; ++i) arr[i] = i;

	// let j, temp;
	// for (i = 0; i<n-1; ++i) {
	// 	j = i + floor(Math.random()*(n-i));

	// 	temp = arr[i];
	// 	arr[i] = arr[j];
	// 	arr[j] = temp;
	// }

	// return arr;
}

function initialize () {
	w = floor(width/box_w)+1;
	h = floor(height/box_w)+1;

	fail_counter = 0;

	values = new Int8Array(w*h);
	frontier = [];

	for (let i = 0; i<values.length; ++i) {
		values[i] = -1;
	}

	let start = 0;
	values[start] = 0;
	frontier.unshift(start);
}

// u is hue
// v is to desaturate
// i.e. if v = 1, returns white
function sinebow (u, v) {
	t = 1 - (( u + 0.5) % 1);
	r = Math.sin(PI*t);
	g = Math.sin(PI*(t+1./3));
	b = Math.sin(PI*(t+2./3));
	return color(255*((1-v) + v*r*r), 255*((1-v) + v*g*g), 255*((1-v) + v*b*b));
}

function windowResized() {
	resizeCanvas(windowWidth, windowHeight);
	// leaves a weird artifact without loop();
	loop();
	background(255);
	initialize();
}
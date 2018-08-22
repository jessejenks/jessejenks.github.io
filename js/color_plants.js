var values, frontier, box_w, w, h;
var epsilon;
var moore;
function setup() {
	var cv = createCanvas(windowWidth, windowHeight);
	cv.position(0,0);
	cv.style("z-index:-1;");
	// cv.style("position:absolute;");
	var elt = document.getElementsByTagName("BODY")[0];
	cv.parent(elt);

	box_w = 24;

	epsilon = 0.02;

	initialize();

	noStroke();
	background(255);

	moore = false;

	frameRate(30);
}
function draw() {
	let x, y;
	let j;
	for (let i = 0; i<frontier.length; ++i) {
		j = frontier[i];
		fill(sinebow(values[j], 0.3));
		x = j%w;
		y = floor(j/w);

		rect(x*box_w, y*box_w, box_w, box_w);
	}
	if (focused) update();
}
function update() {
	let curr;
	if (frontier.length === 0) {
		curr = floor(Math.random()*values.length);
		values[curr] = Math.random();
	} else {
		// curr = frontier.shift();
		// curr = frontier.pop();
		curr = (Math.random()<0.8)? frontier.shift(): frontier.pop();
	}

	// to randomize the order of checking directions
	let a = 
	(moore)? fisher_yates(8):fisher_yates(4);
	// fountain
	// [0,2,3,1];
	let c;// = floor(Math.random()*4);
	for (let i = 0; i<a.length; ++i) {
		c = a[i]; 
		// (Math.random()<0.5)?a[i]:-1;

		// von Neumann neighborhood
		if (c === 0) {
			// north
			if (curr-w >= 0 && values[curr-w] == -1) {
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

		// // Moore neighborhood
		
		if (moore) {
			if (c === 4) {
				// north west
				if (curr-w-1 >= 0 && values[curr-w-1] == -1) {
					frontier.unshift(curr-w-1);
					values[curr-w-1] = alter(values[curr]);
				}
			} else if (c === 5) {

				// north east
				if (curr-w+1 >= 0 && values[curr-w+1] == -1) {
					frontier.unshift(curr-w+1);
					values[curr-w+1] = alter(values[curr]);
				}
			} else if (c === 6) {

				// south west
				if (curr+w-1 < values.length && values[curr+w-1] == -1) {
					frontier.unshift(curr+w-1);
					values[curr+w-1] = alter(values[curr]);
				}
			} else if (c === 7) {

				// south east
				if (curr+w+1 < values.length && values[curr+w+1] == -1) {
					frontier.unshift(curr+w+1);
					values[curr+w+1] = alter(values[curr]);
				}
			}
		}
		

		// counter++;
	} // end loop
}
function alter (t) {
	// return cap(t + (2*Math.random() - 1)*epsilon);
	// let p = t + (2*Math.random() - 1)*epsilon;
	// if (p > 1) p-=1;
	// if (p < 0) p+=1;
	// return p;
	return (t + epsilon)%1;
	// return (t + Math.random()*epsilon)%1;
}
function cap(t) {
	return max(min(t,1), 0);
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
function initialize () {
	w = floor(width/box_w)+1;
	h = floor(height/box_w)+1;

	values = [];
	frontier = [];

	for (let i = 0; i<w*h; ++i) {
		values[i] = -1;
	}

	let start = 0;
	values[start] = 0;//Math.random();
	frontier.unshift(start);
}
function sinebow (u, v) {
	t = 1 - (( u + 0.5) % 1);
	r = Math.sin(PI*t);
	g = Math.sin(PI*(t+1./3));
	b = Math.sin(PI*(t+2./3));
	return color(255*((1-v) + v*r*r), 255*((1-v) + v*g*g), 255*((1-v) + v*b*b));
}
function windowResized() {
	resizeCanvas(windowWidth, windowHeight);
	loop();
	background(255);
	initialize();
}
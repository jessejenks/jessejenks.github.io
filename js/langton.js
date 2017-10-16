var grid, grid_size,w;
var ant_pos;
var direction;
var rule;
var color_map;
var rule_selector;
var rule_map;
var brewer;

var rule_input;
var rule_input_submit;
function setup() {
	var cv = createCanvas(512,512);
	cv.parent('langton')
	grid_size = 64;

	w = width/grid_size;
	grid = new Uint8Array(grid_size*grid_size);
	// left = true
	rule_map = {
		'RL':[false,true],
		'LRL':[true,false,true],
		'LLRR':[true,true,false,false],
		'LRRL':[true,false,false,true],
		'RRLRR':[false,false,true,false,false],
		'LLRRRLR':[true,true,false,false,false,true,false],
		'LRRRRRLLR':[true,false,false,false,false,false,true,true,false],
		'RRLLLRLLLRRR':[false,false,true,true,true,false,true,true,true,false,false,false],
		'LLLLRRLLLLRRL':[true,true,true,true,false,false,true,true,true,true,false,false,true],
		'RLLRLRRLLRRLRLLR':[false,true,true,false,true,false,false,true,true,false,false,true,false,true,true,false],
		'RLRLRLRLRLRLRLRLRL':[false,true,false,true,false,true,false,true,false,true,false,true,false,true,false,true,false,true],
		'RLLRLRRLLRRLRLLRLRRLRLLRRLLRLRRL':[false,true,true,false,true,false,false,true,true,false,false,true,false,true,true,false,true,false,false,true,false,true,true,false,false,true,true,false,true,false,false,true]
	}
	rule_selector = createSelect()
	rule_selector.parent('choose-rule')
	for (let r in rule_map) {
		rule_selector.option(r);
	}
	rule_selector.changed(selectorChanged);

	brewer = colorbrewer.Set3['12'];
	selectorChanged();
	noStroke();

	rule_input = select('#enter-rule');
	rule_input_submit = select('#enter-rule-submit');
	rule_input_submit.mousePressed(parseRule);
}

function draw() {
	background('#666');
	for (let i = 0; i<grid.length; i++) {
		if (grid[i] !== 0) {
			if (i === ant_pos) {
				fill(color_map['ant'])
			} else {
				fill(color_map[grid[i]])
			}
			ellipse(w*(i%grid_size)+w/2,w*floor(i/grid_size)+w/2,w,w);
		}
	}
	update();
}

function update() {
	let curr = grid[ant_pos];
	for (let i = 0; i<rule.length; i++) {
		if (curr === i) {
			grid[ant_pos] = (i+1)%rule.length;
			if (rule[grid[ant_pos]]) {
				// turning left
				if (direction === 'u') {
					goLeft();
				} else if (direction === 'r') {
					goUp();
				} else if (direction === 'd') {
					goRight();
				} else if (direction === 'l') {
					goDown();
				}
			} else {
				// turning right
				if (direction === 'u') {
					goRight()
				} else if (direction === 'r') {
					goDown();
				} else if (direction === 'd') {
					goLeft()
				} else if (direction === 'l') {
					goUp();
				}
			}
			break;
		}
	}
}

function goRight() {
	direction = 'r';
	ant_pos--;
	if (ant_pos < 0 || ant_pos%grid_size === grid_size-1) {
		ant_pos += grid_size;
	}
}

function goLeft() {
	direction = 'l'
	ant_pos++;
	if (ant_pos%grid_size === 0) {
		ant_pos-=grid_size;
	}
}

function goUp() {
	direction = 'u';
	if (ant_pos >= grid_size) {
		ant_pos -= grid_size;
	} else {
		ant_pos += grid.length - grid_size - 1;
	}
}

function goDown() {
	direction = 'd';
	ant_pos += grid_size;
	if (floor(ant_pos/grid_size) >= grid_size) {
		ant_pos = ant_pos%grid_size;
	}
}

function selectorChanged() {
	newRule(rule_map[rule_selector.value()]);
}

function newRule(rule_array) {
	rule = rule_array;

	let indices = [];

	color_map = {
		0:'#666'
	}

	if (rule.length < 12) {
		brewer = colorbrewer.Set3['12'];
		let rand;
		for (let i = 1; i<rule.length; i++) {
			rand = floor(Math.random()*brewer.length)
			while (indices.includes(rand)) {
				rand = floor(Math.random()*brewer.length)	
			}
			indices.push(rand);
		}


		for (let i = 0; i<rule.length; i++) {
			color_map[i+1] = brewer[indices[i]];
		}
	} else {
		brewer = d3.scaleSequential(d3.interpolateSpectral);
		for (let i = 1; i<rule.length; i++) {
			color_map[i] = brewer(i/rule.length);
		}
	}


	const par = document.getElementById('display-rule');
	while (par.firstChild) {
		par.firstChild.remove();
	}

	let span
	for (let r in rule) {
		span = createSpan(rule[r]?'L':'R');
		span.style('color',color_map[r])
		span.parent('display-rule')
	}

	color_map['ant'] = '#fff';

	for (let i = 0; i<grid.length; i++) {
		grid[i] = 0;
	}

	ant_pos = (grid.length + grid_size)/2;

	direction = 'u';
}

function parseRule() {
	let rl = rule_input.value().toUpperCase();
	rl = rl.replace(/[^LR]/g,'');
	if (rl.length > 1) {
		let bool_rule = [];
		for (let i in rl) {
			bool_rule.push(rl[i]=='L');
		}
		if (!Object.keys(rule_map).includes(rl)) {
			rule_map[rl]=bool_rule
			rule_selector.option(rl);
		}
		console.log(bool_rule);
		newRule(bool_rule);
	}
}


var n
var theta
var t
var edge_length
var init
var seed
var k
function setup() {
	var cv = createCanvas(800,500)
	cv.parent('curve')
	n = 50
	theta = []
	t = []
	edge_length = 5
	init = {x:width/2, y:height/2}
	seed = 0
	k = 10
	reset_angles()
	rebuild()
	stroke(0)
}

function draw() {
	background(255)
	for (var i = 0; i<theta.length-1; i++) {
		// console.log(t[i])
		line(t[i].x, t[i].y, t[i+1].x, t[i+1].y)
	}
	if (frameCount > 100) {
		update()
	}
}

function update() {
	for (var i = 0; i<theta.length; i++) {
		// if (theta[i] < 0.0000000001) {
		// 	theta[i] = 0
		// } else {
			theta[i]*=0.99
		// }
	}
	rebuild()
}

function rebuild() {
	var sum = theta[0]
	t[0] = {
		x : init.x + cos(theta[0])*edge_length,
		y : init.y + sin(theta[0])*edge_length
	}
	for (var i = 1; i<n; i++) {
		sum += theta[i]
		t[i] = {
			x: t[i-1].x + cos(sum)*edge_length,
			y: t[i-1].y + sin(sum)*edge_length
		}
	}
}

function reset_angles() {
	noiseSeed(seed)
	var t,total
	for (var i = 0; i<n-1; i++) {
		t = (2*noise(i/100)-1)
		theta[i] = t*TWO_PI - PI
		total += theta[i]
	}
	theta[n-1] = TWO_PI - total
	rebuild()
	seed++
}

function mouseReleased() {
	reset_angles()
}
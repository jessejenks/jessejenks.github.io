// based on http://superfractalthing.co.nf/sft_maths.pdf
// but not working yet
var Z
var center
var N
var scale

var w
var theta
var rad

var A
var B
var C

function preload() {
	N = 800

	Z = []

	scale = 0.00001
	theta = PI*0.9
	rad = 1.015
	center = {
		x: rad*(Math.cos(theta)/2 - Math.cos(2*theta)/4),//-0.1002,//-0.088,//-1.54369,//-0.77568377,//0.34,//-1.29636,
		y: -rad*(Math.sin(theta)/2 - Math.sin(2*theta)/4)//-0.8383//0.654//0//-0.13646737//-0.51//0.44185
	}

	Z[0] = center

	for (var i = 1; i<N; i++) {
		Z[i] = add_c(square(Z[i-1]), center)
	}

	A = []
	B = []
	C = []

	A[0] = {
		x: 1,
		y: 0
	}

	B[0] = {
		x: 0,
		y: 0
	}

	C[0] = {
		x: 0,
		y: 0
	}
	for (var k = 1; k<N; k++) {

		A[k] = add_r(		multiply_r(		multiply_c(Z[k-1], A[k-1])	, 2), 	1)
		B[k] = add_c(		multiply_r(		multiply_c(Z[k-1], B[k-1])	, 2), 	square(A[k-1])	)
		C[k] = multiply_r(	add_c(			multiply_c(Z[k-1], C[k-1])	, multiply_c(A[k-1],B[k-1])	)  , 2)
	}

	w = 300
}

function setup() {
	var cv = createCanvas(3*w,w)
	cv.parent('perturbation')

	colorMode(HSB)
}

function draw() {
	var delt
	for (var i = 0; i<width*height; i++) {
		if (i%width < width/3) {
			delt = {
				x: 2.0*scale*((i%width)/w)-scale,
				y: 2.0*scale*(floor(i/width)/w)-scale
			}
			set(i%width, floor(i/width), color(170*iterate({x:delt.x+center.x,y:delt.y+center.y}, N)/N, 255, 255))//color(170*perturbation_method(Z, delt, N)/N, 255, 255))
			
		} else if (i%width < 2*width/3) {
			delt = {
				x: 2.0*scale*((i%width - width/3)/w)-scale,
				y: 2.0*scale*(floor(i/width)/w)-scale
			}
			set(i%width, floor(i/width), color(170*perturbation(Z, delt, N)/N, 255, 255))
		} else {
			delt = {
				x: 2.0*scale*((i%width - 2*width/3)/w)-scale,
				y: 2.0*scale*(floor(i/width)/w)-scale
			}
			set(i%width, floor(i/width), color(170*abs(perturbation(Z, delt, N) - iterate({x:delt.x+center.x,y:delt.y+center.y}, N))/N, 255, 255))//color(170*iterate({x:delt.x+center.x,y:delt.y+center.y}, N)/N, 255, 255))
		}
	}

	updatePixels()

	noLoop()
}

function iterate(c, n) {
	var z = c
	for (var k = 1; k<n; k++) {
		z = add_c(square(z), c)
		if (magnitude_square(z) > 4) {
			return k
		}
	}

	return n
}

function perturbation (X, delta, n) {
	var Delta = []
	Delta[0] = delta

	for (var k = 1; k<n; k++) {
		Delta[k] = add_c(add_c(multiply_r(multiply_c(X[k-1],Delta[k-1]), 2), square(Delta[k-1])), delta)

		if (magnitude_square(add_c(X[k],Delta[k])) > 4) {
			return k
		}
	}

	return n
}

function perturbation_method(X, delta, n) {
	var Delta = delta

	var delta_sqrd = square(delta)
	var delta_cubed = cube(delta)
	var delta_quad = square(delta_sqrd)

	for (var k = n/2; k<n; k++) {

		Delta = add_c(add_c(   add_c(multiply_c(A[k],delta),   multiply_c(B[k],delta_sqrd)),   multiply_c(C[k], delta_cubed)), delta_quad)

		if (magnitude_square(add_c(X[k],Delta)) > 4) {
			return k
		}
	}

	return n
}

function multiply_c(z, w) {
	if (z.x === w.x && z.y === w.y) {
		return square(z)
	}
	return {
		x: z.x*w.x - z.y*w.y,
		y: z.x*w.y + z.y*w.x
	}
}

function multiply_r(z, r) {
	return {
		x: r*z.x,
		y: r*z.y
	}
}

function add_c(z, w) {
	return {
		x: z.x+w.x,
		y: z.y+w.y
	}
}

function add_r(z, r) {
	return {
		x: r+z.x,
		y: z.y
	}
}

function square(z) {
	return {
		x: z.x*z.x - z.y*z.y,
		y: 2*z.x*z.y
	}
}

function cube(z) {
	return multiply_c(z, square(z))
}

function magnitude_square (z) {
	return z.x*z.x + z.y*z.y
}
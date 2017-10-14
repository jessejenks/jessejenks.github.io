var center_x, center_y, scale
var count

var max, min
function setup() {
	var cv = createCanvas(300,300)
	cv.parent('mandelbrot')

	center_x = 0//-0.875
	center_y = 0

	scale = 2

	count = 0

	colorMode(HSB)
	max = 0
	min = 10000
}

function draw() {
	var x,y,cx,cy
	var val
	for (var i = 0; i<width*height; i++) {
		x = i%width
		y = floor(i/width)
		cx = scale*(2*x/width - 1) + center_x
		cy = scale*(2*y/height - 1) - center_y

		val = phi({x:cx,y:cy},{x:0,y:1},20)

		set(x, y, arg(val)*255)

		// if (val >= 0){// && val < 255) {
		// if (val > max) {
		// 	max = val
		// } else if (val < min && val != -Infinity) {
		// 	min = val
		// }
			// set(x,y,color((Math.sin(TWO_PI*val/255 - PI/2)+1)*255/2,255,255))
		// }
		// else {
		// 	set(x,y,color(0))
		// }

	}
// console.log(max)
// console.log(min)
	updatePixels()

	noLoop()
}

function G(c, n) {
	var z = {
		x: 0,
		y: 0
	}
	for (var i = 0; i<n; i++) {
		z = add_c(square(z), c)
	}
	return Math.log(modulus(multiply_r(z, pow(2.0,n))))
}

function iterate(z_init, c_val, k) {
	var z = {
		x: z_init.x,
		y: z_init.y
	}

	for (var i = 0; i<k; i++) {
		z = add_c(multiply_c(z,z), c_val)
	}

	return z

}

function phi(z, c, n) {
	return power(iterate(z, c, n), Math.pow(2,-n))
}

function square(z) {
	return {
		x: z.x*z.x - z.y*z.y,
		y: 2*z.x*z.y
	}
}

function add_c(z,w) {
	return {
		x: z.x + w.x,
		y: z.y + w.y
	}
}

function multiply_r(z, r) {
	return {
		x: z.x*r,
		y: z.y*r
	}
}

function multiply_c(z, w) {
	return {
		x: z.x*w.x-z.y*w.y,
		y: z.x*w.y+z.y*w.x
	}
}

function power(z, n) {
	var r_n = pow(sqrt(z.x*z.x+z.y+z.y), -n)
	var theta_n = n*atan2(z.y, z.x)
	return {
		x: cos(theta_n)/r_n,
		y: sin(theta_n)/r_n
	}
}


function arg(z) {
	return atan2(z.y,z.x)
}

function modulus(z) {
	return sqrt(z.x*z.x+z.y*z.y)
}
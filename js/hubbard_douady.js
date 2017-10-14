var limit_radius_squared = 100
// var amp,phi,red,green,blue
var center_x, center_y
var scale
// var w
var two
var one
var isoline // for color
function setup() {
	var cv = createCanvas(400,400)
	cv.parent('mandelbrot')

	center_x = -0.875
	center_y = 0

	scale = 1.5

	one = {
		x: 1,
		y: 0
	}

	two = {
		x: 2,
		y: 0
	}

	// w = min(width, height)

	// k = 256/log(scale)
	
	isoline = 0.5

	colorMode(HSB,255)
}

function draw() {
	var x,y,cx,cy
	var d, dmod
	var max = 0
	var min = 5
	var c
	for (var i = 0; i<width*height; i++) {
		x = i%width
		y = floor(i/width)
		cx = scale*(2*x/width - 1) + center_x
		cy = scale*(2*y/height - 1) - center_y

		d = get_distance({x:cx,y:cy})
		if (d > max) {
			max = d
		} else if (d < min) {
			min = d
		}

		if (d >= 0){
			// dmod = d%isoline
			// if (dmod > isoline/2 && dmod < isoline/2 + 0.001) {
				// set(x,y,color(0))
			// } else {
				// c = cubehelix(wave(sqrt(d),0.1), 1, 1.5, 1)
				// set(x, y, color(170 - 85*sqrt((d%isoline)/isoline), 255, 255))
				// set(x, y, color(c[0],c[1],c[2]))
				// set(x, y, color(0))
			// }
			// set(x,y,cubehelix((sqrt(d)/isoline)%1))
			set(x,y,color(160,80,wave(sqrt(d),isoline)*255))
			// set(x,y,color(wave(sqrt(d),isoline)*255, 100, 255))
		} else {
			set(x, y, color(255))
		}

	}
	console.log(max)
	console.log(min)

	updatePixels()
	noLoop()
}

function get_distance(c) {
	var z = {
		x: 0,
		y: 0
	}
	var dz = {
		x: 1,
		y: 0
	}

	var z_new
	var dz_new

	for (var i = 0; i<1000; i++) {
		z_new = complex_add(complex_multiply(z,z), c)

		dz_new = complex_add(complex_multiply(two,complex_multiply(z,dz)), one)

		z = z_new
		dz = dz_new

		if (modulus_squared(z) > limit_radius_squared) {
			break
		}
	}

	var mod = sqrt(modulus_squared(z))
	return mod * log(mod)/sqrt(modulus_squared(dz))
	
	// return log(mod*mod)*mod/sqrt(modulus_squared(dz))
}

function complex_multiply(z, w) {
	return {
		x: z.x*w.x - z.y*w.y,
		y: z.x*w.y + w.x*z.y
	}
}

function complex_add(z, c) {
	return {
		x: z.x + c.x,
		y: z.y + c.y
	}
}

function modulus_squared(z) {
	return z.x*z.x + z.y*z.y
}

function cubehelix(lambda, s, r, hue) {
	amp = hue*lambda*(1-lambda)/2;
	phi = 2*PI*(s/3 + r*lambda);

	red = lambda + amp*(-0.14861*Math.cos(phi) + 1.78277*Math.sin(phi));
	green = lambda + amp*(-0.29227*Math.cos(phi) -0.90649*Math.sin(phi));
	blue = lambda + amp*(1.97294*Math.cos(phi));
	return [red*255, green*255, blue*255,255];
}

function wave(c, period) {
	// let x = (2.0*c/period)%2 - 1;
	// return x*x * (x-2)*(x-2);
	return 0.5*(Math.sin(TWO_PI*c/period + PI/2)+1)
}
var limit_radius_squared = 1000
// var amp,phi,red,green,blue
var center_x, center_y
var init_scale,scale
// var w
var two
var one

var c

var n

var lg2

function setup() {
	var cv = createCanvas(220,220)
	cv.parent('mandelbrot')

	center_x = 0//-0.875
	center_y = 0

	init_scale = 2//1.125

	c = {
		x: 0.26,//-0.21,//-0.8,
		y: 0//2/3//0.16
	}

	one = {
		x: 1,
		y: 0
	}

	two = {
		x: 2,
		y: 0
	}

	n = 100//2000

	lg2 = Math.log(2)

	// t = 0.0

	// w = min(width, height)

	// k = 256/log(scale)


	// colorMode(HSB)
	// noStroke()
}

function draw() {
	scale = init_scale
	var x,y,zx,zy
	var d
	// , dmod
	// var max = 0
	// var min = 5
	var col
	for (var i = 0; i<width*height; i++) {
		x = i%width
		y = floor(i/width)
		zx = scale*(2*x/width - 1) + center_x
		zy = scale*(2*y/height - 1) - center_y

		d = get_distance({
			x: zx,
			y: zy
		},c)

		// if (d >= 0){
		// 		col = cubehelix(wave(Math.pow(d,1/3),0.25), 1, -2, 1)
		// 		set(x, y, color(col[0],col[1],col[2]))
		// } else {
		// 	set(x, y, color(255))
		// }
		

		// d = arg(iterate({
		// 	x: zx,
		// 	y: zy
		// }, c, n))

		set(x, y, 255*d)

	}
	// console.log(max)
	// console.log(min)

	updatePixels()

	// noStroke()
	// fill(32)
	// text(n,20,20)
	// text(c.x+' + i'+c.y, 20, 20)
	// stroke(0)
	// line(center_x-scale, 0, center_x-scale, height)
	// line(0,-center_y-scale,width,-center_y-scale)

	// n+=100
	// if (n > 5000) {
	noLoop()
	// }
}

function iterate(z_init, c_val, k) {
	var z = {
		x: z_init.x,
		y: z_init.y
	}

	for (var i = 0; i<k; i++) {
		z = complex_add(complex_multiply(z,z), c_val)
	}

	return z

}

function get_distance(z_init, c_val) {

	var z = {
		x: z_init.x,
		y: z_init.y
	}
	var dz = {
		x: 1,
		y: 0
	}

	var z_new
	var dz_new

	var md

	for (var i = 0; i<n; i++) {
		z_new = complex_add(complex_multiply(z,z), c_val)

		dz_new = complex_multiply(two,complex_multiply(z,dz))

		z = z_new
		dz = dz_new

		md = modulus_squared(z)	
		if (md > limit_radius_squared) {
			// break
			return n+1 - Math.log(Math.log(Math.sqrt(md)))/lg2
		}
	}

	return 0

	// var mod = sqrt(modulus_squared(z))
	// return mod * log(mod)/sqrt(modulus_squared(dz))
	
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
	return [red*255, green*255, blue*255];
}

function wave(c, period){//, phase) {
	return 0.5*(Math.sin(TWO_PI*c/period + PI/2)+1)
}


function arg(z) {
	return atan2(z.y,z.x)
}
// function mousePressed() {
// 	n ++
// 	redraw()
// }
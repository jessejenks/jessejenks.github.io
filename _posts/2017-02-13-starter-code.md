---
layout: post
title: "Starter code"
date: 2017-02-13
---
Starter code for advanced version of [python](repl.it)

{% highlight python %}
def mandelbrot(rCenter, iCenter, scale, size):
	rmin = rCenter - float(scale)/2
	rmax = rCenter + float(scale)/2
	imin = iCenter - float(scale)/2
	imax = iCenter + float(scale)/2

	for j in range(size+1):
		out = ''
		for i in range(size+1):
			a, b, t = 0,0,0
			while (a*a + b*b < 4 and t<128):
				// need to alter code here
				tm = a*a - b*b + float(i)/r
				b = 2*a*b + float(j)/r
				a = tm
				t += 1
			out += '  ' if (int(t/4)==32) else chr(int(t/4)+33)+' '
		print out
{% endhighlight %}


Starter code for [processing](https://alpha.editor.p5js.org)

{% highlight javascript %}
//noprotect
var cx = -0.75
var cy = 0
var rng = 2.5
var rmin = cx - rng/2
var rmax = cx + rng/2
var imin = cy - rng/2
var imax = cy + rng/2

function setup() { 
  createCanvas(400, 400);
	colorMode(HSB)
	background(0)
} 

function draw() { 
	for (var i = 0; i<width*height; i++) {
		var x = (i%width)
		var y = floor(i/width)
		var c = color(2*mandelbrot(x/width,y/width), 255, 255)
		set(x, y, c)
	}
	updatePixels()
	noLoop()
}
function mandelbrot(x,y) {
	// Code goes here
	var a = 0
	var b = 0
	var t = 0
	while(a*a + b*b < 4 && t < 128) {
		var temp = a*a - b*b + rmin + (rmax - rmin) * x
		b = 2*a*b + imax + (imin - imax) * y
		a = temp
		t++
	}
	return t
}
{% endhighlight %}
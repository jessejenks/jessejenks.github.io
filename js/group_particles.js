var n
var coprime
var group_rule

var population_size
var population

var buffer

function preload() {
	// create cayley table for multiplicative group mod n
	n = 5
	coprime = []
	group_rule = []
	coprime.push(1)
	for (var k = 2; k<n; k++) {
		if (n/k != floor(n/k)) {
			coprime.push(k);
		}
	}

	console.log(coprime)
	var m
	for (var i = 0; i<coprime.length; i++) {
		group_rule[coprime[i]] = []
		for (var j = 0; j<coprime.length; j++) {
			m = coprime[i]*coprime[j]
			group_rule[coprime[i]][coprime[j]] = m % n
		}
	}
	population_size = 20
	population = []

	buffer = 50
}

function setup() {
	console.log(group_rule)
	var cv = createCanvas(500,500)
	cv.parent('particles')

	for (var i = 0; i<population_size; i++) {
		population[i] = {
			x: buffer + Math.random()*(width - 2*buffer),
			y: buffer + Math.random()*(height - 2*buffer),
			id: coprime[floor(Math.random()*coprime.length)]
		}
	}

	colorMode(HSB, 255)
	noStroke()
}

function draw() {
	background(0)
	for (var i = 0; i<population.length; i++) {
		fill(255*population[i].id/coprime.length, 255, 255)
		ellipse(population[i].x, population[i].y, 10, 10)
	}
}
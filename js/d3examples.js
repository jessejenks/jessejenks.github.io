// https://github.com/curran/screencasts/tree/gh-pages/introToD3

d3.csv("path/to/csv/file.csv", type function, function(myArrayOfObjects) {
	myArrayOfObjects.forEach(function(d) {
		console.log(d.x + d.y)
	});
});

function type(d) {
	d.x = +d.x;
	d.y = +d.y;
	// same as
	// d.x = parseFloat(d.x);
	// d.y = parseFloat(d.y);

	return d;
}

var scale = d3.scale.linear();

scale.domain([0,1]); // Data space
scale.range([0,100]); // Pixel space

console.log(scale(0.5)) // prints 50

// same as

var scale = d3.scale.linear()
	.domain([0,1])
	.range([0,100]);

// getters
console.log(scale.domain()); // prints [0,1]


// needs to be ordered an injective
var scale = d3.scale.ordinal()
	.domain(["A","B","C"])
	.range(["Apple","Banana","Coconut"]);


// also can do this
var scale = d3.scale.ordinal()
	.domain(["A","B","C"])
	.rangePoints([0,100]);

// to avoid weirdnesses i.e. 1/3 = 0.3333...
// wouldn't happen here but you know
var scale = d3.scale.ordinal()
	.domain(["A","B","C"])
	.rangeRoundPoints([0,100]);




<body>
	<script>
		// d3 select is, or acts like a css selector
		// append creates an svg element
		var svg = d3.select("body").append("svg");

		svg.attr("width", 250);
		svg.attr("height", 250);

		var rect = svg.append("rect");

		rect.attr("x", 50);
		rect.attr("y", 50);
		rect.attr("width", 20);
		rect.attr("height", 20);
	</script>
</body>

// same as
<body>
	<script>
		// d3 select is, or acts like a css selector
		// append creates an svg element
		var svg = d3.select("body").append("svg")
			.attr("width", 250)
			.attr("height", 250);

		var rect = svg.append("rect")
			.attr("x", 50)
			.attr("y", 50)
			.attr("width", 20)
			.attr("height", 20);
	</script>
</body>


// D3 Data-binding
var data = [1,2,3,4,5]

var scale = d3.scale.linear()
	.domain([1,5])
	.range([0,200]);

var svg = d3.select("body").append("svg")
			.attr("width", 250)
			.attr("height", 250);


// ok this is very weird, but will only work in the case that there
// are no existing rects, but there is data
svg.selectAll("rect")
	.data(data)
	.enter().append("rect")
		.attr("x", function(d) { return scale(d); }) // scale is the d3.scale.linear()
		// previous line could be replaced with 
		// .attr("x", scale) // not quite sure why
		// oh it actually calls scale on each data element d
		.attr("y", 50)
		.attr("width", 20)
		.attr("height", 20);





// dynamically updatable!
var scale = d3.scale.linear()
	.domain([1,5])
	.range([0,200]);

var svg = d3.select("body").append("svg")
			.attr("width", 250)
			.attr("height", 250);
function render(data, color) {
	var rects = svg.selectAll("rect").data(data);

	rects.enter().append("rect")
		.attr("x", scale)
		.attr("y", 50)
		.attr("width", 20)
		.attr("height", 20)
		.attr("fill", color);
}


// this will produce 3 red rects
// and 2 blue rects
// this is due to the weirdness of .enter()
// this is only invoked when there are more data elements than DOM elements (specifically rect elements)
render([1,2,3], "red");
render([0,0,0,4,5], "blue");






/// how to fix .update() problem
var scale = d3.scale.linear()
	.domain([1,5])
	.range([0,200]);

var svg = d3.select("body").append("svg")
			.attr("width", 250)
			.attr("height", 250);
function render(data, color) {

	// data binding
	var rects = svg.selectAll("rect").data(data);

	// enter
	rects.enter().append("rect")
		.attr("y", 50)
		.attr("width", 20)
		.attr("height", 20)
		// this is ok because these properties are static with respect to the arguments to render

	// update
	rects
		.attr("x", scale)
		.attr("fill", color);

	// exit
	rects.exit().remove();
}

// now we will get 5 blue boxes
render([1,2,3], "red");
render([0,1.5,2.5,4,5], "blue");
// in other words the second time render is called, it overwrites the previous one


// example 70
var outerWidth = 500;
var outerHeight = 250;
var margin = {left: -50, top: 0, right: -50, bottom: 0};

var xColumn = "longitude"
var yColumn = "latitude"

var innerWidth = outerWidth - margin.left - margin.right;
var innerHeight = outerHeight - margin.top - margin.bottom;

var svg = d3.selectAll("body").append("svg")
	.attr("width", outerWidth)
	.attr("height", outerHeight);

var g = svg.append("g")
	.attr("transform", "translate("+margin.left+","+margin.top+")");

var xScale = d3.scale.linear().range([0, innerWidth]);
var yScale = d3.scale.linear().range([outerWidth, 0]);

function render(data) {
	console.log("anything happened")
	console.log(data)
	xScale.domain(d3.extent(data, function(d) { return d[xColumn]; }));
	yScale.domain(d3.extent(data, function(d) { return d[yColumn]; }));

	var circles = g.selectAll("circle").data(data);

	circles.enter().append("circle");

	circles
		.attr("cx", function(d) { return xScale(d[xColumn]);})
		.attr("cy", function(d) { return yScale(d[yColumn]);});

	circles.exit().remove();
}

function type(d) {
	return {
		latitude: +d.latitude,
		longitude: +d.longitude
	}
}

d3.csv("../../../../data/fast_food_locations/mcdonalds.csv", type, render);



// nested calls are possible, but I want n datasets,
// each to occur alongside eachother
// 
// 
// this requires a plugin so fk that
// possible solution to multiple csv files
// d3.queue()
// 		.defer(d3.csv, "file1,csv")
// 		.defer(d3.csv, "file2,csv")
// 		.await(function(error, file1, file2) {
// 			if (error) {
// 				console.error("file parse error");
// 			} else {
// 				
// 			}
// 		});

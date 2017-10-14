var svg = d3.select("svg"),
	width = +svg.attr("width"),
	height = +svg.attr("height");

var projection = d3.geoAlbers()
	.translate([width / 2, height / 2])
	.scale(1280);

var radius = d3.scaleSqrt()
	.domain([0, 1])
	.range([0, 10]);

var path = d3.geoPath()
	.projection(projection)
	.pointRadius(2.5);

var us_map = svg.append("g");
var data_holder = svg.append("g");
// var data_2013 = svg.append("g")
// var data_2014 = svg.append("g")
var voronoi = d3.voronoi()
	.extent([[-1, -1], [width + 1, height + 1]]);

// d3.queue()
// 	.defer(d3.json, "https://gist.githubusercontent.com/phil-pedruco/7745589/raw/485b49bfe967f992632a13f0aebbf52afdf715dd/us.json")
// 	.defer(d3.csv, "../../../../data/location_data_2013.csv", typeLocation)
// 	// .defer(d3.csv, "../../../../data/location_data_2014.csv", typeLocation)
// 	.await(draw);

d3.json("https://gist.githubusercontent.com/phil-pedruco/7745589/raw/485b49bfe967f992632a13f0aebbf52afdf715dd/us.json", function(error, us) {
	if (error) throw error;
	us_map.append("path")
		.datum(topojson.feature(us, us.objects.land))
		.attr("class", "land")
		.attr("d", path);

	us_map.append("path")
		.datum(topojson.mesh(us, us.objects.states, function(a, b) { return a !== b; }))
		.attr("class", "state-borders")
		.attr("d", path);
});

// d3.csv("../../../../data/location_data_2013.csv", typeLocation, function(error, plcs) {
// 	if (error) throw error;
// 	add_to_map(plcs);
// })

update("2013")
update("2013")
function addMap(us) {
	us_map.append("path")
		.datum(topojson.feature(us, us.objects.land))
		.attr("class", "land")
		.attr("d", path);

	us_map.append("path")
		.datum(topojson.mesh(us, us.objects.states, function(a, b) { return a !== b; }))
		.attr("class", "state-borders")
		.attr("d", path);
}
function add_to_map(locations) {
	// could have used d3.max, but you know two birds
	// console.log(locations[0]);

	var max_wounded = 0;
	var max_killed = 0;

	locations.forEach(function(c) {
		if (c.killed > max_killed) max_killed = c.killed;
		if (c.wounded > max_wounded) max_wounded = c.wounded;
	});

	var groups = data_holder.selectAll(".location")
		.data(locations);

	var shootings = groups.enter()
		.append("g")
		.attr("class", "location");

	shootings.append("circle");
	// shootings.append("text");
	// shootings.append("path");


	groups.select("circle")
		.attr("cx", function(d){return projection(d)[0]})
		.attr("cy", function(d){return projection(d)[1]})
		.attr("r", function(d) {return 2+radius(d.wounded/max_wounded);})
		.attr("stroke", "none")
		.attr("fill", function(d) {return d3.interpolateBuPu(d.killed/max_killed);})
		.attr("fill-opacity", "0.9");

	// var voro = shootings.append("path")
	// groups.select("path")
	// 	.attr("class", "location-cell")
	// 	.data(voronoi.polygons(locations.map(projection)))
	// 	.attr("d", function(d) { return d ? "M" + d.join("L") + "Z" : null; });


	// var circle = shootings.append("circle");

	// var label = shootings.append("text")
	// var label = 
	// 
	
	// groups.select("text")
	// 	.attr("x", function(d){return projection(d)[0] + 10;})
	// 	.attr("y", function(d){return projection(d)[1];})

	// // label
	// .append("tspan")
	// 	// .attr("x", function(d){return projection(d)[0] + 10;})
	// 	.text(function(d){return d.date;})
	// 	label
	// .append("tspan")
	// 	.attr("dy","1.2em")
	// 	// .attr("x", function(d){return projection(d)[0] + 10;})
	// 	.text(function(d){return d.killed+" killed";})

	// // label
	// .append("tspan")
	// 	.attr("dy","1.2em")
	// 	// .attr("x",function(d){return projection(d)[0] + 10;})
	// 	.text(function(d){return d.wounded+" wounded";});

		// .attr("fill", "none")
		// .attr("stroke", "#000")
  // 		.attr("stroke-opacity","0.1");

 //  	console.log(data_holder);
 //  	console.log(shootings);
 //  	console.log(voro);

	// shootings.exit().remove();
	// voro.exit().remove();
	groups.exit().remove();
}

function typeLocation(d) {
	// some shootings occured in the same city
	// so adding a bit of randomness allows the voronoi diagram
	// the possibility to give each location a cell
	d[0] = +d.lng+Math.random()*0.01;
	d[1] = +d.lat+Math.random()*0.01;
	d.killed = +d.killed;
	d.wounded = +d.wounded;
	// d.arcs = {type: "MultiLineString", coordinates: []};
	return d;
}


d3.selectAll('.selector')
	.on('click', function(d) {
		update(this.id);
	});

function update(year) {
	d3.csv("../../../../data/location_data_"+year+".csv", typeLocation, function(error, stuff) {
		if (error) throw error;
		add_to_map(stuff);
	})

	// d3.selectAll('text').attr('fill','none');
	// d3.selectAll('.location-'+year+' text').attr('fill','#000');
	// d3.selectAll('circle').transition().attr('fill-opacity', 0).duration(1000);
	// d3.selectAll('.location-'+year+' circle').transition().attr('fill-opacity', "0.9").duration(1000);

	// 	d3.selectAll('.location-'+year+' text').style({'display':'none'});
	// d3.selectAll('.location-'+year+':hover text').style({'display':'inline'});
	// d3.selectAll('.location-'+year+':hover circle').style({'stroke':'#000'});
}
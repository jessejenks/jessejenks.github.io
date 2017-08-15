<html>
	<head>
		<meta charset="utf-8">
		<script src="http://d3js.org/d3.v3.min.js"></script>
		<script src="../../../../js/d3.layout.cloud.js"></script>
		<title>Frequency</title>
		<style>
			.bar rect {
				fill: #0000ff;
			}
			.bar text {
				fill: #fff;
				font: 10px sans-serif;
			}
		</style>
	</head>
	<body>
		<script type="text/javascript">
		// https://stackoverflow.com/questions/26881137/create-dynamic-word-cloud-using-d3-js
			var svg_width = 960,
				svg_height = 600;
			var margin = { top: 50, right: 50, bottom: 50, left: 50};
			var chart_width = svg_width - margin.left - margin.right,
				chart_height = svg_height - margin.top - margin.bottom;

			var words = {};

			var color_scale = d3.scale.category20();

			d3.json("../../../../data/slack_data/slack.json", function(error, data) {
				if (error) throw error;
				var w;
				var avoid;
				data.messages.forEach(function(m) {
					if (m.type === "message" && m.text) {
						var list = m.text.split(" ");
						for (var i = 0; i<list.length; i++) {
							w = list[i].toLowerCase();
							if (w === "i") w = "I";
							avoid = w.substring(0,3)
							if (avoid[0] !== "<" && avoid !== "```") {
								words[w] = words.hasOwnProperty(w) ? words[w] + 1: 1;
							}
						}
					}
				});

				var word_data = []

				for (let k of Object.keys(words)) {
					word_data.push({
						text: k,
						size: words[k]
					});
				}

				d3.layout.cloud()
					.size([chart_width,chart_height])
					.rotate(0)//function() { return ~~(Math.random() * 2) * 90; })
					.words(word_data)
					.padding(4)
					.fontSize(function(d) {return d.size*3; })
					.on("end", draw)
					.start();


				function draw (data) {
					d3.select("body").append("svg")
						.attr("width", svg_width)
						.attr("height", svg_height)
						.append("g")
						.attr("transform", "translate("+(svg_width/2)+","+(svg_height/2)+")")
						.selectAll("text")
						.data(data)
						.enter().append("text")
						.style("font-size", function(d) {return d.size+"px";})
						.style("fill", function(d,i){ return color_scale(i);})
						.attr("text-anchor", "middle")
						.attr("transform", function(d) {return "translate("+[d.x,d.y]+")rotate("+d.rotate+")";})
						.text(function(d) {return d.text;});
				}
			});
		</script>
	</body>
</html>
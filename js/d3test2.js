var width = 960,
    height = 500;

var color = d3.scale.category20();

var force = d3.layout.force()
    .charge(-120)
    .linkDistance(30)
    .size([width, height]);

var canvas = d3.select("body").append("canvas")
    .attr("width", width)
    .attr("height", height)
    .node();

var ctx = canvas.getContext("2d");

d3.json("../../../../js/json/miserables.json", function(error, graph) {
  force
      .nodes(graph.nodes)
      .links(graph.links)
      .start();

  force.on("tick", function() {
    ctx.clearRect(0,0,canvas.width,canvas.height);

    ctx.strokeStyle = "rgba(150,150,150,0.6)";
    ctx.lineWidth = 1;
    ctx.beginPath();
    graph.links.forEach(function(d) {
      ctx.moveTo(d.source.x,d.source.y);
      ctx.lineTo(d.target.x,d.target.y);
    });
    ctx.stroke();

    ctx.strokeStyle = "#fff";
    ctx.lineWidth = 1.5;
    graph.nodes.forEach(function(d) {
      ctx.fillStyle = color(d.group);
      ctx.beginPath();
      ctx.arc(d.x,d.y,5,0,2*Math.PI);
      ctx.fill();
      ctx.stroke();
    });
  });
});

var ratio = window.devicePixelRatio || 1,
    width = 960 * ratio,
    height = 500 * ratio,
    ε = 3 * ratio,
    format = d3.format(".1f"),
    nodes;

// d3.select("#epsilon").on("input", function() {
//   d3.select("#epsilon-value").text(format(this.value));
//   ε = this.value * ratio;
//   reset(nodes[0]);
// });

var canvas = d3.select("canvas")
    .attr("width", width)
    .attr("height", height)
    .style("width", width / ratio + "px")
    .style("height", height / ratio + "px")
    .on("click", function() {
      var mouse = d3.mouse(this);
      mouse[0] *= ratio, mouse[1] *= ratio;
      reset(mouse);
    });

var context = canvas.node().getContext("2d");
// context.fillStyle = "#000";
context.fillRect(0, 0, width, height);
context.lineWidth = ratio;
context.lineCap = "round";
reset([width / 2, height / 2]);

d3.timer(function() {
  redraw();
  var start = Date.now();
  context.beginPath();
  // context.lineWidth = (2 - .1 * Math.log(nodes.length)) * ratio;
  context.lineWidth = 2 * ratio;
  do {
    var random = [Math.random() * width, Math.random() * height],
        nearest = nodes[0],
        nearestDistance = distance(random, nearest);
    for (var i = 1, n = nodes.length; i < n; ++i) {
      var d = distance(nodes[i], random);
      if (d < nearestDistance) nearest = nodes[i], nearestDistance = d;
    }
    if (nearestDistance < ε * ε) continue;
    var node = step(nearest, random);
    nodes.push(node);
    context.moveTo(nearest[0], nearest[1]);
    context.lineTo(node[0], node[1]);
  } while (Date.now() - start < 2);
  context.strokeStyle = strokeStyle();
  context.stroke();

});

function step(a, b) {
  var θ = Math.atan2(b[1] - a[1], b[0] - a[0]);
  return [a[0] + ε * Math.cos(θ), a[1] + ε * Math.sin(θ)];
}

function distance(a, b) {
  var dx = a[0] - b[0],
      dy = a[1] - b[1];
  return dx * dx + dy * dy;
}

function strokeStyle() { return d3.hcl(Date.now() % 360, 27, 83) + ""; }

function reset(node) {
  // context.globalAlpha = .8;
  context.fillRect(0, 0, width, height);
  // context.globalAlpha = 1;
  // context.strokeStyle = strokeStyle();
  nodes = [node];
}

// var sampler = poissonDiscSampler(width, height, 30),
//     nodes = [],
//     sample;
//
// while (sample = sampler()) nodes.push(sample);

var voronoi = d3.voronoi()
    .extent([[-1, -1], [width + 1, height + 1]]);

// redraw();
//
// // function moved() {
// //   nodes[0] = d3.mouse(this);
// //   redraw();
// // }
//
function redraw() {
  var diagram = voronoi(nodes),
      // links = diagram.links(),
      polygons = diagram.polygons();

  context.clearRect(0, 0, width, height);
  // context.beginPath();
  // drawCell(polygons[0]);
  // context.fillStyle = "#f00";
  // context.fill();

  context.beginPath();
  context.lineWidth = 0.5 * ratio;
  for (var i = 0, n = polygons.length; i < n; ++i) drawCell(polygons[i]);
  context.strokeStyle = "#000";
  context.stroke();

  // context.beginPath();
  // for (var i = 0, n = links.length; i < n; ++i) drawLink(links[i]);
  // context.strokeStyle = "rgba(0,0,0,0.2)";
  // context.stroke();
  //
  // context.beginPath();
  // drawSite(nodes[0]);
  // context.fillStyle = "#fff";
  // context.fill();
  //
  // context.beginPath();
  // for (var i = 1, n = nodes.length; i < n; ++i) drawSite(nodes[i]);
  // context.fillStyle = "#000";
  // context.fill();
  // context.strokeStyle = "#fff";
  // context.stroke();
}

// function drawSite(site) {
//   context.moveTo(site[0] + 2.5, site[1]);
//   context.arc(site[0], site[1], 2.5, 0, 2 * Math.PI, false);
// }

// function drawLink(link) {
//   context.moveTo(link.source[0], link.source[1]);
//   context.lineTo(link.target[0], link.target[1]);
// }

function drawCell(cell) {
  if (!cell) return false;
  context.moveTo(cell[0][0], cell[0][1]);
  for (var j = 1, m = cell.length; j < m; ++j) {
    context.lineTo(cell[j][0], cell[j][1]);
  }
  context.closePath();
  return true;
}

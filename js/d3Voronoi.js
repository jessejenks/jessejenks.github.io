var canvas = d3.select("canvas")//.node(),
    .on("touchmove mousemove", moved).node(),
    context = canvas.getContext("2d"),
    width = canvas.width,
    height = canvas.height;

var sampler = poissonDiscSampler(width, height, 30),
    sites = [],
    sample;

while (sample = sampler()) sites.push(sample);

var voronoi = d3.voronoi()
    .extent([[-1, -1], [width + 1, height + 1]]);

redraw();

function moved() {
  sites[0] = d3.mouse(this);
  redraw();
}

function redraw() {
  var diagram = voronoi(sites),
      links = diagram.links(),
      polygons = diagram.polygons();

  context.clearRect(0, 0, width, height);
  context.beginPath();
  drawCell(polygons[0]);
  context.fillStyle = "#f00";
  context.fill();

  context.beginPath();
  for (var i = 0, n = polygons.length; i < n; ++i) drawCell(polygons[i]);
  context.strokeStyle = "#000";
  context.stroke();

  context.beginPath();
  for (var i = 0, n = links.length; i < n; ++i) drawLink(links[i]);
  context.strokeStyle = "rgba(0,0,0,0.2)";
  context.stroke();

  context.beginPath();
  drawSite(sites[0]);
  context.fillStyle = "#fff";
  context.fill();

  context.beginPath();
  for (var i = 1, n = sites.length; i < n; ++i) drawSite(sites[i]);
  context.fillStyle = "#000";
  context.fill();
  context.strokeStyle = "#fff";
  context.stroke();
}

function drawSite(site) {
  context.moveTo(site[0] + 2.5, site[1]);
  context.arc(site[0], site[1], 2.5, 0, 2 * Math.PI, false);
}

function drawLink(link) {
  context.moveTo(link.source[0], link.source[1]);
  context.lineTo(link.target[0], link.target[1]);
}

function drawCell(cell) {
  if (!cell) return false;
  context.moveTo(cell[0][0], cell[0][1]);
  for (var j = 1, m = cell.length; j < m; ++j) {
    context.lineTo(cell[j][0], cell[j][1]);
  }
  context.closePath();
  return true;
}

  // Based on https://www.jasondavies.com/poisson-disc/
function poissonDiscSampler(width, height, radius) {
  var k = 30, // maximum number of samples before rejection
      radius2 = radius * radius,
      R = 3 * radius2,
      cellSize = radius * Math.SQRT1_2,
      gridWidth = Math.ceil(width / cellSize),
      gridHeight = Math.ceil(height / cellSize),
      grid = new Array(gridWidth * gridHeight),
      queue = [],
      queueSize = 0,
      sampleSize = 0;

  return function() {
    if (!sampleSize) return sample(Math.random() * width, Math.random() * height);

    // Pick a random existing sample and remove it from the queue.
    while (queueSize) {
      var i = Math.random() * queueSize | 0,
          s = queue[i];

      // Make a new candidate between [radius, 2 * radius] from the existing sample.
      for (var j = 0; j < k; ++j) {
        var a = 2 * Math.PI * Math.random(),
            r = Math.sqrt(Math.random() * R + radius2),
            x = s[0] + r * Math.cos(a),
            y = s[1] + r * Math.sin(a);

        // Reject candidates that are outside the allowed extent,
        // or closer than 2 * radius to any existing sample.
        if (0 <= x && x < width && 0 <= y && y < height && far(x, y)) return sample(x, y);
      }

      queue[i] = queue[--queueSize];
      queue.length = queueSize;
    }
  };

  function far(x, y) {
    var i = x / cellSize | 0,
        j = y / cellSize | 0,
        i0 = Math.max(i - 2, 0),
        j0 = Math.max(j - 2, 0),
        i1 = Math.min(i + 3, gridWidth),
        j1 = Math.min(j + 3, gridHeight);

    for (j = j0; j < j1; ++j) {
      var o = j * gridWidth;
      for (i = i0; i < i1; ++i) {
        if (s = grid[o + i]) {
          var s,
              dx = s[0] - x,
              dy = s[1] - y;
          if (dx * dx + dy * dy < radius2) return false;
        }
      }
    }

    return true;
  }

  function sample(x, y) {
    var s = [x, y];
    queue.push(s);
    grid[gridWidth * (y / cellSize | 0) + (x / cellSize | 0)] = s;
    ++sampleSize;
    ++queueSize;
    return s;
  }
}

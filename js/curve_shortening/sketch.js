var n = 211;
var points = []
var dt = []
var ddt = []
var kappa = []
var ds = []
var min_radius = 50
var max_radius = 200

var max_kappa = 0
var t = 0.01
var seed = 2;

function setup() {
  createCanvas(500, 500)
    // noiseSeed(1)
  create_curve();
  colorMode(HSB, 255)
  background(255);
}

function draw() {
  background(255);

  update();

  var theta;
  var c, s;
  var i_p, i_m;

  var dx, dy;
  // var dr;

  // var out = ''
  for (var i = 0; i < points.length; i++) {
    i_m = (i === 0) ? points.length - 1 : i - 1;
    i_p = (i === points.length - 1) ? 0 : i + 1;
    dx = points[i_p].x - points[i_m].x;
    dy = points[i_p].y - points[i_m].y;
    theta = atan2(dy, dx) + PI / 2;
    // stroke(0, 120);
    stroke(170 + 85 * kappa[i] / max_kappa, 255, 255);
    line(points[i_m].x, points[i_m].y, points[i].x, points[i].y);
    c = cos(theta) * kappa[i] / max_kappa;
    s = sin(theta) * kappa[i] / max_kappa;
    stroke(0)
    line(points[i].x, points[i].y, points[i].x + 5 * c, points[i].y + 5 * s);

    // noStroke();

    // fill(255*kappa[i]/max_kappa);
    // fill(85 + 85 * kappa[i] / max_kappa, 255, 255);
    // fill(255-255*kappa[i] / max_kappa,255,255)
    // ellipse(points[i].x, points[i].y, 3, 3);

    // if (i >5 && i <15) {
    // console.log(i + '    ' + kappa[i] + '    ' + theta + '    ' + dx + '    ' + dy)
    // console.log(kappa[i]/max_kappa)
    // out+=(i+'\t'+(kappa[i]/max_kappa)+'\n')
    // }


    points[i].x += c;
    points[i].y += s;
    // console.log(ds[i])
    // dr = dx * dx + dy * dy;
    // if (dr > 4 * 25) {
    //   dr = sqrt(dr);
    //   points[i].x = points[i_m].x + 5 * dx / dr;
    //   points[i].y = points[i_m].y + 5 * dy / dr;
    // } else 
    if (points.length > 4 && ds[i] < 25) {
      points.splice(i--, 1)
    }

  }
  // console.log(out)
  if (points.length == 4) {
    create_curve();
  }
  // noLoop();
}

function funct(x) {
  return 0.5 + 0.5 * sin(PI * x * 10 - 3 * PI / 2);
  // return 0.5 + 6.0 * sqrt(3) * x * (x - 0.5) * (x - 1.0);
  // return 1.0 - 4 * (x - 0.5)*(x - 0.5);
}

function update() {
  var i_p, i_m, i_pp;
  var i
  for (i = 0; i < points.length; i++) {
    i_m = (i === 0) ? points.length - 1 : i - 1;
    i_p = (i === points.length - 1) ? 0 : i + 1;
    i_pp = (i === points.length - 2) ? 0 : i_p + 1;
    dt[i].x = (points[i_p].x - points[i_m].x) / ds[i];
    dt[i].y = (points[i_p].y - points[i_m].y) / ds[i];

    ddt[i].x = (points[i_p].x - 2 * points[i].x + points[i_m].x) / ds[i] * ds[i];
    ddt[i].y = (points[i_p].y - 2 * points[i].y + points[i_m].y) / ds[i] * ds[i];
  }
  max_kappa = 0
  for (i = 0; i < points.length; i++) {
    kappa[i] = (dt[i].x * ddt[i].y - dt[i].y * ddt[i].x) / pow(sqrt(dt[i].x * dt[i].x + dt[i].y * dt[i].y), 3.0);
    if (kappa[i] > max_kappa) {
      max_kappa = kappa[i];
    }
  }
}

function create_curve() {
  noiseSeed(++seed)
  var r, theta;
  var i;
  for (i = 0; i < n; i++) {
    points[i] = {
      x: 0,
      y: 0
    }
    dt[i] = {
      x: 0,
      y: 0
    }
    ddt[i] = {
      x: 0,
      y: 0
    }
    r =
      // min_radius + funct(i / n) * (max_radius - min_radius);
      min_radius + noise(4 * funct(i / n)) * (max_radius - min_radius);

    theta = TWO_PI * i / n;
    points[i].x = width / 2 + cos(theta) * r;
    points[i].y = height / 2 + sin(theta) * r;
  }
  var dx, dy
  for (i = 0; i < points.length - 1; i++) {
    dx = points[i + 1].x - points[i].x
    dy = points[i + 1].y - points[i].y
    ds[i] = sqrt(dx * dx + dy * dy)
  }
  dx = points[0].x - points[points.length - 1].x
  dy = points[0].y - points[points.length - 1].y
  ds[points.length - 1] = sqrt(dx * dx + dy * dy)

  // TODO make edge mandelbrot set with reverse iteration
  background(255);
}

function mouseReleased() {
  create_curve();
}
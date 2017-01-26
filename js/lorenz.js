var x, y, z;
var dx, dy, dz;
var rho, sigma, beta;
var dt
var scale
var t
var index
var maxIndex
var values
var buffer
function setup() {
  buffer = 50
  var cv = createCanvas(400,400+buffer)
  cv.parent('lorenz')
  rho = 28
  sigma = 10
  beta = 8/3

  dt = 0.01
  t = 0

  x = 1
  y = 1
  z = 0

  index = 0
  maxIndex = 1000

  values = []
  values[index] = {x:x, y:y, z:z}

  // background(0)
  strokeWeight(2)
  colorMode(HSB)
}

function draw() {
  scale = 5
  background(0)
  for (var i = 0; i<index; i++) {
    // stroke(i, 255, 255);
    stroke(i%512,255,255)
    point(
      width/2 + scale*cos(t)*values[i].x + scale*sin(t)*values[i].z,
      height/2 - buffer/2 - scale*values[i].y
    )
    stroke(0,255,255)
    point(width*i/index, height - buffer/2 - values[i].x)
    stroke(170,255,255)
    point(width*i/index, height - buffer/2 - values[i].y)
    stroke(255,255,255)
    point(width*i/index, height - buffer/2 - values[i].z)
  }
  if (index < maxIndex) update()
  t+=dt
  if (t > TWO_PI) t-=TWO_PI
}
function update() {
  dx = sigma*(y-x)
  dy = x*(rho - z) - y
  dz = x*y - beta*z

  x += dx*dt
  y += dy*dt
  z += dz*dt

  index++
  values[index] = {x:x, y:y, z:z}

  // console.log(x+', '+y+', '+z)
}

function mousePressed() {
  index = 0
  x = Math.random()*2 - 1
  y = Math.random()*2 - 1
  z = Math.random()*2 - 1
  values = []
  values[index] = {x:x, y:y, z:z}
}

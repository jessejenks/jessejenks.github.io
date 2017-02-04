var numValues, maxValue;
var values;
function setup() {
  var cv = createCanvas(400,400);
  cv.parent('randomness')

  numValues = 100;

  values = [];
  for (var i = 0; i<numValues; i++) values[i] = 0;
  maxValue = 1;
  stroke(0);

}

function draw() {
  background(255);
  for (var i = 0; i<values.length; i++) {
    var val = height - 3*height*values[i]/(4*maxValue)
    var x = width*(i+1)/(values.length+1)
    strokeWeight(1)
    line(x, height, x, val)
    strokeWeight(4)
    point(x, val)
  }
  update();
}
function update() {
  var rand = Math.floor(Math.random()*numValues)
  values[rand]++;
  if (values[rand] > maxValue) maxValue = values[rand]
}

var maxPoints = 200;
var maxSamples = 30;
var minDistance = 0;
// float[][] points = new float[maxPoints][2];
var points = [];
var buffer = 10;
var yRes = 5;
var xRes = 5;
var noiseArray = [];
var noiseScale = 0;//1500;
var tour = [];
var counter = 0
function setup() {
  var cv = createCanvas(400, 400);
  cv.parent('mitchell')

  noiseScale = 5*sqrt(width*width + height*height)

  // points[0][0] = buffer + random(width-2*buffer);
  // points[0][1] = buffer + random(height-2*buffer);
  points[0] = {
  	x: 300,//buffer + random(width-2*buffer),
  	y: 210//buffer + random(height-2*buffer)
  };
  // tour[0] = points[0]


  noiseDetail(2, 0.1)
  noiseSeed(2)
  for (var i = 0; i<width*height; i++) {
  	var x = i%width;
  	var y = floor(i/width);
  	if (x === 0) {
  		noiseArray[y] = [];
  	}
  	noiseArray[y][x] = noise(x/70, y/70)
  }

  bestCandidate();
  ellipseMode(RADIUS);
}
function draw() {
  background(255);

  for (var i = 0; i<width*height; i++) {
  	var x = i%width;
  	var y = floor(i/width);
  	set(x, y, 255*noiseArray[y][x])
  }
  updatePixels()
  noFill();
  //fill(255);
  //noStroke();
  stroke(0,0,255)
  ellipse(points[0].x, points[0].y,2,2);
  stroke(255,0,0);
  //int counter = 0;
  //stroke(255);
  //strokeWeight(3);
  ///*
  // console.log(points)
  // if (! bestCandidate(num)) {
  // 	noLoop();
  // }
  for (var i = 1; i<points.length; i++) {
    
    //ellipse(points[i][0], points[i][1], 2, 2);
    if (points[i].x == -2) counter++;
    else ellipse(points[i].x, points[i].y,2,2);
  }//*/
  //parabola();
  console.log("number of points on screen: "+(maxPoints - counter)+" out of "+maxPoints);
  noLoop();
  // num++;
}

function bestCandidate(min) {
  for (var i = 1; i<maxPoints; i++) {
    var bestX=-2, bestY=-2, bestDistance = 0;
    for (var j = 0; j<maxSamples; j++) {
      var x = buffer + random(width-2*buffer);
      var y = buffer + random(height-2*buffer);
      var distance = getShortestDistance(i, x, y);

      // if (x>buffer && x<width-buffer && y>buffer && y<height-buffer && distance > minDistance && distance > bestDistance) {
      if (x>buffer && x<width-buffer && y>buffer && y<height-buffer && distance < noiseScale*noiseArray[floor(y)][floor(x)] && distance > bestDistance) {
        bestX = x;
        bestY = y;
        bestDistance = distance;
        // console.log(noiseScale*noiseArray[floor(y)][floor(x)])
      }
    }// end of j loop
    points[i] = {
    	x:bestX,
    	y:bestY
    }
  }// end of i loop
}

function getShortestDistance(currentIndex, x, y) {
  var shortest = Infinity //Float.MAX_VALUE;
  for (var i = 0; i<currentIndex; i++) {
    var quadrance = (x-points[i].x)*(x-points[i].x) + (y-points[i].y)*(y-points[i].y);
    if (quadrance < shortest) shortest = quadrance;
  }
  return shortest;
}

// function parabola() {
//   strokeWeight(2);
//   for (var ly = 0; ly< height+2*buffer; ly+=yRes) {

//     for (var lx = 0; lx< width; lx+=xRes) {
//       float max = 0;
//       for (int i = 0; i<points.length; i++) {
//         float temp = 0;
//         if (ly > points[i][1]) temp = (2.0*points[i][0]*lx - points[i][0]*points[i][0] - lx*lx)/(2.0*ly - 2.0*points[i][1]) + ((float)ly+points[i][1])/2.0;
//         if (temp > max) {
//           max = temp;
//          //stroke(map(i, 0, boidPos.length, 0, 170), 255, 255);
//          stroke(255);
//         }
//       }
//       if ( max > 0) point( lx, max);
//     }
//   }
// }
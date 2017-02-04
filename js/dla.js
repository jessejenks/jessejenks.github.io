var grid;
var launch;
var done;
function setup() {
  var cv = createCanvas(200,200);
  cv.parent('dla');
  done = false;
  grid = [];

  // for (var i = 0; i<width; i++) {
  //   grid[i] = [];
  //   for (var j = 0; j<height; j++) {
  //     grid[i][j] = false;
  //   }
  // }

  for (var i = 0; i<width*height; i++) grid[i] = false;

  for (var i = 3*width/8; i<5*width/8; i++) {
    grid[3*height*height/8 + i] = true;
    grid[height*i + 3*width/8] = true;
    grid[height*i + 5*width/8] = true;
    grid[5*height*height/8 + i] = true;
  }
  // update();
  background(255);
  stroke(128);
}

function draw() {
  // background(255);
  // stroke(0);
  // for (var i = 0; i<grid.length; i++) {
  //   for (var j = 0; j<grid[0].length; j++) {
  //     if (grid[i][j]) point(i,j)
  //   }
  // }
  for (var i = 0; i<width*height; i++) {
    // var c = (grid[i])? color(0): color(255);
    // set(i%width, floor(i/width), c);
    if (grid[i]) set(i%width, floor(i/width), 0);
  }
  updatePixels();
  update();
  if (done) noLoop();
}

function update() {
  // stroke(128)
  // while (!done) {
    var x = floor(width*Math.random());
    var y = floor(height*Math.random());
    while (x < width-10 && x > 10 && y < height-10 && y > 10) {
      point(x,y);
      var r = Math.random();
      if (r < 0.25) x--;
      else if (r < 0.5) x++;
      else if (r < 0.75) y++;
      else y--;

      // if (grid[x-1][y] || grid[x+1][y] || grid[x][y-1] || grid[x][y+1] ||
      //   grid[x-1][y-1] || grid[x-1][y+1] || grid[x+1][y-1] || grid[x+1][y+1]) {
      if (grid[height*y - height + x - 1] || grid[height*y - height + x] || grid[height*y - height + x+1] || grid[height*y + x-1] || grid[height*y + x+1]
         || grid[height*y + height + x-1] || grid[height*y + height + x] || grid[height*y + height + x+1]) {
          if (Math.random()>0.5) grid[height*y + x] = true;

          if (y > height-20) done = true;
          break
        }
    }
  // }
}
//
// function restart(mx, my) {
//   for (var i = 0; i<width; i++) {
//     grid[i] = [];
//     for (var j = 0; j<height; j++) {
//       grid[i][j] = false;
//     }
//   }
//   grid[mx][my] = true;
//   update();
// }

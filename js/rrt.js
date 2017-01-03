var V,E;
var q_init;
var current_num, max_num;
var max_dist;
var dq = 8;
function setup() {
  var cv = createCanvas(600,400);
  cv.parent('rrt');

  var q_init = {
    x: width/2,
    y: height/2,
    index: 0
  };

  V = [q_init];
  E = [
    {
      dist: 0,
      adj_vert: undefined
    }
  ];

  max_num = 600;
  current_num = 1;

  max_dist = 0;

  colorMode(HSB);
  noFill();

};

function draw() {
  background(255);
  for (var i = 1; i<V.length; i++) {
    // edges
    strokeWeight(4 - 2*E[i].dist/max_dist);
    stroke(255*E[i].dist/max_dist,255,255);
    line(V[i].x, V[i].y, E[i].adj_vert.x, E[i].adj_vert.y);
    // vertices
    // strokeWeight(5);
    // stroke(0);
    // point(V[i].x, V[i].y);
  }
  // origin
  strokeWeight(2);
  stroke(0,255,255);
  ellipse(V[0].x, V[0].y, 10, 10);

  if (current_num<max_num) {
    build_rrt();
  } else {
    // console.log('done: '+V.length);
    if (mouseX >= 0 && mouseX <= width && mouseY >= 0 && mouseY <= height) {
      var current = nearest_vertex({x:mouseX, y:mouseY})[0];
      // noStroke();
      // fill(0)
      // text('path length: '+E[current.index].dist,mouseX+10,mouseY+10);
      stroke(0);
      strokeWeight(4);
      // while we haven't hit the origin
      while(E[current.index].adj_vert) {
        line(current.x, current.y, E[current.index].adj_vert.x, E[current.index].adj_vert.y);
        current = E[current.index].adj_vert;
      }
    }
  }
};

function build_rrt() {
  var q_rand = {
    x: random(width),
    y: random(height),
    index: -1
  };
  var q_near = nearest_vertex(q_rand)[0];

  var new_dist = E[q_near.index].dist+1;
  if (new_dist > max_dist) max_dist = new_dist;

  var q_new = new_conf(q_near, q_rand);

  // make sure it didn't get too close to another vertex
  if (nearest_vertex(q_new)[1] >= dq*dq) {
    V.push(q_new);
    E.push({
      dist: new_dist,
      adj_vert: q_near
    });
    current_num++;
  }
};

// TODO: Someday I'll implement a quadtree or voronoi thing
// and this won't be so darn slow
function nearest_vertex(q) {
  var d = Infinity;
  var p;
  for (var i = 0; i<V.length; i++) {
    var temp_d = distance(V[i],q);
    if (temp_d<d) {
      p = V[i];
      d = temp_d;
    }
  }
  return [p, d];
};

function new_conf(q_n, q_r) {
  var theta = atan2(q_r.y-q_n.y, q_r.x-q_n.x);
  return {
    x: q_n.x + cos(theta)*dq,
    y: q_n.y + sin(theta)*dq,
    index: V.length
  }
};

function distance(p,q) {
  return (p.x-q.x)*(p.x-q.x) + (p.y-q.y)*(p.y-q.y);
};

function mousePressed() {
  if (mouseY < height+50) {
    V = [{
      x: mouseX,
      y: mouseY,
      index: 0
    }];

    E = [
      {
        dist: 0,
        adj_vert: undefined
      }
    ];
    current_num = 1;
    max_dist = 0;
  }
}

function keyTyped() {
  if (key === 'g') {
    V = [{
      x: random(width),
      y: random(height),
      index: 0
    }];
    E = [
      {
        dist: 0,
        adj_vert: undefined
      }
    ];
    current_num = 1;
    max_dist = 0;

    while(current_num<max_num) build_rrt();
  }
}

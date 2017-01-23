// based on https://hal.archives-ouvertes.fr/file/index/docid/246697/filename/ajp-jp1v2p2221.pdf
// 'use strict'
// maximum number of cars
var max_N = 400;
// number of cars to increase by on each simulation
var interval_N = 10;

var cars;
// number of cars, initially
var N = interval_N;
// length of circular track
var L = 1000;
// actual density of cars (constant for circular track by conservation of cars)
var ro = N/L;
// initial percentage of self-driving cars
var percent_selfDriving = 0.1;

// probabilities for human and self-driving cars of slowing down
var p_human = 0.1;
var p_selfDriving = 0.01;

// minimum distance to next car for humans and self-driving
var car_gap_human = 2;
var car_gap_selfDriving = 1;

// maximum velocity
var v_max = 5;

// time counter
var time = 0;
// timestep to start collecting data
var t_0 = 100;
// max number of iterations per simulation
var num_iterations = 800; // 21000;
// keep track of which simulation
var current_iteration = 0;

var avg_ro;
var avg_flow;
// var avg_vel;

// array for data
var stats;

function setup() {
  // var cv = createCanvas(L, num_iterations)
  var cv = createCanvas(400,800)
  cv.parent('cars')

  reset_sim();

  // debugging
  // cars[2] = {vel: 4, self_driving: false, id: 0};
  // cars[26] = {vel: 4, self_driving: false, id: 1};
  // cars[65] = {vel: 4, self_driving: false, id: 2}; 
  // cars[70] = {vel: 5, self_driving: false, id: 3};  
  // cars[75] = {vel: 5, self_driving: false, id: 4}; 
  // cars[80] = {vel: 0, self_driving: false, id: 5};
  // cars[81] = {vel: 0, self_driving: false, id: 6};
  // cars[83] = {vel: 1, self_driving: false, id: 7};
  // cars[90] = {vel: 3, self_driving: false, id: 8};
  // cars[99] = {vel: 5, self_driving: false, id: 9};

  textAlign(CENTER, CENTER);
  noFill();
  colorMode(HSB);
  background(255);
  stroke(0);
  strokeWeight(4);
  avg_ro = 0;
  avg_flow = 0;
  // avg_vel = 0;

  stats = new Array(max_N/interval_N)
  // [];
  // for (var i = 0; i<max_N/interval_N; i++) stats[i] = undefined;
  console.log('probabilty (humans): '+p_human+'\tspacing (humans): '+car_gap_human);
  console.log('probabilty (self_d): '+p_selfDriving+'\tspacing (self_d): '+car_gap_selfDriving);
  console.log('number of cars,percent_selfDriving,avg_density,avg_flux,length_of_track,_num_iterations');
}

function draw() {
  time++;

  // for (var i = 0; i<cars.length; i++) {
  //   if (cars[i]) {
  //     stroke(255*cars[i].id/N, 255, 255);
  //   }
  //   else {
  //     stroke(200);
  //   }
  //   point(i, frameCount);
  // }

  if (time < num_iterations+t_0) {
    update();
  } else {
    avg_ro/=num_iterations;
    avg_flow/=num_iterations;
    // avg_vel/=num_iterations;
    // console.log('number of iterations '+num_iterations)
    // console.log('actual density '+ N/L);
    // console.log('average density '+avg_ro);
    // console.log('average flux '+avg_flow);
    // console.log('average velocity '+avg_vel+'\n\n');
    // 
    // format
    // number of cars, percent self-driving, average density for center, average flow, average velocity, length of track, number of iterations
    console.log(N+','+percent_selfDriving.toFixed(2)+','+avg_ro+','+avg_flow+','+L+','+num_iterations);

    stats[current_iteration] = {ro: avg_ro, flow: avg_flow, percent: percent_selfDriving}
    // {ro: avg_ro, flow: avg_flow, vel: avg_vel, percent: percent_selfDriving}
    current_iteration++;

    avg_ro = 0;
    avg_flow = 0;
    // avg_vel = 0;
    time = 0;
    if (percent_selfDriving < 1) {
      if (percent_selfDriving === 0.9) percent_selfDriving = 1;
      else percent_selfDriving+=0.4;
      reset_sim();
    } else {
      percent_selfDriving = 0.1;
      if (N < max_N) {
        N += interval_N;
        reset_sim();
      } else {

        // console.log(stats);

        // plotting
        for (var i = 0; i<stats.length; i++) {
          stroke(stats[i].percent*255, 255, 255);
          point(width*stats[i].ro, height/2 - height*stats[i].flow/2);
          point(width*stats[i].ro, height - height*stats[i].flow/(2*v_max*stats[i].ro));
          // point(width*stats[i].ro, height - height*stats[i].vel/3);
        }
        // stroke(0);
        // line(0,height/2-5,width,height/2-5);
        // line(0,height-5,width,height-5);
        // line(5,0,5,height);
        // line(0,height - height*0.1 ,10, height - height*0.1);
        // line(0,height - height*0.5 ,10, height - height*0.5);
        // line(0,height - height*0.9 ,10, height - height*0.9);
        for (var r = 1; r<10; r++) {
          var x = r*width/10;
          stroke(0);
          noFill();
          // line(x, height/2, x, height/2-10);
          line(x, height, x, height-10);
          // line(0,height - x ,10, height - x);
          noStroke();
          fill(0);
          text(r/10, x, height-15)
        }

        noLoop();
      }// else
    }// else
  }
}

function update() {
  // debugging
  // var out = 'a\t';
  
  // var num_cars = 0;
  // var num_sd = 0;

  var temp_cars = new Array(cars.length);
  // [];
  // for (var i = 0; i<cars.length; i++) temp_cars[i] = undefined;

  for (var i = 0; i<cars.length; i++) {
    if (cars[i]) {

      //debugging
      // num_cars++;
      // if (cars[i].self_driving)num_sd++;

      // distance to the next car
      var next = undefined;
      for (var j = i+1; j<cars.length; j++) {
        if (cars[j]) {
          next = j-i;
          break;
        }
      }
      if (next === undefined) {
        next = cars.length - i;
        for (var j = 0; j<i; j++) {
          if (cars[j]) {
            next += j;
            break;
          }
        }
      }
      // found distance next car
      

      // debugging
      // out+='id:'+cars[i].id+', v: '+cars[i].vel+' d:'+next+'\t';
      // out+='id:'+cars[i].id+',d:'+next+' ';

      temp_cars[i] = {vel:cars[i].vel, self_driving: cars[i].self_driving, id: cars[i].id}

      // acceleration
      // if (cars[i].vel < v_max && next > cars[i].vel+1) {
      // adding space
      if ( (!cars[i].self_driving && cars[i].vel + car_gap_human - 1 < v_max && next > cars[i].vel + car_gap_human) ||
              (cars[i].self_driving && cars[i].vel + car_gap_selfDriving - 1 < v_max && next > cars[i].vel + car_gap_selfDriving)) {
        temp_cars[i].vel++
      }

      // slowing down
      if (next <= cars[i].vel) {
        // decelerate to be at most within allowable gap
        // temp_cars[i].vel = next - 1;
        
        if (cars[i].self_driving) temp_cars[i].vel = next - car_gap_selfDriving;
        else temp_cars[i].vel = next - car_gap_human;

        if (temp_cars[i].vel < 0) temp_cars[i].vel = 0;
        
        // if (temp_cars[i].vel < 0) console.log('NEGATIVE DUE TO SLOW DOWN')
      }

      // randomization
      // if (temp_cars[i].vel > 0 && Math.random() < p) {
      // with self-driving cars
      if (temp_cars[i].vel > 0 && ((!cars[i].self_driving && Math.random() < p_human) || 
              (cars[i].self_driving && Math.random() < p_selfDriving))) {
        // if (temp_cars[i].vel < 0) console.log('NEGATIVE BEFORE RANDOMIZATION')
        temp_cars[i].vel--;
        // if (temp_cars[i].vel < 0) console.log('NEGATIVE DUE TO RANDOMIZATION')
      }

      // if (temp_cars[i].vel < 0) console.log("NEGATIVE VELOCITY")
    } // end updates to velocity
  } // end first loop;


  // debugging
  // console.log(out);
  // console.log('number of cars: '+num_cars+' number of self-driving: '+num_sd);
  
  for (var i = 0; i<cars.length; i++) cars[i] = undefined;
  // debugging
  // console.log(num_cars)
  // num_cars = 0;
  // out = 'b\t';
  

  // update positions
  for (var i = 0; i<cars.length; i++) {
    if (temp_cars[i]) {
      var new_pos = i + temp_cars[i].vel;

      // collect data
      if (time > t_0 && i <= L/2 && new_pos > L/2) {
        // avg_vel+= (temp_cars[i].vel/v_max);
        if (temp_cars[i].vel>0) avg_flow++;
      }
      // debugging
      // num_cars++;
      // out+='id:'+temp_cars[i].id+' i:'+i+'->'+new_pos+' ';
      var new_index = (new_pos < cars.length)? new_pos: new_pos-cars.length;
      cars[new_index] = {vel: temp_cars[i].vel, self_driving: temp_cars[i].self_driving, id: temp_cars[i].id}
    }
  }
  // collect data
  if (time > t_0 && cars[L/2]) {
    avg_ro++;
  }
  // debugging
  // console.log(out)
  // console.log(num_cars)
}

function reset_sim() {
  // console.log('Number of cars: '+N+', % self-driving: '+percent_selfDriving);
  // cars = [];
  // for (var i = 0; i<L; i++) cars[i] = undefined;
  cars = new Array(L);
  // number of self-driving cars
  var num_selfDriving = Math.floor(N*percent_selfDriving);
  var counter = num_selfDriving;

  for (var j = 0; j<N; j++) {
    var index = Math.floor(Math.random()*L);
    while (cars[index]) {
      index = Math.floor(Math.random()*L);
    }
    cars[index] = {vel: 0, self_driving: counter>0, id: j}
    if (counter>0)counter--;
  }
}

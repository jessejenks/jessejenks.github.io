// NASA rover API
// var date = "2017-1-3"
// var camera = "fhaz" // "mahli" // "mardi" // "mast"
// var rover = "spirit" // "curiosity"
// var url = "https://api.nasa.gov/mars-photos/api/v1/rovers/"+rover+"/photos?earth_date="+date+"&camera="+camera+"&api_key=U7wVI06LUEPpaLdjvScYUjp0EcYlFF9bBiQ5wWBs";
// $.ajax({
//   url: url,
//   success: function(data) {
//     for (var i = 0; i<data.photos.length; i++) {
//       pic = new Image(600);
//       pic.src=data.photos[i].img_src
//       $('#where_images_go_to_die').append(pic)
//       $('#where_images_go_to_die').append(document.createElement("BR"))
//       console.log(data.photos[i])
//     }
//   }
// });
var url, cityCounter;
function setup() {
  url = "http://nflarrest.com/api/v1/crime/arrests/Domestic%20violence"
  cityCounter = {}
  var data = loadJSON(url, things)
  var cv = createCanvas(800,400)
  cv.parent('data')
  // colorMode(HSB, 100)
  // fill(0)
  background(255)
}

function draw() {
  // background(255)
  // fill(127,255,255)
  // arc(width/2, height/2, 300, 300, 0, 0+TWO_PI*0.25);
  // for (var i = 0; i<cityCounter.length; i++) {
  //   for (var j = 0; j<cityCounter[i].players.length; j++){
  //     console.log(cityCounter[i].players[j])//, width*i/(cityCounter.length-1), height/4 + 3*height*j/(4*cityCounter[i].players.length))
  //   }
  // }
  // noLoop();
}

function things(info) {
  for (var i = 0; i<info.length; i++) {
    // if (info[i].Name !== null) {
    //   text(info[i].Name, width*i/(info.length-1), height/2+i)
    // }
    if (cityCounter[info[i].Team_city]) {
      cityCounter[info[i].Team_city].city++;
      if (cityCounter[info[i].Team_city].players[info[i].Name]) {
        cityCounter[info[i].Team_city].players[info[i].Name]++;
      } else {
        cityCounter[info[i].Team_city].players[info[i].Name]=1
      }
    } else {
      cityCounter[info[i].Team_city] = {city: 1, players: {}};
    }
  } // end for

  doThingsWithTheData(cityCounter);
  // for (var i = 0; i<cityCounter.length; i++) {
  //   console.log(cityCounter[i])
  //   text(cityCounter[i].city, width*i/(cityCounter.length-1), height/2);
  //   // for (var j = 0; j<cityCounter[i].players.length; j++) {

  //   //   // text(cityCounter[i].players[j], width*i/(cityCounter.length-1), height*j/(cityCounter[i].players.length-1))
  //   // }
  // }
}

function doThingsWithTheData(data) {
  var theta = 0;
  var count = 0;
  for (var i in data) {count+=data[i].city}
  var colorCount = 0;
var otherCounter = 0;
  var angles = [];
  for (var city in data) {
    var phi = data[city].city/(count);
    otherCounter += data[city].city
    fill(cubehelix(otherCounter/count, 1, -0.5, 1))
    angles[cityCounter] = theta;
    arc(width/2, height/2, 300, 300, theta, theta+TWO_PI*phi);
    theta += TWO_PI*phi;
    colorCount++;
  }
  // for (var i = 0; i<colorCount - 1; i++) {
  //   var dx = (mouseX - width/2);
  //   var dy = (mouseY - height/2);
  //   var t = Math.atan2(dy/dx);
  //   if (t > angles[i] && t < angles[i+1] && dx*dx+dy*dy < 150*150) {
  //     line(width/2 + Math.cos(angles[i]), height/2 + Math.sin(angles[i]), width/2 + Math.cos(angles[i]) + 50, height/2 + Math.sin(angles[i]))
  //   }
  // }
}

function cubehelix(lambda, s, r, hue) {
  if (lambda >= 1) return color(255);

  var amp = hue*lambda*(1-lambda)/2;
  var phi = 2*PI*(s/3 + r*lambda);

  var red = lambda + amp*(-0.14861*cos(phi) + 1.78277*sin(phi));
  var green = lambda + amp*(-0.29227*cos(phi) -0.90649*sin(phi));
  var blue = lambda + amp*(1.97294*cos(phi));
  return color(red*255, green*255, blue*255);
}

// request
// $.ajax({
//   url: url,
//   success: function(data) {
//     for (var i = 0; i<data.length; i++) {
//       if (cityCounter[data[i].Team_city]) {
//         cityCounter[data[i].Team_city].city++;
//         if (cityCounter[data[i].Team_city].players[data[i].Name]) {
//           cityCounter[data[i].Team_city].players[data[i].Name]++;
//         } else {
//           cityCounter[data[i].Team_city].players[data[i].Name]=1
//         }
//       } else {
//         cityCounter[data[i].Team_city] = {city: 1, players: {}};
//       }
//     } // end for
//   },
//   complete: function(data) {
//     for (var i = 0; i<cityCounter.length; i++) {
//       for (var j = 0; j<cityCounter[i].players.length; j++){
//         text(cityCounter[i].players[j], width*i/(cityCounter.length-1), height/4 + 3*height*j/(4*cityCounter[i].players.length))
//       }
//     }
//   }
// });



// var projection = d3.geoAlbers()
// var scaling = []
// var center = []
// var testCoords = [37.4023212,-121.9711841]
// var transformed = projection(testCoords)
// // D3 map
// var context = d3.selectAll("canvas").node().getContext("2d"),
//     path = d3.geoPath()
//     .context(context);

// d3.json("https://d3js.org/us-10m.v1.json", function(error, us) {
//   if (error) throw error;
//   console.log(us)

//   scaling[0] = us.transform.scale[0]
//   scaling[1] = us.transform.scale[1]
//   center[0] = us.transform.translate[0]
//   center[1] = us.transform.translate[1]

//   console.log(transformed[0]*scaling[0] - center[0])
//   console.log(center[1] + transformed[1]*scaling[1])

//   context.beginPath();
//   path(topojson.mesh(us, us.objects.states));
//   context.stroke();
//   context.closePath();

//   context.fillStyle = "red";
//   context.beginPath()
//   context.arc(transformed[0]*scaling[0] - center[0], transformed[1]*scaling[1] + center[1], 20, 0, 2*Math.PI, true)
//   context.fill()
//   context.closePath()
// });

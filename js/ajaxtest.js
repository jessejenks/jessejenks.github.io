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


var url = "http://nflarrest.com/api/v1/crime/arrests/Domestic%20violence"
var cityCounter = {};
// request
$.ajax({
  url: url,
  success: function(data) {
    for (var i = 0; i<data.length; i++) {
      if (cityCounter[data[i].Team_city]) {
        cityCounter[data[i].Team_city].city++;
        if (cityCounter[data[i].Team_city].players[data[i].Name]) {
          cityCounter[data[i].Team_city].players[data[i].Name]++;
        } else {
          cityCounter[data[i].Team_city].players[data[i].Name]=1
        }
      } else {
        cityCounter[data[i].Team_city] = {city: 1, players: {}};
      }
    }
  }
});


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

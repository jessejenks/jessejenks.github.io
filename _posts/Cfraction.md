---
title: "Cfraction test"
date: 2017-03-19
---
<script src="../../../../js/libraries/p5.js" type="text/javascript"></script>
<script src="../../../../js/libraries/p5.dom.js" type="text/javascript"></script>
<script src="../../../../js/cfraction.js"></script>
<div id="direct"></div>
<div id="gosper"></div>
<!-- <div id="gosper2"></div> -->
<!-- <br><br><br><br> -->
<script>
	// var x = 
	// Cfraction.E(10)
	// new Cfraction([3,6,6,6,6],[1,9,25,49,81]) 
	// new Cfraction([1,3,5,7,9,11,13,15,17,19,21,23,25,27])
	
	// var y = 
	// Cfraction.PI(15)
	// new Cfraction.E(10)
	// new Cfraction([3,6,6,6,6],[1,9,25,49,81]) 
	// new Cfraction([2,2,4,2,4,2,4,2,4,2,4,2,4,2])

	var pi_plus_e = Cfraction.from_decimal
	// (3.14159)
	// (3.1415926)
	// (3.141592653)
	// (3.1415926536)
	// (3.1415926535897932384)
	(3.1415926535897932384626433832795)

	// (8.31398)
	// (1.047197551196597746154214461093167) // pi/3

	// (5.43656365691809047072057494)
	//(6.2831853071795864769)//(3.7625250285)
	// (1.3670846275)
	// (1.3670846274789391148575731197327152)
	// (5.859874482) // e + pi
	//(8.5397342227)
	// (0.3078789494) // 1,2,3...,8
	


	document.getElementById("direct").innerText = 
	pi_plus_e.toString()
	// '$$\\pi\\approx'+y.toTex()+'\\approx'+y.decimal(50)+'$$\naccurate to within '+y.error(20)
	// pi_plus_e.toString()
	
	// document.getElementById("gosper").innerText = 
	// y.mult_rational(1,3).toString()
	// '$$e\\approx'+x.toTex()+'\\approx'+x.decimal(50)+'$$\naccurate to within '+x.error(20)
	// x.add(y).toString()
	// x.general_4d(1,2,3,4,5,6,7,8,y).toString()
	// x.general_4d(0,1,1,0,0,0,0,2,y).toString()
	// y.general_4d(0,1,1,0,0,0,0,1,x).toString()
	//pi.add(e).toString()
	// x.general_4d(2,1,0,0,1,0,1,0,y).toString()
	// y.general_4d(2,0,1,0,1,1,0,0,x).toString()
	// '$$\\pi\\approx'+pi.decimal(100)+'$$'
	//'$$\\tan\\left(\\frac{1}{2}\\right) = '+e.general_2d(1,-1,1,1).toTex()+'$$'
	// document.getElementById("gosper2").innerText = 
	// y.add(x).toString()
	
	// testEverything(4,6,7,1,5,4,2,0,x,y)


	function testEverything(a,b,c,d,e,f,g,h,ths,that) {
		var this_index = 0
		var that_index = 0
		var output = []
		if (!(e===0 || f===0 || g===0 || h===0) && Math.floor(a/e)===Math.floor(b/f)&&Math.floor(b/f)===Math.floor(c/g)&& Math.floor(c/g)===Math.floor(d/h)) {
      console.log('output');
      console.log(
        '\n'+
        b+'   '+d+'\n'+
        ' '+f+'   '+h+'\n'+
        a+'   '+c+'\n'+
        ' '+e+'   '+g
      );
      var q = Math.floor(a/e);
      output.push(q);
      console.log(output);

      console.log(
        '\n'+
        f+'   '+h+'\n'+
        ' '+(b-q*f)+'   '+(d-q*h)+'\n'+
        e+'   '+g+'\n'+
        ' '+(a-q*e)+'   '+(c-q*g)
      );
    } 
    else {
	    if (Math.abs(b/f-a/e)<=Math.abs(c/g-a/e)) {
	    	console.log('this condition thing happebed')
	    } else {
	    	console.log('this condition thing did NOT happebed')
	    }
	      // console.log('this');
	      console.log(
	        'a/e = '+Math.floor(a/e)+'\n'+
	        'b/f = '+Math.floor(b/f)+'\n'+
	        'c/g = '+Math.floor(c/g)+'\n'+
	        'd/h = '+Math.floor(d/h)
	      );
	      console.log('input from x');
	      console.log(
	        '\n'+
	        b+'   '+d+'\n'+
	        ' '+f+'   '+h+'\n'+
	        a+'   '+c+'\n'+
	        ' '+e+'   '+g
	      );
	      // input from this
	      var this_a = ths.a[this_index];
	      // var init_a = a
	      // var init_b = b
	      // a = a*this_a+c
	      // b = b*this_a+d
	      // c = init_a
	      // d = init_b
	      // var init_e = e
	      // var init_f = f
	      // e = e*this_a+g
	      // f = f*this_a+h
	      // g = init_e
	      // h = init_f
	      // this_index++;
	      console.log(
	        '\n'+
	        (b*this_a+d)+'   '+b+'\n'+
	        ' '+(f*this_a+h)+'   '+f+'\n'+
	        (a*this_a+c)+'   '+a+'\n'+
	        ' '+(e*this_a+g)+'   '+e
	      );
	    // } else {
	      // console.log('that');
	      console.log('input from y');
	      // console.log(
	      //   'a/e = '+Math.floor(a/e)+'\n'+
	      //   'b/f = '+Math.floor(b/f)+'\n'+
	      //   'c/g = '+Math.floor(c/g)+'\n'+
	      //   'd/h = '+Math.floor(d/h)
	      // );
	      console.log(
	        '\n'+
	        b+'   '+d+'\n'+
	        ' '+f+'   '+h+'\n'+
	        a+'   '+c+'\n'+
	        ' '+e+'   '+g
	      );
	      // input from that
	      var that_a = that.a[that_index];
	      // var init_a = a
	      // var init_c = c
	      // a = a*that_a+b
	      // c = c*that_a+d
	      // b = init_a
	      // d = init_c
	      // var init_e = e
	      // var init_g = g
	      // e = e*that_a+f
	      // g = g*that_a+h
	      // f = init_e
	      // h = init_g
	      // that_index++;
	      console.log(
	        '\n'+
	        a+'   '+c+'\n'+
	        ' '+e+'   '+g+'\n'+
	        (a*that_a+b)+'   '+(c*that_a+d)+'\n'+
	        ' '+(e*that_a+f)+'   '+(g*that_a+h)
	      );
	    }
	}
</script>
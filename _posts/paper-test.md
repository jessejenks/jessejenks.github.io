---
layout: post
title: "paperjs"
date: 2016-12-17
---
<!-- <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/paper.js/0.10.2/paper-core.js"></script> -->
<!-- <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/paper.js/0.10.2/paper-full.js"></script> -->
<script type="text/javascript" src="../../../../js/libraries/paper-full.js"></script>
{::nomarkdown}
<script type="text/paperscript"canvas="myCanvas">
var squarePath = new Path.Rectangle(new Point(20, 20), new Size(20, 20));
squarePath.fillColor = 'aquamarine';
var squareSymbol = new Symbol(squarePath);

// lets place some squares using symbols, and rotate each instance slightly
for (var i = 0; i < 5; i++) {
  var placedSymbol = squareSymbol.place(new Point(20 + (i * 40), 50));
  placedSymbol.rotate(i * 10); // operation on the instance
}

function onFrame(event) {
 // Add 1 degree to the hue
 // of the symbol definition's fillColor:
 squareSymbol.definition.fillColor.hue += 1;
 // rotate
 squareSymbol.definition.rotate(0.2);
}
</script>
{:/nomarkdown}
<canvas id="myCanvas" style="display: flex;justify-content: center;"></canvas>

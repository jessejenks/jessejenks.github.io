---
layout: post
title: "Turing Patterns"
date: 2016-11-29
---
<!--
<script>
  function toggleSketch(id) {
    console.log(document.getElementById(id).style.visibility)
    if (document.getElementById(id).style.visibility == 'hidden') {
      document.getElementById(id).style.visibility = 'visible';
    } else {
      document.getElementById(id).style.visibility = 'hidden'
    }
  }
</script> -->

<script>
  function setSrc(id, source) {
    document.getElementById(id).src = source;
  }
</script>
The year before his death, Alan Turing wrote a very interesting paper called *The Chemical Basis of Morphogenesis*. This paper laid out a mathematical model for pattern formation that was independent of initial conditions! While the mathematics involved is quite complex (using something called "Hopf fibration"), it is relatively easy to simulate these results. Currently all of the following simulations use Euler integration, but eventually I want to implement Runge-Kutta type integration.

Two "chemicals", a and b are interacting in a "Reaction-Diffusion" system. Diffusion is often present in a PDE which uses the Laplacian operator. Physically, diffusion is simply the "spread" of something, like a gas. If you poke a hole in a helium balloon for example, eventually the helium will spread evenly throughout the room. But if the helium reacts with another has in the room, and the reaction depends on the concentration of helium or the other gas, we have a reaction-diffusion system.

The initial conditions are generated randomly to demonstrate the fact that it doesn't matter what the starting conditions are. However we actually need some variation in the concentration of chemicals to get any interesting patterns.
## A one-dimensional version.
#### Press 'd' to start the reaction, and 'r' to reset. Press 'a' or 'b' to toggle manipulation of chemical a or b.

<!-- {::nomarkdown}
<iframe width="512px", height="286px, id="turing1d""></iframe>
<input type="button", value="load", onClick="setSrc('turing1d', '../../../../js/turing_1d.html');">
{:/nomarkdown} -->

## A two-dimensional version
#### press 'r' to reset.
Here we start off with a random initial configuration, and yet spotted patterns always apear!

{::nomarkdown}
<iframe width="256px", height="256px", id="turing2d", src='../../../../js/turing_2d.html'></iframe>
<!-- <input type="button", value="load", onClick="setSrc('turing2d', '../../../../js/turing_2d.html');"> -->
{:/nomarkdown}

#### *Turing, A. (1952). The Chemical Basis of Morphogenesis. Philosophical Transactions of the Royal Society of London. Series B, Biological Sciences, 237(641), 37-72. Retrieved from http://www.jstor.org/stable/92463*

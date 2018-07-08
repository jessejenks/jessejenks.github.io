---
layout: default
title: Resume
---
<link href="https://fonts.googleapis.com/css?family=Barlow+Semi+Condensed:100|Montserrat:500|Nunito:200,600" rel="stylesheet">
<style type="text/css">
#name {
	font-size: 72px;
	font-family: 'Barlow Semi Condensed', sans-serif;
	display: flex;
	justify-content:center;
	text-align:center;
}
.normal-text {
	font-size: 20px;
	font-weight: 200;
	font-family: 'Nunito', sans-serif;
	color:#666;
	/*display: inline;*/
}
.normal-text.small {
	font-size: 16px;
	/*text-align: right;*/
	float: right;
}
.bold-text {
	font-size: 20px;
	font-weight: 600;
	font-family: 'Nunito', sans-serif;
	color: #000;
}
.bold-text.indent {
	display: inline-block;
	width: 25%;
}

.bold-text.small-indent {
	display: inline-block;
	width: 15%;
}
.section-header {
	font-size: 22px;
	font-family: 'Montserrat', sans-serif;
	color: #5ba1b2;
}
.empty-indent {
	display: inline-block;
	width: 2%;
}
.ul-styling {
	margin-top: 0px;
}


#name > br{
	display: none;
}

#info-bar {
	display: block;
	list-style-type: none;
	text-align:center;
	padding: 0;
}
#info-bar li {
	display: inline;
	text-align: center;
	margin: 0;
	padding: 0;
}
#phone {
	float: left;
}
#address {
	float: right;
}
#spacer {
	display: block;
}

.mobile-break {
	display: none;
}

.dash {
	margin: 0;
	display: inline;
}

.fa-java {
	font-size: 20px;
	color: #ffa518;
	margin-right: 15px;
}
.fa-python {
	font-size: 20px;
	color: #306998;
	margin-right: 15px;
}
.fa-js-square {
	font-size: 20px;
	color: #f7df1e;
	margin-right: 15px;
}
/*
#lang-java:hover ~ .fa-java {
	display: inline;
}

#lang-python:hover ~ .fa-python {
	display: inline;
	margin-left: 5px;
}

#lang-js:hover ~ .fa-js-square {
	display: inline;
	margin-left: 5px;
}*/
/*#lang-icons {
	display: none;
}
#lang-names {
	display: inline;
}*/

.lang {
	display: inline;
	white-space: nowrap;
}
.lang > img {
	margin-right:8px;
	margin-bottom:-3px;
	height: 20px;
}

#lang-names {
	/*position: absolute;*/
	/*margin-bottom: 2em;*/
	/*margin-left: 25%;*/
}
table {
	display: inline-table;
	width: 70%;
}
tbody {
	display: inline-table;
	vertical-align: baseline;
	width: 100%;
}
table img {
	margin-right:15px;
	margin-bottom:-3px;
	height: 20px;
}
#desktop-table {
	display: inline-table;
}
#mobile-table {
	display: none;
}
@media only screen and (max-width: 850px) {
	#info-bar li {
		display: block;
		margin: 2% 0;
	}
	#phone {
		float: none;
	}
	#address {
		float: none;
	}
	#spacer {
		display: none;
	}

/*	.bold-text, .normal-text {
		font-size: 16px;
	}
	.bold-text.indent {
		width: 15%;
	}*/
}
@media only screen and (max-width: 640px) {
	#name > br{
		display: block;
	}

	.normal-text.small {
		float: left;
	}

	.bold-text.indent {
		width: 100%;
	}
	.mobile-break {
		display: inline;
	}

	.dash {
		display: none;
	}

	.lang {
		display: block;
		margin: 0;
		margin-left: 2%;
	}
	.lang > img {
		height: 30px;
		margin-right: 4%;
	}
	.fa-java {
		font-size: 30px;
		margin-right: 4%;
	}
	.fa-python {
		font-size: 30px;
		margin-right: 4%;
	}
	.fa-js-square {
		font-size: 30px;
		margin-right: 4%;
	}
	table {
		width: 100%;
	}
	table > img {
		height: 30px;
	}
	#desktop-table {
		display: none;
	}
	#mobile-table {
		display: inline-table;
	}
}
</style>

<div id="name">Jesse&nbsp;<br>Endo&nbsp;<br>Jenks</div>
---
<ul id="info-bar" class="normal-text">
<li id="phone">(510) 508-9512</li>
<li id="email">
	<a href="mailto:jesseendojenks@gmail.com?Subject=Saw%20Your%20Resume" target="_top">
		JesseEndoJenks@gmail.com
	</a>
</li>
<!-- <li id="address">4386 Wheelock Student Center<br>Tacoma, WA 98416</li> -->
<li id="address">726 Alcatraz Ave.<br>Oakland, CA 94609</li>
</ul>
<br id="spacer">
<div class="section-header">Education</div>
<div class="normal-text">
	<span class="bold-text">University of Puget Sound</span>
		<br class="mobile-break">
		<span class="normal-text small">Tacoma, WA</span><br>
	<span class="bold-text">B.S. in Mathematics and Computer Science</span>
	<span class="dash">&nbsp;-&nbsp;</span>
		<br class="mobile-break">
			double major
			<br class="mobile-break">
				<span class="normal-text small">May 2018</span><br>
	<span class="bold-text indent">Honors</span>
		<i>magna cum laude</i><br>
	<span class="bold-text indent">Relevant Courses</span>
		<br class="mobile-break">
		<span class="bold-text">University of Puget Sound / Study Abroad in Budapest, Hungary</span><br>
	<ul class="ul-styling" style="list-style-type:none;">
		<li>Algorithms, Artificial Intelligence, Optimization, Software Engineering, Theory of Computing</li>
		<li>Abstract Algebra, Linear Algebra, Real Analysis, Set Theory, Topology, Mathematical Logic</li>
	</ul>
</div>

<br>
<div class="section-header">Skills</div>
<div class="normal-text">
	<span class="bold-text indent">Languages &amp; Libraries</span>
	<!-- <span class="bold-text">Languages and Libraries</span> -->
	<!-- <span style="width:100%;"> -->
		<br class="mobile-break">
		<!-- Two columns for mobile -->
		<table id="mobile-table">
			<tr>
				<td><i class="fab fa-java"></i>Java</td>
				<td><i class="fab fa-python"></i>Python</td>
			</tr>
			<tr>
				<td><i class="fab fa-js-square"></i>Javascript</td>
				<td><img align="bottom" title="processing" alt="Processing" src="/data/logos/processing-logo.png">Processing</td>
			</tr>
			<tr>
				<td><img align="bottom" title="p5js" alt="p5js" src="/data/logos/p5js.png">P5js</td>
				<td><img title="D3js" src="https://d3js.org/logo.svg" alt="D3js">D3js</td>
			</tr>
			<tr>
				<td>\(\LaTeX\)</td>
				<td><img align="bottom" title="flask" alt="Flask" src="/data/logos/flask-logo.png">Flask</td>
			</tr>
			<tr>
				<td><img align="bottom" title="numpy" alt="NumPy" src="/data/logos/numpy-logo.png">NumPy</td>
				<td>Seaborn</td>
			</tr>
			<tr>
				<td><img align="bottom" title="swipl" alt="SWI Prolog" src="/data/logos/swipl-logo.png">Prolog</td>
				<td><img align="bottom" title="haskell" alt="Haskell" src="/data/logos/haskell-logo.png">Haskell</td>
			</tr>
			<tr>
				<td><img align="bottom" title="lua" alt="Lua" src="/data/logos/lua-logo.gif">Lua</td>
				<td></td>
			</tr>
		</table>
		<!-- Three columns for desktop -->
		<table id="desktop-table">
			<tr>
				<td><i class="fab fa-java"></i>Java</td>
				<td><i class="fab fa-python"></i>Python</td>
				<td><i class="fab fa-js-square"></i>Javascript</td>
			</tr>
			<tr>
				<td><img align="bottom" title="processing" alt="Processing" src="/data/logos/processing-logo.png">Processing</td>
				<td><img align="bottom" title="p5js" alt="p5js" src="/data/logos/p5js.png">P5js</td>
				<td><img title="D3js" src="https://d3js.org/logo.svg" alt="D3js">D3js</td>
			</tr>
			<tr>
				<td>\(\LaTeX\)</td>
				<td><img align="bottom" title="flask" alt="Flask" src="/data/logos/flask-logo.png">Flask</td>
				<td><img align="bottom" title="numpy" alt="NumPy" src="/data/logos/numpy-logo.png">NumPy</td>
			</tr>
			<tr>
				<td>Seaborn</td>
				<td><img align="bottom" title="swipl" alt="SWI Prolog" src="/data/logos/swipl-logo.png">Prolog</td>
				<td><img align="bottom" title="haskell" alt="Haskell" src="/data/logos/haskell-logo.png">Haskell</td>
			</tr>
			<tr>
				<td><img align="bottom" title="lua" alt="Lua" src="/data/logos/lua-logo.gif">Lua</td>
				<td></td>
				<td></td>
				<!-- <span class="dash">&nbsp;</span> -->
			</tr>
		</table>
	<!-- </span> -->
<!-- 		<span id="lang-names">
			<span class="lang">
				<i class="fab fa-java"></i>Java<span class="dash">,&nbsp;</span>
			</span>
			<span class="lang">
				<i class="fab fa-python"></i>Python<span class="dash">,&nbsp;</span>
			</span>
			<span class="lang">
				<i class="fab fa-js-square"></i>Javascript<span class="dash">,&nbsp;</span>
			</span>
			<span class="lang">
				<img align="bottom" title="processing" alt="Processing" src="/data/logos/processing-logo.png">Processing<span class="dash">,&nbsp;</span>
			</span>
			<span class="lang">
				<img align="bottom" title="p5js" alt="p5js" src="/data/logos/p5js.png">P5js<span class="dash">,&nbsp;</span>
			</span>
			<span class="lang">
				<img title="D3js" src="https://d3js.org/logo.svg" alt="D3js">D3js<span class="dash">,&nbsp;</span>
			</span>
			<span class="lang">
				\(\LaTeX\)<span class="dash">,&nbsp;</span>
			</span>
			<span class="lang">
				<img align="bottom" title="flask" alt="Flask" src="/data/logos/flask-logo.png">Flask<span class="dash">,&nbsp;</span>
			</span>
			<span class="lang">
				<img align="bottom" title="numpy" alt="NumPy" src="/data/logos/numpy-logo.png">NumPy<span class="dash">,&nbsp;</span>
			</span>
			<span class="lang">
				Seaborn<span class="dash">,&nbsp;</span>
			</span>
			<span class="lang">
				<img align="bottom" title="swipl" alt="SWI Prolog" src="/data/logos/swipl-logo.png">Prolog<span class="dash">,&nbsp;</span>
			</span>
			<span class="lang">
				<img align="bottom" title="haskell" alt="Haskell" src="/data/logos/haskell-logo.png">Haskell<span class="dash">,&nbsp;</span>
			</span>
			<span class="lang">
				<img align="bottom" title="lua" alt="Lua" src="/data/logos/lua-logo.gif">Lua
			</span>
		</span> -->
		<br>
	<span class="bold-text indent">Digital Media</span>
		<br class="mobile-break">
		Adobe After Effects, Photoshop, Lightroom<br>
	<span class="bold-text indent">Foreign Language</span>
		<br class="mobile-break">
		Fluent in Japanese<br>
</div>

<br>
<div class="section-header">Projects</div>

<div class="normal-text">
	<span class="bold-text"><a href="/">This very site!</a></span>
		<br class="mobile-break">
			<span class="normal-text small">Fall 2016 - Present</span><br>
			<ul class="ul-styling">
				<li>Personal website showcasing various interactive Javascript projects</li>
				<li><a href="/blog">Blog</a> section has over 20 interactive pages on topics ranging from fractals, cellular automata, markov chains, neural nets, and many other topics</li>
			</ul>
</div>

<div class="normal-text">
	<span class="bold-text">Neural Net javascript library</span>
		<br class="mobile-break">
			<span class="normal-text small">Fall 2017</span><br>
			<ul class="ul-styling">
				<li>Wrote a neural net library from scratch in javascript to visualize on <a href="../blog/2018/04/10/NeuralNetjs">blog site</a></li>
				<li>Includes different activation and cost functions, as well as backpropagation</li>
			</ul>
</div>

<div class="normal-text">
	<span class="bold-text">COMAP Mathematical Contest in Modeling Finalist</span>
		<br class="mobile-break">
			<span class="normal-text small">Spring 2017</span><br>
			<ul class="ul-styling">
				<li>Finished in top 11 out of 1,527 teams from around the world with 2 other teammates</li>
				<li>Created cellular automaton based model to study influence self-driving cars may have on traffic flow</li>
				<li><a href="https://www.seattletimes.com/education-lab/local-university-team-is-top-scorer-in-math-competition-on-self-driving-cars/">In the news!</a></li>
			</ul>
</div>

<div class="normal-text">
	<span class="bold-text">Raspberry Pi Slackbot</span>
	<br class="mobile-break">
		<span class="normal-text small">Spring 2017</span><br>
	<ul class="ul-styling">
		<li>Created a chatbot trained on text messages, YouTube comments, and Shakespeare</li>
		<li>Loaded onto a Raspberry Pi so that members could chat with it through a Slack channel</li>
	</ul>
</div>

<div class="normal-text">
	<span class="bold-text">Summer Research Paper</span>
	<span class="dash">&nbsp;-&nbsp;</span>
		<br class="mobile-break">
			<a href="https://soundideas.pugetsound.edu/cgi/viewcontent.cgi?article=1481&context=summer_researchs" style="font-size:18px;">What Do We Mean by Logical Consequence?</a>
			<br class="mobile-break">
				<span class="normal-text small">Summer 2016</span><br>
	<ul class="ul-styling">
		<li>Conducted independent research on differing views within a main subfield of mathematical logic</li>
		<li>Wrote a 20 page research paper on John Etchemendy’s criticism of Tarskian model theory</li>
	</ul>
</div>

<br>
<div class="section-header">Experience</div>

<div class="normal-text">
	<span class="bold-text">Makerspace Assistant</span>
	<span class="dash">&nbsp;-&nbsp;</span>
		<br class="mobile-break">
		University of Puget Sound, Tacoma, WA
		<br class="mobile-break">
			<span class="normal-text small">Spring 2018</span><br>
	<span class="empty-indent"></span>
	<span class="bold-text">
		<a href="http://research.pugetsound.edu/makerspace">Collins Library</a>
	</span>
	<ul class="ul-styling">
		<li>Assisting students and faculty in using 3D printers, Arduino boards, Raspberry Pis, a laser cutter, a silhouette cutter, button makers, and other equipment</li>
	</ul>
</div>

<div class="normal-text">
	<span class="bold-text">Teaching Assistant</span>
	<span class="dash">&nbsp;-&nbsp;</span>
		<br class="mobile-break">
		University of Puget Sound, Tacoma, WA
			<br class="mobile-break">
			<span class="normal-text small">
				Spring 2017
			</span><br>
	<span class="empty-indent"></span>
		<span class="bold-text">
			<a href="https://www.pugetsound.edu/academics/departments-and-programs/undergraduate/philosophy/">
				Philosophy Department
			</a>
		</span>
	<ul class="ul-styling">
		<li>Assisted professor in administration for class of 19 students on Formal Logic</li>
		<li>Graded homework assignments and provided weekly tutoring sessions for class</li>
	</ul>
</div>

<div class="normal-text">
	<span class="bold-text">Department Tutor</span>
	<span class="dash">&nbsp;-&nbsp;</span>
		<br class="mobile-break">
		University of Puget Sound, Tacoma, WA
			<br class="mobile-break">
			<span class="normal-text small">
				Spring 2016 - Spring 2017, 2018
			</span><br>
	<span class="empty-indent"></span>
		<span class="bold-text">
			<a href="mathcs.pugetsound.edu">Computer Science Department</a>
		</span>
	<ul class="ul-styling">
		<li>Weekly peer tutor for all class levels</li>
	</ul>
</div>

<div class="normal-text">
	<span class="bold-text">Media Services Staff</span>
	<span class="dash">&nbsp;-&nbsp;</span>
		<br class="mobile-break">
		University of Puget Sound, Tacoma, WA
		<br class="mobile-break">
			<span class="normal-text small">Fall 2014 - Fall 2016</span><br>
	<span class="empty-indent"></span>
	<span class="bold-text">
		<a href="https://www.pugetsound.edu/about/offices-services/technology-services/media-services/">Technology Services</a>
	</span>
	<ul class="ul-styling">
		<li>Performed troubleshooting for staff and faculty on campus</li>
		<li>Handled media requests for classes, events, and presentations</li>
	</ul>
</div>

<br>
<div class="section-header">School Activities</div>

<div class="normal-text">
	<span class="bold-text small-indent">ACM</span>
	<br class="mobile-break">
		<span class="bold-text">President</span>,&nbsp;
		<br class="mobile-break">
			Computer Science club
			<br class="mobile-break">
				<span class="normal-text small">2016 - 2017</span><br>
	<span class="bold-text small-indent">PMU</span>
	<br class="mobile-break">
		Mathematics Honor Society
		<br class="mobile-break">
			<span class="normal-text small">Inducted Spring 2017</span><br>
	<span class="bold-text small-indent">UPE</span>
	<br class="mobile-break">
		Computer Science Honor Society
		<br class="mobile-break">
			<span class="normal-text small">Inducted Spring 2016</span><br>
	<span class="bold-text small-indent">PES</span>
	<br class="mobile-break">
		Honor Society
		<br class="mobile-break">
			<span class="normal-text small">Inducted Spring 2015</span>
</div>


<br>
<div class="section-header">Academic and Other Awards</div>

<div class="normal-text">
	<span class="bold-text">School of Music Scholarship</span>
	<br class="mobile-break">
	<span class="normal-text small">2014 - 2018</span><br>
	<span class="bold-text">Edward Goman Math Scholarship</span><br class="mobile-break"><span class="normal-text small">2016 - 2018</span><br>
	<span class="bold-text">Graduated with Honors from Budapest Semesters in Mathematics</span><br class="mobile-break"><span class="normal-text small">Fall 2017</span><br>
	<span class="bold-text">Collier Interdisciplinary Scholarship</span><br class="mobile-break"><span class="normal-text small">Fall 2016</span><br>
</div>

<br>
<div class="section-header">Other Interests</div>

<div class="normal-text">
	<span class="bold-text indent">Interests, Skills</span> Cello, Philosophy of Math, Recreational Math, Data Visualization
</div>
function setup() {
	var cv = createCanvas(3*windowWidth/4, min(500, windowHeight))
	cv.parent('markov')

	sentence = ''
	display_sentence = sentence
	graph = {}

	r = 100

	order = 1

	ignore = [' ', '.', ',', '?', '!', '\'', '"', ':', ';', '-']

	pad = 10

	max_line_width = 8
	noFill()
	noLoop()
}

function draw() {
	background(255)
	noStroke()
	fill(0)
	cx = width/4
	cy = height/2
	textSize(20)
	textAlign(LEFT, TOP)
	text(display_sentence, 20, 20, width/3, height)

	textSize(10)
	textAlign(CENTER, CENTER)
	r = min(width/2, height)/3
	if (sentence[order]) {

		keys = Object.keys(graph)

		l = keys.length
		for (var i = 0; i<l; i++) {
			theta = PI*2*i/l
			text(keys[i], cx+cos(theta)*r, cy+sin(theta)*r)
		}

		r *= 0.9

		for (var i = 0; i<l; i++) {
			parent_index = keys.indexOf(keys[i])
			theta1 = PI*2*parent_index/keys.length
			x1 = cx+cos(theta1)*r
			y1 = cy+sin(theta1)*r


			rect_width = min(height-pad, width/2-pad)/l

			fill(128)
			text(keys[i], width/2, pad + (parent_index+0.5)*rect_width)
			text(keys[i], pad + width/2+(parent_index+0.5)*rect_width, pad/2)

			children = Object.keys(graph[keys[i]])
			sum = 0
			for (var j = 0; j<children.length; j++) {sum += Number(graph[keys[i]][children[j]])}
			for (var j = 0; j<children.length; j++) {
				child_index = keys.indexOf(children[j])
				theta2 = PI*2*child_index/keys.length

				x2 = cx+cos(theta2)*r
				y2 = cy+sin(theta2)*r

				size = graph[keys[i]][children[j]]

				strokeWeight(max_line_width*size/sum)
				stroke(0, 63)

				line(x1,y1,x2,y2)

				t = atan2(y1-y2, x1-x2)
				line(x2,y2, x2+8*cos(t+PI/8), y2+8*sin(t+PI/8))
				line(x2,y2, x2+8*cos(t-PI/8), y2+8*sin(t-PI/8))

				noStroke()
				fill(0, 63 + (192)*size/sum)

				// matrix
				rect(pad + width/2 + parent_index*rect_width,
					pad + child_index*rect_width, rect_width, rect_width)
			}
		}
	}
}

function keyTyped() {
	display_sentence += ''+key
	if (!ignore.includes(key)) {
		sentence += ''+key.toLowerCase()
		if (sentence.length === order+1) {
			k = ''
			v = ''
			for (var i = 0; i<order; i++) {
				k += sentence[i]
				v += sentence[i+1]
			}
			graph[k] = {}
			graph[k][v] = 1
			graph[v] = {}
		} else if (sentence.length > order+1) {
			l = sentence.length
			k = ''
			// +sentence[l-3]+sentence[l-2]
			v = ''
			// +sentence[l-2]+sentence[l-1]
			for (var i = l-order-1; i<l-1; i++) {
				k += sentence[i]
				v += sentence[i+1]
			}
			if (Object.keys(graph).includes(v)) {
				if (Object.keys(graph[k]).includes(v)) {
					graph[k][v]++
				} else {
					graph[k][v] = 1
				}
			} else {
				graph[k][v] = 1
				// console.log('added new edge from '+k+' to '+v)
				graph[v] = {}
				// console.log('added new node '+v)
			}
		}
	}
	redraw()

	// this does the equicqlent of event.preventDefault
	// essentially cause hitting space to go down the page 
	// is default behavior and this prevents that
	return false
}

function mousePressed() {
	sentence = ''
	display_sentence = ''
	graph = {}
	redraw()
}

function windowResized() {
	resizeCanvas(3*windowWidth/4, min(500, windowHeight))
}
var G;
function setup() {
  var cv = createCanvas(400,400);
  cv.parent('diff_growth');

  G =
};

function draw() {
  background(255);
};

function update() {

};

function LinkedList(head, tail) {
  this.size = 0;
  this.head = head;
  this.tail = tail;
}

LinkedList.prototype.add = function (x_val, y_val, location) {
  if (location < 0 || location >= size) return false;
  if (location === 0 || size === 0) return addToHead(x_val, y_val);
  if (location ===  size-1) return addToTail(x_val, y_val);

  var addNode = {
    x: x_val,
    y: y_val,
    next: undefined,
    prior: undefined
  };
  var current;
  if (size - location > location) {
    current = this.head;
    for (var i = 0; i<location; i++) current = current.next;
  } else {
    current = this.tail;
    for (var i = size-1; i>location; i--) current = current.prior;
  }

  addNode.next = current;
  addNode.prior = current.prior;
  current.prior.next = addNode;
  current.prior = addNode;
  this.size++;
};

LinkedList.prototype.addToHead = function (x_val, y_val) {
  var newHead = {
    x: x_val,
    y: y_val
    next: head,
    prior: undefined
  };

  if (head!=undefined) head.prior = newHead;
};

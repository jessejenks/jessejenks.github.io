// Based on: https://www.youtube.com/watch?v=0a-52ntK3T8
// webworkers aka concurrency / parallelism in js

// generate random population of neural nets
var ttt = (function(ttt) {
	// game states
	var X, O, TIE;

	// 0 1 2
	// 3 4 5
	// 6 7 8
	// 
	// for example
	// 0 1 1
	// 1 0 1
	// 0 1 0

	// helper classes
	function newBoard() {
		return 0;
	}

	function isEmpty(board) {
		return (board===0);
	}

	// use bitwise operations for speed
	// board / (square * 2^1) & 2^1 + 2^0
	function getPiece(board, square) {
		return ((board >> (square << 1)) & 3);
	}

	function move(board, square, piece) {
		return (board | (piece << (square << 1)));
	}

	// javascript cache is a stack
	function Game(board, turn, history) {
		this.board = board;
		this. turn = turn;
		this.history = history;
	}

	Game.prototype.equals = function Game_equals(other) {
		return (this.board === other.board && this.turn === other.turn);
	}

	Game.prototype.getPiece = function Game_getPiece(square) {
		return getPiece(this.board, square);
	}

	Game.prototype.move = function Game_move(square) {
		this.history.push(this.board);
		this.board = move(this.board, square, this.turn);
		this.turn ^= 2
	}

	Game.prototype.undo = function Game_undo() {
		this.board = this.history.pop()
		this.turn ^= 2
	}

	Game.prototype.winner = function Game_winner() {
		return winner(this.board);
	}

	function drawBoard(ctx) {
		ctx.beginPath()
		ctx.moveTo(0.333, 0.05)
		ctx.lineTo(0.333, 0.95)

		ctx.moveTo(0.666, 0.05)
		ctx.lineTo(0.666, 0.95)

		ctx.moveTo(0.95, 0.333)
		ctx.moveTo(0.95, 0.666)
		ctx.stroke()

	}
}
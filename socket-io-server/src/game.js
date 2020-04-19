const Board = require('./board.js');

class Game {
    constructor(socket) {
        this.board = new Board.Board();
        this.whiteTurn = true;
        this.socket = socket;
    }

    sendBoardToClient(event) {
        this.socket.emit(event, this.board);
    }

    renderBoard(){
        let board = Array(8).fill(null);
        for(let i = 0; i < 8; i++) {
            board[i] = Array(8).fill(null);
        }

        for(let i = 0; i < 8; i++) {
            for(let j = 0; j < 8; j++) {
                let piece = this.board[i][j].contains;
                board[i][j] = 
            }
        }
    }

    initGame() {
        this.board.initGame();
        this.sendBoardToClient('init');
    }

    isValidMove() {
        isValid = this.board.isValidMove(startingCoordinate, endingCoordinate, this.turn);
        if(isValid) {
            this.turn = (this.turn === 'w') ? 'b' : 'w';
            this.makeMove(startingCoordinate, endingCoordinate);
        }
        this.sendBoardToClient('boardUpdate');
    }

    makeMove() {
        this.board.makeMove(startingCoordinate, endingCoordinate);
    }
};

module.exports = { Game }
const Board = require('./board.js');

class Game {
    constructor(socket) {
        this.board = new Board.Board();
        this.turn = 'w';
        this.socket = socket;
    }

    sendBoardToClient(event) {
        console.log('Sending Board to Client');
        console.log(event);
        this.socket.emit(event, this.board);
    }

    initGame() {
        this.board.initStandardGame();
        this.sendBoardToClient('init');
    }

    isValidMove(startingCoordinate, endingCoordinate) {
        return this.board.isValidMove(startingCoordinate, endingCoordinate, this.turn);
    }

    makeMove(startingCoordinate, endingCoordinate) {
        console.log('coordinates');
        console.log(startingCoordinate);
        console.log(endingCoordinate);
        if(this.isValidMove(startingCoordinate, endingCoordinate)){
            this.board.makeMove(startingCoordinate, endingCoordinate);
            this.board.isInCheck(turn);
            this.turn = (this.turn === 'w') ? 'b' : 'w';
            console.log('move validation');
            console.log(this.board);
        }
        this.sendBoardToClient('move');
    }
};

module.exports = { Game }
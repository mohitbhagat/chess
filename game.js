const Board = require('./board.js');

class Game {
    constructor(socket) {
        this.board = new Board.Board();
        this.turn = 'w';
        this.socket = socket;
    }

    sendBoardToClient(event) {
        //console.log('Sending Board to Client');
        //console.log(event);
        let data = {
            matchType: "OTB",
            theBoard: this.board.theBoard
        };
        this.socket.emit(event, data);
    }

    onlineCount() {
        let data = {
            onlineCount: 0,
        };
        this.socket.emit('onlineCount', data);
    }

    initGame() {
        this.board.initStandardGame();
        this.sendBoardToClient('init');
    }

    isValidMove(startingCoordinate, endingCoordinate) {
        return this.board.isValidMove(startingCoordinate, endingCoordinate, this.turn);
    }

    makeMove(startingCoordinate, endingCoordinate) {
        if(this.isValidMove(startingCoordinate, endingCoordinate)){
            let savedBoard = this.board.saveBoard();
            this.board.makeMove(startingCoordinate, endingCoordinate);
            if(this.board.isInCheck(this.turn)) {
                this.board.restoreBoard(savedBoard);
            } else {
                this.turn = (this.turn === 'w') ? 'b' : 'w';
                if(this.board.isInCheck(this.turn)){
                    let isCheckMate = this.board.isInCheckMate(this.turn);
                    console.log('Is ' + this.turn + ' in check mate?');
                    console.log(isCheckMate);
                }
            }
        }
        this.sendBoardToClient('move');
    }
};

module.exports = { Game }
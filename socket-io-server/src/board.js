const Square = require('./square.js');


class Board {
    constructor(){
        this.theBoard = Array(8).fill(null);
        for(let i = 0; i < 8; i++) {
            this.theBoard[i] = Array(8).fill(null);
        }
        for(let i = 0; i < 8; i++) {
            for(let j = 0; j < 8; j++) {
                let curColour = ((j+i)%2 === 0) ? 'dark' : 'light';
                let curSquare = new Square.Square({down: i, right: j}, curColour);
                this.theBoard[i][j] = curSquare;
            }
        }
    }

    setCoordinate(coordinate, contains) {
        this.theBoard[coordinate.down][coordinate.right].setPiece(contains);
    }

    isValidCoordinate(coordinate) {
        if(coordinate[down] < 0 || coordinate[down] > 7){
            return false;
        }
        if(coordinate[right] < 0 || coordinate[right] > 7){
            return false;
        }
        return true;
    }

    pieceAt(coordinate) {
        return this.theBoard[coordinate.down][coordinate.right];
    }

    initGame() {
        this.setCoordinate({down: 0, right: 0}, 'Pb');
    }

    colour(piece) {
        return piece.charAt(1);
    }

    basicMoveChecks(startingCoordinate, endingCoordinate, turn) {
        if(startingCoordinate.down === endingCoordinate.down && startingCoordinate.right === endingCoordinate.right) { return false; }
        if(turn != colour(pieceAt(startingCoordinate))){return false;}
        if(turn === colour(pieceAt(endingCoordinate))) {return false;}
        if(!this.isValidCoordinate(startingCoordinate)) {return false;}
        if(!this.isValidCoordinate(endingCoordinate)) {return false;}
    }

    isValidMove(startingCoordinate, endingCoordinate, turn){
        this.basicMoveChecks(startingCoordinate, endingCoordinate, turn);
    }

    makeMove(startingCoordinate, endingCoordinate) {
        this.setCoordinate(endingCoordinate, this.pieceAt(startingCoordinate));
        this.setCoordinate(startingCoordinate, null);
    }

    isClearPath(startingCoordinate, endingCoordinate) {
        let piece = this.pieceAt(startingCoordinate).charAt(0);
        switch(piece){
            case 'P':
                break;
            case 'K':
                break;
            case 'Q':
                break;
            case 'N':
                break;
            case 'R':
                break;
            case 'B':
                break;
        }
    }

    isClearPawnPath(startingCoordinate, endingCoordinate) {
        let startingPieceType = this.pieceAt(startingCoordinate).charAt(0);
        let startingPieceColour = this.pieceAt(startingCoordinate).charAt(1);
        let endingPieceType = this.pieceAt(startingCoordinate).charAt(0);
        let endingPieceColour = this.pieceAt(startingCoordinate).charAt(1);
        if(this.pieceAt(endingCoordinate) != null) {return null;}
    }
    
    isClearKingPath(startingCoordinate, endingCoordinate) {
        if(((startingCoordinate[down] - endingCoordinate[down]) === 1) &&
            (startingCoordinate[right] - endingCoordinate[right]) === 1)
        {
            return true;
        }
        return false;
    }
    
    isClearQueenPath(startingCoordinate, endingCoordinate) {

    }

    isClearKnightPath(startingCoordinate, endingCoordinate) {

    }

    isClearRookPath(startingCoordinate, endingCoordinate) {

    }

    isClearBishopPath(startingCoordinate, endingCoordinate) {

    }
};

module.exports = {Board}
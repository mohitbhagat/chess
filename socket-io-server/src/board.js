class Board {
    constructor(){
        this.theBoard = Array(8).fill(null);
        for(let i = 0; i < 8; i++) {
            this.theBoard[i] = Array(8).fill(null);
        }
    }

    _setCoordinate(coordinate, piece) {
        this.theBoard[coordinate.down][coordinate.right] = piece;
    }

    pieceAt(coordinate) {
        return this.theBoard[coordinate.down][coordinate.right];
    }

    initStandardGame() {
        //this._setCoordinate({down: 1, right: 0}, 'Pb');
        //this._setCoordinate({down: 1, right: 1}, 'Pb');
        this._setCoordinate({down: 1, right: 2}, 'Pb');
        //this._setCoordinate({down: 1, right: 3}, 'Pb');
        //this._setCoordinate({down: 1, right: 4}, 'Pb');
        //this._setCoordinate({down: 1, right: 5}, 'Pb');
        //this._setCoordinate({down: 1, right: 6}, 'Pb');
        //this._setCoordinate({down: 1, right: 7}, 'Pb');

        //this._setCoordinate({down: 6, right: 0}, 'Pw');
        this._setCoordinate({down: 6, right: 1}, 'Pw')
        //this._setCoordinate({down: 6, right: 2}, 'Pw');
        //this._setCoordinate({down: 6, right: 3}, 'Pw');
        this._setCoordinate({down: 6, right: 4}, 'Pw');
        //this._setCoordinate({down: 6, right: 5}, 'Pw');
        //this._setCoordinate({down: 6, right: 6}, 'Pw');
        //this._setCoordinate({down: 6, right: 7}, 'Pw');

        //this._setCoordinate({down: 0, right: 0}, 'Rb');
        this._setCoordinate({down: 0, right: 1}, 'Nb');
        //this._setCoordinate({down: 0, right: 2}, 'Bb');
        this._setCoordinate({down: 0, right: 3}, 'Qb');
        //this._setCoordinate({down: 0, right: 4}, 'Kb');
        this._setCoordinate({down: 0, right: 5}, 'Bb');
        //this._setCoordinate({down: 0, right: 6}, 'Nb');
        this._setCoordinate({down: 0, right: 7}, 'Rb');

        //this._setCoordinate({down: 7, right: 0}, 'Rw');
        //this._setCoordinate({down: 7, right: 1}, 'Nw');
        this._setCoordinate({down: 7, right: 2}, 'Bw');
        this._setCoordinate({down: 7, right: 3}, 'Qw');
        this._setCoordinate({down: 7, right: 4}, 'Kw');
        //this._setCoordinate({down: 7, right: 5}, 'Bw');
        this._setCoordinate({down: 7, right: 6}, 'Nw');
        //this._setCoordinate({down: 7, right: 7}, 'Rw');
        this._setCoordinate({down: 2, right: 1}, 'Rb');
    }

    _pieceType(coordinate) {
        let piece = this.pieceAt(coordinate);
        if(piece === null) {return null;}
        return piece.charAt(0);
    }

    _pieceColour(coordinate) {
        let piece = this.pieceAt(coordinate);
        if(piece === null) {return null;}
        return piece.charAt(1);
    }

    _basicMoveChecks(startCoor, endCoor, turn) {
        console.log('Basic move check');
        if(startCoor.down === endCoor.down && startCoor.right === endCoor.right) { return false; }
        if(turn != this._pieceColour(startCoor)){return false;}
        if(this.pieceAt(endCoor) != null){
            if(turn === this._pieceColour(endCoor)) {return false;}
        }
        if(!_isValidCoordinate(startCoor)) {return false;}
        if(!_isValidCoordinate(endCoor)) {return false;}
        return true;
    }

    isInCheck(pieceColour) {
        let curCoor;
        let kingCoor = (pieceColour == 'w') ? this._getKingPosn('b') : this._getKingPosn('w');
        for(let i = 0; i < 8; i++) {
            for(let j = 0; j < 8; j++) {
                curCoor = {down: i, right: j};
                if(this.isValidMove(curCoor, kingCoor, pieceColour)){
                    console.log(pieceColour + " is in check");
                    return true;
                }
            }
        }
        console.log(pieceColour + " is not in check");
        return false;
    }

    isValidMove(startCoor, endCoor, turn){
        if(!this._basicMoveChecks(startCoor, endCoor, turn)){
            console.log('Failed basics');
            return false;
        }
        let pieceType = this._pieceType(startCoor);
        switch(pieceType) {
            case 'K':
                return this._isValidKingMove(startCoor, endCoor);
            case 'P':
                return this._isValidPawnMove(startCoor, endCoor);
            case 'Q':
                return this._isValidQueenMove(startCoor, endCoor);
            case 'N':
                return this._isValidKnightMove(startCoor, endCoor);
            case 'R':
                return this._isValidRookMove(startCoor, endCoor);
            case 'B':
                return this._isValidBishopMove(startCoor, endCoor);
            default:
                return false;
        }
    }

    makeMove(startCoor, endCoor) {
        this._setCoordinate(endCoor, this.pieceAt(startCoor));
        this._setCoordinate(startCoor, null);
    }

    _isValidPawnMove(startCoor, endCoor) {
        let turn = this._pieceColour(startCoor);
        if(this._isPawnDoubleAdvance(startCoor, endCoor, turn)){
            if(startCoor.right === endCoor.right){
                if(this._isEmpty(endCoor)){
                    return true;
                }
            }
        } else if(this._isPawnSingleAdvance(startCoor, endCoor, turn)){
            //Is Pawn Single Advance
            if(_abs(startCoor.right - endCoor.right) === 1){
                //Must be capturing a piece
                if(this._pieceColour(endCoor) != null 
                && this._pieceColour(endCoor) != turn){
                    return true;
                }
            } else if(startCoor.right === endCoor.right){
                if(this._isEmpty(endCoor)){
                    return true;
                }
            }
        }
        return false;
    }
   
    _isValidKingMove(startCoor, endCoor) {
        if((_abs(startCoor.down - endCoor.down) > 1) ||
            _abs(startCoor.right - endCoor.right) > 1)
        {
            return false;
        }
        return true;
    }
    
    _isValidQueenMove(startCoor, endCoor) {
        let isClearLateral = this._isClearLateralPath(startCoor, endCoor);
        if(isClearLateral){
            return true;
        }else{
            return this._isClearDiagonalPath(startCoor, endCoor);
        }
    }

    _isValidKnightMove(startCoor, endCoor) {
        let validMoves = [];
        validMoves.push({down: startCoor.down + 2, right: startCoor.right + 1});
        validMoves.push({down: startCoor.down + 1, right: startCoor.right + 2});
        validMoves.push({down: startCoor.down + 2, right: startCoor.right - 1});
        validMoves.push({down: startCoor.down + 1, right: startCoor.right - 2});
        validMoves.push({down: startCoor.down - 2, right: startCoor.right + 1});
        validMoves.push({down: startCoor.down - 1, right: startCoor.right + 2});
        validMoves.push({down: startCoor.down - 2, right: startCoor.right - 1});
        validMoves.push({down: startCoor.down - 1, right: startCoor.right - 2});
        console.log('Valid Moves Length');
        console.log(validMoves.length);
        validMoves = validMoves.filter(_isValidCoordinate);
        console.log(validMoves);
        for(let i = 0; i < validMoves.length; i++) {
            let curCoor = validMoves[i];
            if(curCoor.down === endCoor.down && curCoor.right === endCoor.right) { return true; }
        }
        return false;
    }

    _isValidRookMove(startCoor, endCoor) {
        return this._isClearLateralPath(startCoor, endCoor);
    }

    _isValidBishopMove(startCoor, endCoor) {
        return this._isClearDiagonalPath(startCoor, endCoor);
    }

    //Helper methods
    _isPawnDoubleAdvance(startCoor, endCoor, turn) {
        if(turn === 'b' && startCoor.down === 1) {
            let middleCoor = {down: 2, right: startCoor.right};
            if(endCoor.down === 3 && this._isEmpty(middleCoor)) {return true;}
        } else if(turn === 'w' && startCoor.down === 6) {
            let middleCoor = {down: 5, right: startCoor.right};
            if(endCoor.down === 4 && this._isEmpty(middleCoor)) {return true;}
        }
        return false;
    }

    _isPawnSingleAdvance(startCoor, endCoor, turn) {
        if(turn === 'b') {
            if((endCoor.down - startCoor.down) === 1){return true;}
        } else if(turn === 'w') {
            if((startCoor.down - endCoor.down) === 1) {return true;}
        }
        return false;
    }

    _isClearLateralPath(startCoor, endCoor){
        if(startCoor.down === endCoor.down){
            let minRight = _min(startCoor.right, endCoor.right);
            let maxRight = _max(startCoor.right, endCoor.right);
            for(let i = minRight + 1; i < maxRight; i++) {
                let curCoor = {down: startCoor.down, right: i};    
                if(this.pieceAt(curCoor) != null) {return false;}
            }
            return true;
        } else if(startCoor.right === endCoor.right) {
            let minDown = _min(startCoor.down, endCoor.down);
            let maxDown = _max(startCoor.down, endCoor.down);
            for(let i = minDown + 1; i < maxDown; i++) {
                let curCoor = {down: i, right: startCoor.right};    
                if(this.pieceAt(curCoor) != null) {return false;}
            }
            return true;
        }
        return false;
    }

    _isClearDiagonalPath(startCoor, endCoor) {
        if(!this._coorsAreDiagonal(startCoor, endCoor)) {return false;}
        let dist = _abs(startCoor.down - endCoor.down) - 1;
        let curCoor = startCoor;
        if(startCoor.down < endCoor.down && startCoor.right < endCoor.right){
            for(let i = 1; i < dist; i++) {
                curCoor = {down: startCoor.down + i, right: startCoor.right + i};
                if(this.pieceAt(curCoor) != null) {return false;}
            }
            return true;
        } else if(startCoor.down < endCoor.down && startCoor.right > endCoor.right) {
            for(let i = 1; i < dist; i++) {
                curCoor = {down: startCoor.down + i, right: startCoor.right - i};
                if(this.pieceAt(curCoor) != null) {return false;}
            }
            return true;
        } else if(startCoor.down > endCoor.down && startCoor.right < endCoor.right) {
            for(let i = 1; i < dist; i++) {
                curCoor = {down: startCoor.down - i, right: startCoor.right + i};
                if(this.pieceAt(curCoor) != null) {return false;}
            }
            return true;
        } else if(startCoor.down > endCoor.down && startCoor.right > endCoor.right) {
            for(let i = 1; i < dist; i++) {
                curCoor = {down: startCoor.down - i, right: startCoor.right - i};
                if(this.pieceAt(curCoor) != null) {return false;}
            }
            return true;
        } else {
            return false;
        }
    }

    _coorsAreDiagonal(startCoor, endCoor) {
        return (_abs(startCoor.down - endCoor.down) === _abs(startCoor.right - endCoor.right))
    }

    _isEmpty(coordinate) {
        return (this.pieceAt(coordinate) === null) ? true : false;
    }

    _getKingPosn(colour) {
        let curCoor;
        let curPiece;
        for(let i = 0; i < 8; i++) {
            for(let j = 0; j < 8; j++) {
                curCoor = {down: i, right: j};
                curPiece = this.pieceAt(curCoor);
                if(curPiece === 'K' + colour){
                    return curCoor;
                }
            }
        }
        return null;
    }
}

function _abs(value) {
    if(value < 0) { return -1 * value; }
    return value; 
}

function _isValidCoordinate(coordinate) {
    if(coordinate.down < 0 || coordinate.down > 7){
        return false;
    }
    if(coordinate.right < 0 || coordinate.right > 7){
        return false;
    }
    return true;
}

function _min(x, y) {
    if(x < y) {return x;}
    return y;
}

function _max(x, y) {
    if(x > y) {return x;}
    return y;
}

module.exports = {Board}

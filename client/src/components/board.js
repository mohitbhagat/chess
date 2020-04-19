import React from 'react';
import Square from './square';
import socketIOClient from 'socket.io-client';

export default class Board extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            theBoard: null,
            endpoint: "http://127.0.0.1:8080",
            socket: null
        };
    }

    componentDidMount() {
        this.state.socket = socketIOClient(this.state.endpoint);
        this.state.socket.on("init", data => {
            if(data != null){
                this.setState({theBoard: data.theBoard});
            }
        })
    }

    copyBoard = (board) => {
        if(board === null) { return null; }
        let newBoard = Array(8).fill(null);
        for(let i = 0; i < 8; i++){
            newBoard[i] = Array(8).fill(null)
        }
        for(let i = 0; i < 8; i++) {
            for(let j = 0; j < 8; j++) {
                newBoard[i][j] =  JSON.parse(JSON.stringify(board[i][j]));
            }
        }
        return newBoard;
    }

    handlePieceDrop = (data) => {
        console.log('Dropped. Board method');
        console.log(data);
        this.movePiece(data.curCoordinate, data.newCoordinate);
    }

    handlePieceDragOver(e) {
        e.preventDefault();
        e.stopPropagation();
        console.log('Dragged over');
    }

    handlePieceDragStart(e) {
        console.log('Drag Started')
    }

    initGame = () => {
        let board = this.copyBoard(this.state.theBoard);
        board[3][4].contains = 'Qb';
        this.setState({
            theBoard: board
        });
    }

    render() {
        const squares = (this.state.theBoard === null) ? null : this.state.theBoard.map(row =>
            (
                <div className ='board-row'>
                    {row.map(theSquare =>
                        <Square
                            colour = {theSquare.colour}
                            contains = {theSquare.contains}
                            coordinate = {theSquare.coordinate}
                            handlePieceDrop={this.handlePieceDrop}
                            onDragOver={this.handlePieceDragOver}
                            handlePieceDragStart={this.handlePieceDragStart}
                        />
                    )}
                </div>
            ))
        return (
            <div>
                {squares}
                <button onClick={this.initGame}>Init game</button>
            </div>
        );
    }
}
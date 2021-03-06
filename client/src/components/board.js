import React from 'react';
import Square from './square';
import socketIOClient from 'socket.io-client';

export default class Board extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            theBoard: null,
            endpoint: "https://quiet-beach-58157.herokuapp.com",
            message: null,
            socket: null
        };
    }

    componentDidMount() {
        console.log('Mounting');
        this.state.socket = socketIOClient();
        this.state.socket.emit('onlineCount');
        this.state.socket.on('onlineCount', data => {
            this.setState({
                message: data.onlineCount + " Players online"
            })
        });
        console.log('Socket should be connected');
        console.log(this.state.socket);
    }

    initGame = () => {
        this.setState({theBoard: null});
        this.forceUpdate(); 
        this.state.socket.emit('init');
        this.state.socket.on('init', data => {
            if(data != null){
                if(data.matchType === "Online"){
                    this.setState({
                        theBoard: convertBoard(data.theBoard),
                        message: null});
                } else if(data.matchType === "OTB"){
                    this.setState({
                        theBoard: convertBoard(data.theBoard),
                        message: "Playing over the board."});
                }
            }
        });
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

    movePiece = (startCoor, endCoor) => {
        if(startCoor.down === endCoor.down && startCoor.right === endCoor.right){
            return;
        }
        //console.log(startCoor);
        //console.log(endCoor);
        //console.log(this.state.theBoard[startCoor.down][startCoor.right]);
        //console.log(this.state.theBoard[endCoor.down][endCoor.right]);
        //let board = copyBoard(this.state.theBoard);
        //board[endCoor.down][endCoor.right].contains = board[startCoor.down][startCoor.right].contains;
        //board[startCoor.down][startCoor.right].contains = null;
        //this.setState({
        //    theBoard: board
        //});
        //console.log(this.state.theBoard[startCoor.down][startCoor.right]);
        //console.log(this.state.theBoard[endCoor.down][endCoor.right]);
        let data = {
            startingCoordinate: startCoor,
            endingCoordinate: endCoor
        }
        this.state.socket.emit('move', data)
        this.state.socket.on('move', data => {
            if(data != null){
                console.log('Move event');
                console.log(data.theBoard);
                this.setState({theBoard: convertBoard(data.theBoard)});
                console.log(this.state.theBoard);
            }
        })
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
                <div className="board-container">
                    <div className="board-message">
                        {this.state.message}
                    </div>
                    {squares}
                </div>
                <button className="start-game-button" onClick={this.initGame}>New Game</button>
            </div>
        );
    }
};

function convertBoard(board) {
    let newBoard = Array(8).fill(null);
    for(let i = 0; i < 8; i++) {
        newBoard[i] = Array(8).fill(null);
    }
    for(let i = 0; i < 8; i++) {
        for(let j = 0; j < 8; j++) {
            let squareColour = ((j+i) % 2 === 0) ? 'dark' : 'light';
            let square = {
                colour: squareColour,
                contains: board[i][j],
                coordinate: {down: i, right: j}
            }
            newBoard[i][j] = square;
        }
    }
    return newBoard;
}

function copyBoard(board) {
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
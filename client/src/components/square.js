import React from 'react';
import Piece from './piece';

export default class Square extends React.Component{
    constructor(props) {
        super(props);
    }

    handlePieceDrop = (e) => {
        e.preventDefault();
        e.stopPropagation()
        let pieceData = JSON.parse(e.dataTransfer.getData('text'));
        let data = {
            pieceType: pieceData.pieceType,
            curCoordinate: pieceData.curCoordinate,
            newCoordinate: this.props.coordinate
        }
        console.log('Dropped. Square method');
        this.props.handlePieceDrop(data);
    }

    render() {
        const piece = (this.props.contains === null) ? null :
            (
                <Piece
                    pieceType = {this.props.contains}
                    curCoordinate = {this.props.coordinate}
                    handlePieceDragStart = {this.props.handlePieceDragStart}               
                />
            )
        return(
            <div 
                className = {this.props.colour + '-square'}
                onDrop = {this.handlePieceDrop}
                onDragOver = {this.props.onDragOver}
            >
                {piece}
            </div>
        );
    }
}
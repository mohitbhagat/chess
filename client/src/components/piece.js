import React from 'react';
import Pw from '../img/Pw.png';
import Nw from '../img/Nw.png';
import Bw from '../img/Bw.png';
import Kw from '../img/Kw.png';
import Qw from '../img/Qw.png';
import Rw from '../img/Rw.png';
import Pb from '../img/Pb.png';
import Nb from '../img/Nb.png';
import Bb from '../img/Bb.png';
import Kb from '../img/Kb.png';
import Qb from '../img/Qb.png';
import Rb from '../img/Rb.png';

export default class Piece extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            curCoordinate: this.props.curCoordinate
        }
    }

    handlePieceDragStart = (e) => {
        e.stopPropagation();
        let data = JSON.stringify(this.state);
        e.dataTransfer.setData('text', data);
        this.props.handlePieceDragStart(e);
    }

    render() {
        if(this.props.pieceType === null){
            return null;
        }

        let pieceImage;
        switch(this.props.pieceType) {
            case 'Pw':
                pieceImage = Pw;
                break;
            case 'Bw':
                pieceImage = Bw;
                break;
            case 'Kw':
                pieceImage = Kw;
                break;
            case 'Nw':
                pieceImage = Nw;
                break;
            case 'Qw':
                pieceImage = Qw;
                break;
            case 'Rw':
                pieceImage = Rw;
                break;
            case 'Pb':
                pieceImage = Pb;
                break;
            case 'Bb':
                pieceImage = Bb;
                break;
            case 'Kb':
                pieceImage = Kb;
                break;
            case 'Nb':
                pieceImage = Nb;
                break;
            case 'Qb':
                pieceImage = Qb;
                break;
            case 'Rb':
                pieceImage = Rb;
                break;
            default:
                pieceImage = null;
                break;
        }

        return(
            <div>
                <img 
                    src={pieceImage}
                    draggable="true"
                    className="piece"
                    onDragStart={this.handlePieceDragStart}
                />
            </div>
        );
    }
}
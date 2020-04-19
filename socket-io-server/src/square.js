class Square {
    constructor(coordinate, colour, contains = null){
        this.coordinate = coordinate;
        this.colour = colour;
        this.contains = contains;
    }

    setPiece(piece) {
        this.contains = piece;
    }
};

module.exports = {Square}
const express = require('express');
const http = require('http');
const Game = require('./game.js');
const socketIo = require('socket.io');

const port = process.env.PORT || 8080;

let app = express();

app.get("/", (req, res) => {
    res.send('<h1>Hello World!</h1>');
});

let server = http.createServer(app);

server.listen(port, () => {
    console.log('listening on ' + port);
})

let io = socketIo(server);

io.on("connection", socket => {
    console.log("New client connected");
    //console.log(socket);
    let game = new Game.Game(socket);
    /*
    socket.emit('init', () => {
        game.initGame();
    });*/
    socket.on('init', () => {
        game.initGame();
    })
    socket.on('move', data => {
        //console.log(data);
        game.makeMove(data.startingCoordinate, data.endingCoordinate);
    });
    //socket.emit("init", "This is the server resonse");
    socket.on("disconnect", () => {
        console.log("Client disconnected");
    });
});
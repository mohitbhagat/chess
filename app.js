const express = require('express');
const http = require('http');
const Game = require('./game.js');
const path = require('path');
const socketIo = require('socket.io');

const port = process.env.PORT || 8080;

let app = express();
app.use(express.static(path.join(__dirname, 'build')));

app.get('/*', (req, res) => { res.sendfile(path.join(__dirname, 'build', 'index.html'));});

let server = http.createServer(app);

server.listen(port, () => {
    console.log('listening on ' + port);
});

let io = socketIo(server);
io.set('origins', '*:*');
io.on("connection", socket => {
    console.log("New client connected");
    let game = new Game.Game(socket);
    socket.on('init', () => {
        game.initGame();
    })
    socket.on('move', data => {
        game.makeMove(data.startingCoordinate, data.endingCoordinate);
    });
    socket.on("disconnect", () => {
        console.log("Client disconnected");
    });
});

module.exports = app;

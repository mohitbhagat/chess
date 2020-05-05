'use strict';

const express = require('express');
const Game = require('./game.js');
const path = require('path');
const socketIo = require('socket.io');

const PORT = process.env.PORT || 8080;

const server = express()
    .use(express.static(path.join(__dirname, 'build')))
    .listen(PORT, () => console.log(`Listening on ${PORT}`));

const io = socketIo(server);

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

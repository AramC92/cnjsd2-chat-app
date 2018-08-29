'use strict';

// native node modules
const path = require('path');
const http = require('http');
// external node modules
const socketIO = require('socket.io');
const express = require('express');

const PORT = process.env.PORT || 3000;
const publicPath = path.join(__dirname, '/../public');

let app = express();
// setup httpserver using express behind the scenes
let server = http.createServer(app);
// integrate socketio to the server
let io = socketIO(server);

// set public path to serve content
app.use(express.static(publicPath));

// add socketio event listeners
io.on('connection', (socket) => {
    console.log('[INFO] User connected');
    // function to run when socket is disconnected
    socket.on('disconnect', () => {
        console.log('[INFO] User disconnected');
    });
});

// make the server listen to requests on a specified port
server.listen(PORT, () => {
    console.log(`[INFO] Server listening on port ${PORT}`);
});
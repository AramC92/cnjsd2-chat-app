'use strict';

// native node modules
const path = require('path');
const http = require('http');
// external node modules
const socketIO = require('socket.io');
const express = require('express');

const { generateMessage } = require('./utils/message.js');

const PORT = process.env.PORT || 3000;
const publicPath = path.join(__dirname, '/../public');

let app = express();
// setup httpserver using express behind the scenes
let server = http.createServer(app);
// integrate socketio to the server
let io = socketIO(server);

// set public path to serve content
app.use(express.static(publicPath));

// handle socket event listeners when user is connected
io.on('connection', (socket) => {
    console.log('[INFO] User connected');

    // get client ip
    let clientIp = socket.request.connection.remoteAddress;

    // greet user
    socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app'));
    socket.broadcast.emit('newMessage', generateMessage('Admin', `User with IP ${clientIp} joined`));

    // handle incoming messages
    socket.on('createMessage', (msg) => {
        console.log('Received new message from client', msg);
        io.emit('newMessage', generateMessage(msg.from, msg.text));
    });
    
    // handle disconnection
    socket.on('disconnect', () => {
        console.log('[INFO] User disconnected');
    });
});

// make the server listen to requests on a specified port
server.listen(PORT, () => {
    console.log(`[INFO] Server listening on port ${PORT}`);
});
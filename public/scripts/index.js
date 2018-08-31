'use strict';

// open websocket and keep connection open
let socket = io();
// add socketio event listeners
socket.on('connect', function () {
    console.log('[INFO] Connected to server');
});

socket.on('newMessage', function (msg) {
    console.log('Rendering incoming message:', msg);
});

socket.on('disconnect', function () {
    console.log('[INFO] Disconnected from server');
});
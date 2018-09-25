'use strict';

// DOM
let messages = document.getElementsByClassName('l-messages')[0];
let messageForm = document.getElementById('l-message-form');
let messageTextField = document.getElementsByClassName('c-message-input')[0];

// open websocket and keep connection open
let socket = io();
// add socketio event listeners
socket.on('connect', function () {
    console.log('[INFO] Connected to server');
});

socket.on('newMessage', function (message) {
    // render new message on browser
    let localeTime = new Date(message.createdAt).toLocaleTimeString('en-US', { hour12: false });
    let messageHtml = `<div class="c-message">[${localeTime}] ${message.from}: ${message.text}</div>`
    messages.insertAdjacentHTML('beforeend', messageHtml);
});

socket.on('disconnect', function () {
    console.log('[INFO] Disconnected from server');
});

messageForm.addEventListener('submit', function (e) {
    // override default behaviour
    e.preventDefault();

    // send message to server
    socket.emit('createMessage', {
        from: 'User', // placeholder
        text: messageTextField.value
    });

    // clear textbox
    messageTextField.value = "";
});
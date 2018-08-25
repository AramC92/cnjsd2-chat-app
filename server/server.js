'use strict';

const path = require('path');
const http = require('http');

const express = require('express');
const socketIOgit = require('socket.io');

const PORT = process.env.PORT || 3000;
const publicPath = path.join(__dirname, '/../public');

let app = express();

app.use(express.static(publicPath));
//
app.listen(PORT, () => {
    console.log(`[INFO] Server listening on port ${PORT}`);
});
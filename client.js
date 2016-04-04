var io = require('socket.io-client');

var socket = io('ws://localhost:8000')
socket.on('connect', function(){
    socket.send('client');

    socket.on('message', function(msg){
        socket.send(new Date().getTime());
    });
});
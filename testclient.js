var sio = require('socket.io-client');

var conn = sio('ws://localhost:3000');
conn.on('connect', function(){
	console.log("conn");
	conn.send('test');
	conn.on('message', function(){});
});
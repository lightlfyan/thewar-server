var sio = require('socket.io-client');

var ProtoBuf = require("protobufjs");
var builder = ProtoBuf.loadProtoFile("./game.proto");
var Message = builder.build("game");
var msg = new Message.Move(1, 10, 9);
var buffer = msg.toBuffer();

var conn = sio('ws://localhost:3000');
conn.on('connect', function(){
	console.log("conn");
	setInterval(function(){
		conn.send({id:"Move", data: buffer});
	}, 1000);
	conn.on('message', function(msg){
		console.log(msg);
	});
});

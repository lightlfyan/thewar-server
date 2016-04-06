var EventEmitter = require('events').EventEmitter;
var util = require('util');

var handler = function(socket, mailbox, mgr){
	EventEmitter.call(this);
	this.socket = socket;
	this.mailbox = mailbox;
	this.on('tick', this.tick);
	this.mgr = mgr;
}

util.inherits(handler, EventEmitter);

var pro = handler.prototype;

pro.tick = function(){
	console.log("tick===================");
}

pro.hand = function(){
	console.log("handler hand");
	var msg = this.mailbox[this.socket.id].shift();
	this.socket.send(msg);

	msg = this.mgr.decodemsg(msg);
	console.log(msg);
}

module.exports.create = function(socket, mailbox, mgr){
	return new handler(socket, mailbox, mgr);
}
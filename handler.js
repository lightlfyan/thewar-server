var EventEmitter = require('events').EventEmitter;
var util = require('util');

var handler = function(socket, store){
	EventEmitter.call(this);
	this.socket = socket;
	this.store = store;
	this.on('tick', this.tick);
}
util.inherits(handler, EventEmitter);

var pro = handler.prototype;

pro.tick = function(){
	console.log("tick===================");
}

pro.hand = function(){
	console.log("handler hand");
	var msg = this.store.mailbox[this.socket.id].shift();
	console.log(msg);
}

module.exports.create = function(socket, store){
	return new handler(socket, store);
}
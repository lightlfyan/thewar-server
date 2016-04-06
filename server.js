var events = require("events");
var util = require('util');


var Server = function (){
	events.EventEmitter.call(this);
}

util.inherits(Server, events.EventEmitter);
module.exports = Server;

Server.prototype.Start = function(){
	self = this;
	self.emit("xxx", self);
};
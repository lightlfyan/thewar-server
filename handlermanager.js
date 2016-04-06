var ProtoBuf = require("protobufjs");
var builder = ProtoBuf.loadProtoFile("./game.proto");
var Message = builder.build("game");

var handlermanager = function(){
	this.handlers = {};
};
var pro = handlermanager.prototype;

pro.addhander = function(id, handler){
	this.handlers[id] = handler;
};

pro.decodemsg = function(msg){
	var data = Message[msg.id].decode(msg.data);
	return { id: msg.id, data: data};
}


module.exports.create = function(){
	return new handlermanager();
};
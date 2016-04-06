var handler = function(socket, store){
	this.socket = socket;
	this.store = store;
}

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
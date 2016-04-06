var EventEmitter = require('events').EventEmitter;
var util = require('util');
var sio = require('socket.io');

var Acceptor = function (opts, whenconn, cb){
	EventEmitter.call(this);
	this.sockets = {};
	this.mailbox = {};
	this.whenconn = whenconn;
	this.cb = cb;
};
util.inherits(Acceptor, EventEmitter);

var pro = Acceptor.prototype;

pro.listen = function(port){
	var self = this;
	this.server = sio.listen(port, {exclusive: true});
  	this.server.on('error', function(err) {
    	self.emit('error', err);
  	});

  	this.server.sockets.on('connection', function(socket){
  		self.sockets[socket.id] = socket;
  		self.emit('connection', {s: socket});
  		socket.on('message', function(pkg){
  			processmsg(socket, self, pkg);
  		});
  		socket.on('disconnect', function(reason){
  			delete self.sockets[socket.id];
  			delete self.mailbox[socket.id];
  		});
  	});

  	this.on('connection', function(argu){
  		this.whenconn(argu.s, this);
  	});
};

pro.close = function(){
	this.emit('closed');
};

var pushmail = function(socket, acceptor, msg){
	if(!acceptor.mailbox[socket.id]){
		acceptor.mailbox[socket.id] = [];
	}
	acceptor.mailbox[socket.id].push(msg);
};


var processmsg = function (socket, acceptor, msg){
	pushmail(socket, acceptor, msg);
	if(acceptor.cb != null){
		acceptor.cb.call(null, socket, acceptor);
	}
}


module.exports.create = function (opts, whenconn, cb) {
	return new Acceptor(opts || {}, whenconn, cb);
}
var acp = require('./acceptor');
var handler = require('./handler.js');
var handlermanagertype = require('./handlermanager.js');

var handlermanager = new handlermanagertype.create();

setInterval(function(){
	for(var key in handlermanager.handlers){
		handlermanager.handlers[key].emit('tick');
	}
}, 1000);

var srv = acp.create({}, function(s, store){
	var hand = handler.create(s, store);
	handlermanager.addhander(s.id, hand);
}, function(s, store){
	var hand = handlermanager.handlers[s.id];
	hand.hand();
});

srv.listen('3000');

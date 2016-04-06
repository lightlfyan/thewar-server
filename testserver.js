var acp = require('./acceptor');
var srv = acp.create({}, function(s, store){
	var msg = store.mailbox[s.id][0];
	console.log(msg);
});

srv.listen('3000');

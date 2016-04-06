var handlermanager = function(){
	this.handlers = {};
};
var pro = handlermanager.prototype;

pro.addhander = function(id, handler){
	this.handlers[id] = handler;
};


module.exports.create = function(){
	return new handlermanager();
};
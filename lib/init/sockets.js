var loader = require('../utils/moduleloader').loader;

module.exports = function(){
	console.log('SOCKETS');
	/*if(!this.sockets){
		this.sockets =
	}*/

	if(this.paths.sockets && loader(this, this.paths.sockets)){
		console.log('SOCKETS MODULE LOADED', this.paths.sockets);
	}

	return true;
};
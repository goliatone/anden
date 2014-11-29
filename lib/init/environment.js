var loader = require('../utils/moduleloader').loader;

module.exports = function(){
	console.log('ENVIRONMENT');

	/*if(!this.sockets){
		this.sockets =
	}*/

	if(this.paths.environment && loader(this, this.paths.environment)){
		console.log('ENVIRONMENT MODULE LOADED', this.paths.environment);
	} else console.log('ENVIRONMENT NOT FOUND')
	return true;
};
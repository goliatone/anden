var loader = require('../utils/moduleloader').loader;

module.exports = function(){
	console.log('MIDDLEWARE');

	/*if(!this.sockets){
		this.sockets =
	}*/

	if(this.paths.middleware && loader(this, this.paths.middleware)){
		console.log('MIDDLEWARE MODULE LOADED', this.paths.middleware);
	} else console.log('MIDDLEWARE NOT FOUND')
	return true;
};
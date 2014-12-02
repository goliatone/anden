module.exports = function(){
	// this.appLog = require('../app-log');

	//TODO: Make the movules array configurable, so we can load
	//ws-sockets or io-sockets.

	var modules = [
		'./get-module-paths',
		'./server',
		'./sockets',
		'./environment',
		'./middleware',
		'./sub-apps',
		'./routes',
		'./static-content'
	];

	var success = modules.every(function(module){
		return require(module).call(this) !== false;
	}, this);


	return success;
};
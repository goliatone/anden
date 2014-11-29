module.exports = function(){
	// this.appLog = require('../app-log');

	var success = [
		'./get-module-paths',
		'./server',
		'./sockets',
		'./environment',
		'./middleware',
		'./sub-apps',
		'./routes',
		'./static-content'
	].every(function(module){
		return require(module).call(this) !== false;
	}, this);


	return success;
};
var express = require('express'),
	debug,
	http = require('http');

module.exports = function(){
	debug = require('debug')('anden:' + this.name);

	this.engine = this.app = express();

	if(!this.server){
		this.server = http.createServer(this.app);
	}
	console.log('mountpath', this.mountpath);

	this.app.mountpath = this.mountpath;

	return;
	if(!this.isRoot()) return console.log('+++++++++++++++++++++++++++%s', this.name);

	var run = function(){
		var server = this.server.listen(this.port, this.host, function(){
			var address = 'http://'+server.address().address + ':' + server.address().port;
			debug('[%s] *** Anden running express server on %s ***', this.name, address);
		});
	};

	this.engine.run = run.bind(this);

};
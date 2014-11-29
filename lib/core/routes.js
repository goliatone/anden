'use strict';

var tracks = require('trackfinder'),
	debug = require('debug')('anden:core'),
	path = require('path');

module.exports = function(anden){
	debug('[%s] routes running %s', anden.name, __filename);

	var routes = path.join(anden.root, anden.config.moduleIds.routes);
	tracks.register(anden.app, {
	    path:routes
	});

	debug('registering routes %s', routes);

};
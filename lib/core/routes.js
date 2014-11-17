'use strict';

var tracks = require('trackfinder'),
	path = require('path');

module.exports = function(anden){
	console.log(__filename,'running');

	var routes = path.join(anden.root, anden.config.moduleIds.routes);
	tracks.register(anden.app, {
	    path:routes
	});
};
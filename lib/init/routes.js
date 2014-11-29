'use strict';

var path = require('path'),
	tracks = require('trackfinder'),
	debug;

module.exports = function(){
	debug = require('debug')('blog:'+this.name);
	debug('ROUTES %s ',this.name);

	tracks.register(this.app, {
	    path:this.paths.routes
	});

	debug('registering routes %s', this.paths.routes);
	debug('registering routes %s', this.path);
};
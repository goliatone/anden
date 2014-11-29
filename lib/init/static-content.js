'use strict';

var path = require('path'),
	fs = require('fs'),
	express = require('express'),
	debug;

module.exports = function(){
	debug = require('debug')('anden:'+this.name);
	debug('STATIC CONTENT %s ',this.name);

	if (this.paths.static) {
        this.app.use('/', express.static(this.paths.static));
        debug('Exposed ' + this.paths.static);
    }
};
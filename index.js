
'use strict';


var extend = require('extend');

var DEFAULTS = {
	autoinitialize:true,
	config:{
		port:9000,
		host:'localhost',
		appPath: process.cwd()
	}
};

var Anden = function(options){
	options = extend({}, this.constructor.DEFAULTS, options);
	if(options.autoinitialize ) this.init(options);
};

Anden.DEFAULTS = DEFAULTS;

Anden.prototype.init = function(options){
	if(this.initialized) return;
	this.initialized = true;
	extend(this, this.constructor.DEFAULTS, options);
};

Anden.prototype.run = function(config){
	extend(this.config, config || {});
	this.logger.log('START!', this.config);
};

Anden.prototype.logger = console;

module.exports = Anden;

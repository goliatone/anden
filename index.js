
'use strict';


var extend = require('extend');

var DEFAULTS = {
	autoinitialize:true,
	port:9000,
	host:'localhost',
	path:'./'
};

var Anden = function(config){
	config = extend({}, this.constructor.DEFAULTS, config);
	if(config.autoinitialize ) this.init(config);
};

Anden.DEFAULTS = DEFAULTS;

Anden.prototype.init = function(config){
	if(this.initialized) return;
	this.initialized = true;
	extend(this, this.constructor.DEFAULTS, config);
};

Anden.prototype.run = function(){
	this.logger.log('START!', __dirname)
};

Anden.prototype.logger = console;

module.exports = Anden;

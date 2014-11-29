var extend = require('gextend');
var fs = require('fs');
var path = require('path');
var debug = require('debug')('conductor');

var DEFAULTS = {
	autoinitialize:true,
	filename:'config.json',
	data:{}
};

var Conductor = function(config){
	config = extend({}, this.constructor.DEFAULTS, config);
	if(config.autoinitialize ) this.init(config);
};

Conductor.DEFAULTS = DEFAULTS;

Conductor.prototype.init = function(config){
	if(this.initialized) return;
	this.initialized = true;

	extend(this, this.constructor.DEFAULTS, config);

};

Conductor.prototype.load = function(filename, defaults){
	this.filename = filename || this.filename;

	var filepath = path.resolve(this.filename);

	var config = {};
	try {
		config = JSON.parse(fs.readFileSync(filepath, 'utf8'));
	} catch(e){
		debug('%s. Thrown while loading %s.', e, this.filename);
	}

	this.data = extend(config, defaults);

	debug('LOADED path %s. %o', this.filename, this.data);

	return this.data;
};



Conductor.prototype.logger = console;

module.exports = Conductor;

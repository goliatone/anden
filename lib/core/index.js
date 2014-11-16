'use strict';
var _path = require('path');
var fs = require('fs');

module.exports = function(anden){
	var modules = ['server', 'environment', 'middleware', 'routes'];

	var success = modules.every(function(name){
		return require(_path.join(__dirname, name))(anden) !== false;
	});

	return success;
};
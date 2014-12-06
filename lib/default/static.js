'use strict';
var express = require('express');

module.exports = function(anden){
	console.log('app is ', anden.app);
	anden.app && anden.app.use('/', express.static('../../public'));
};
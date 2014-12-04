'use strict';
var express = require('express');

module.exports = function(anden){
	anden.app.use('/', express.static('../../public'));
};
'use strict';

var express = require('express'),
    debug = require('debug')('anden:core'),
    http = require('http');

module.exports = function(anden) {
    debug('[%s] running server', anden.name);
};
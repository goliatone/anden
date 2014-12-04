'use strict';
var _path = require('path');
var fs = require('fs');

module.exports = function() {
    var modules = [
        './server',
        './middleware',
        './routes',
        './static'
    ];

    modules.forEach(function(name) {
        require(name)(this);
    }, this);
};
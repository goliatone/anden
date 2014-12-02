'use strict';
var _path = require('path');
var fs = require('fs');

module.exports = function(anden) {
    var modules = ['server', 'environment',
        'middleware', 'routes',
        'sockets', 'submodules'
    ];
    console.log('PATH', anden.root);
    console.log('DIRN', __dirname)
    var success = modules.every(function(name) {
        return require(_path.join(__dirname, name))(anden) !== false;
    });

    return success;
};
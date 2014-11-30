'use strict';

var path = require('path'),
    tracks = require('trackfinder'),
    debug;

module.exports = function() {
    debug = require('debug')('blog:' + this.name);

    debug('ROUTES %s ', this.name);
    debug('registering routes %s', this.paths.routes);

    tracks.register(this.app, {
        path: this.paths.routes
    });
};
'use strict';

var path = require('path'),
    tracks = require('trackfinder'),
    debug;

module.exports = function() {
    debug = require('debug')('anden:' + this.name);

    debug('ROUTES %s ', this.name);
    debug('registering routes %s', this.paths.routes);

    this.routers = tracks.register(this.app, {
        path: this.paths.routes
    });

    debug('routers %o', this.routers.length);
};
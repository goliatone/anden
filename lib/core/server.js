'use strict';

var express = require('express'),
    debug = require('debug')('anden:core'),
    http = require('http');

module.exports = function(anden) {
    debug('[%s] running server', anden.name);

    var app = express();
    app.express = express;

    // app.mountPath = '';

    anden.app = app;
    if (!anden.server) anden.server = http.createServer(app);

    anden.app.run = function() {
        var server = anden.server.listen(anden.config.port, anden.config.host, function() {
            var address = 'http://' + server.address().address + ':' + server.address().port;
            debug('[%s] *** Anden running express server on %s ***', anden.name, address);
        });
    };
};
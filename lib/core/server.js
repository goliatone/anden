'use strict';

var express = require('express'),
    http = require('http');

module.exports = function(anden) {
    console.log('Start server on ', anden.config.port, anden.config.host);

    var app = express()
    app.express = express;

    app.get('/hello', function(req, res) {
        res.send('<h1>Hello World!</h1>');
    });

    app.mountPath = '';

    anden.app = app;
    if (!anden.server) anden.server = http.createServer(app);

    anden.app.run = function() {
        var server = app.listen(anden.config.port, anden.config.host, function() {
            var address = 'http://' + server.address().address + ':' + server.address().port;
            anden.logger.log('Anden running express server on', address);
        });
    };
};
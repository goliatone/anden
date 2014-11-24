'use strict';

var path = require('path'),
	helpers = require('../utils/moduleloader'),
	cors = require('cors'),
    logger = require('morgan'),
    express = require('express'),
    favicon = require('serve-favicon'),
    bodyParser = require('body-parser'),
    cookieParser = require('cookie-parser');

module.exports = function(anden) {
    console.log('running middleware', anden.root);

    //Load all middleware from our mounted app:
    //TODO: We need to check if mp is valid module dir!
    var mp = path.join(anden.root, anden.config.moduleIds.middleware);
    helper.loader(mp);

    anden.on('postinit', function() {
        var staticPath = path.resolve('../../' + anden.config.staticDir),
        	faviconPath = path.join(staticPath, 'favicon.ico');


        anden.app.use(favicon(faviconPath));
        anden.app.use(express.static(staticPath));
    });

    var install = anden.config.defaultMiddleware;

    install && anden.on('postinit', function() {
        anden.app.use(logger('combined'));
    	anden.app.use(cors());
    	anden.app.use(bodyParser.json({ type: 'application/*+json' }));
    	anden.app.use(bodyParser.text({ type: 'text/html' }));
    	anden.app.use(bodyParser.urlencoded({ extended: false }));
    	anden.app.use(cookieParser());
    });
};
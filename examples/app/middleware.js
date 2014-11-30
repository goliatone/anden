'use strict';
var path = require('path'),
	helper = require('../utils/moduleloader'),
	cors = require('cors'),
    logger = require('morgan'),
    express = require('express'),
    favicon = require('serve-favicon'),
    bodyParser = require('body-parser'),
    cookieParser = require('cookie-parser'),
	debug = require('debug')('app:middleware');

module.exports = function(anden){
	debug('MIDDLEWARE APP %s running', this.name);
	var staticPath = path.resolve('../../' + this.staticDir),
    	faviconPath = path.join(staticPath, 'favicon.ico');

    anden.app.use(favicon(faviconPath));
    anden.app.use(logger('combined'));
	anden.app.use(cors());
	anden.app.use(bodyParser.json({ type: 'application/*+json' }));
	anden.app.use(bodyParser.text({ type: 'text/html' }));
	anden.app.use(bodyParser.urlencoded({ extended: false }));
	anden.app.use(cookieParser());
};
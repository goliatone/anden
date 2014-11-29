'use strict';
var path = require('path');
var debug = require('debug')('app:middleware');

module.exports = function(anden){
	debug('MIDDLEWARE APP %s running', __filename);

	var staticPath = path.resolve('public');
	debug('[%s] use express static %s %s', anden.name, staticPath);
    anden.app.use(anden.app.express.static(staticPath));
};
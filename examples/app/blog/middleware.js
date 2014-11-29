'use strict';
var path = require('path');
var debug = require('debug')('blog:middleware');

module.exports = function(anden){
	debug('BLOG MIDDLEWARE %s running',__filename);

	var staticPath = path.join(__dirname, 'www');
	debug('[%s] use express static %s', anden.parent.name, staticPath);
    anden.parent.app.use(anden.app.express.static(staticPath));
};
'use strict';
var path = require('path');

module.exports = function(anden){
	console.log('/////// ADMIN MIDDLEWARE',__filename,'running');

	return;

	var staticPath = path.join(__dirname, 'public');
	console.log('STATIC PATH', staticPath)
    anden.app.use(anden.app.express.static(staticPath));
};
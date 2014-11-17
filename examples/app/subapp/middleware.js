'use strict';
var path = require('path');

module.exports = function(anden){
	console.log(__filename,'running');

	anden.app.get('/admin', function(req, res) {
        res.send('<h1>Hello admin!</h1><p>this is the life!</p>');
    });

	var staticPath = path.resolve('www');
    anden.app.use(anden.app.express.static(staticPath));
};
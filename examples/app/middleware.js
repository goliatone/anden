'use strict';
var path = require('path');

module.exports = function(anden){
	console.log(__filename,'running');

	anden.app.get('/peperone', function(req, res) {
        res.send('<h1>Hello peperone!</h1><p>this is the life!</p>');
    });

	var staticPath = path.resolve('public');
    anden.app.use(anden.app.express.static(staticPath));
};
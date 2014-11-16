'use strict';

module.exports = function(anden){
	console.log(__filename,'running');

	anden.app.get('/peperone', function(req, res) {
        res.send('<h1>Hello peperone!</h1><p>this is the life!</p>');
    });
};
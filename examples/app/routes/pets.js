'use strict';

module.exports = function(app, options){
    console.log('- pets: register routes');

    app.get('/pets', function(req, res){
        res.json({
            pets:['Colonel Meow','Choupette', 'Casper', 'Chase No Face', 'Cherry Pop', 'Blackie the Talking Cat']
        });
    });
};
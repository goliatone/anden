'use strict';
var Anden = require('../anden');
var path = require('path');

module.exports = function(anden) {
    if(global.subap) {
    	console.log('WE ARE HERE!!!**********************\n*****************************')
    	return false;
    }
    global.subap = true;

    console.log('MODULES', anden.name, path.join(anden.root, 'blog'));
    // return
    var subap = new Anden({
    	parent:anden,
        root: path.join(anden.root, 'blog'),
        name:'blog',
        config:{
        	mountPath: 'blog'
        }
    });
    anden.app.use('/'+subap.name, subap.app);
    anden.subap = subap;
};
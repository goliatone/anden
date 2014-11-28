'use strict';
var Anden = require('../anden');
var path = require('path');

module.exports = function(anden) {
    if(global.subap) return false;
    global.subap = true;
    console.log('MODULES', anden.name, path.join(anden.root, 'subapp'));
    // return
    var subap = new Anden({
    	parent:anden,
        root: path.join(anden.root, 'subapp'),
        name:'subap',
        config:{
        	mountPath: 'subapp'
        }
    });

    anden.subap = subap;
};
'use strict';
var Anden = require('../anden');
var path = require('path');

module.exports = function(anden) {
    console.log('MODULES', anden.name, path.join(anden.root, 'subap'));

    if(global.subap) return false;
    global.subap = true;

    var subap = new Anden({
        root: path.join(anden.root, 'subap'),
        name:'subap',
        config:{
        	mountPath: 'subap'
        }
    });

    anden.subap = subap;
};
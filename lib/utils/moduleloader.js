var fs = require('fs'),
    path = require('path');

exports.getModulePath = function(basedir, module){
    module = path.join(basedir, module);
    if(!exports.isValidModulePath(module)) return false;
    return module;
};

exports.isValidModulePath = function(path) {
    return fs.existsSync(path + '.js') || fs.existsSync(path);
};

exports.loader = function(app, modpath) {

    if(!exports.isValidModulePath(modpath)) {
        console.log('NOT FOUND:', modpath);
        return false;
    }

    var module;
    try {
        module = require(modpath);
    } catch (e) {
        console.log('==== ERROR: unable to load module', modpath);
    }

    if(typeof module === 'function') module.call(app);

    return module;
};

exports.getSubapps = function getSubapps(app) {
    var ignore = app.ignore.concat(app.staticDir),
        subapps = [];

    var files;
    try {
        files = fs.readdirSync(app.path);
    } catch (e) {
        console.log('Error reading directory', app.path, e.message);
    }

    if (files) {
        files.filter(function(filename) {
            return ignore.indexOf(filename) === -1 && filename[0] !== '.';
        }).forEach(function(filename) {
            var filepath = path.join(app.path, filename);
            var filestats;
            try {
                filestats = fs.statSync(filepath);
            } catch (e) {
                console.log('Error reading file stats for', filepath, e.message);
            }
            if (filestats && filestats.isDirectory()) subapps.push(filename);
        });
    }

    return subapps;

};
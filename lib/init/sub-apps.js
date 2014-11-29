var Anden = require('../anden'),
    loader = require('../utils/moduleloader').loader,
    path = require('path'),
    fs = require('fs');

module.exports = function() {
    console.log('SUB-APPS');

    this.subapps = {};

    var names = getSubapps(this);
    names.forEach(function(name) {
        var subapp = new Anden({
        	name:name,
            path: path.join(this.path, name),
            mountpath: this.mountpath + '/' + name,
            server: this.server,
            sockets: this.sockets
        });

        if (!subapp.loaded) return;
        this.app.use('/' + name, subapp.app);
        this.subapps[name] = subapp;

    }, this);

    return true;
};


function getSubapps(app) {
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

}
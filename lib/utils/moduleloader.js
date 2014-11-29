function find(directory) {
    var files = [];
    var route, name;
    //TODO: Figure out how to handle relative paths to doc
    fs.readdirSync(directory).forEach(function(file) {

        if (filterFile(file)) return

        name = file.substr(0, file.indexOf('.'));
        /*
         * Dynamically include and initialize all route files.
         */
        try {
            route = require(_path.join(directory, name));

            files.push(route);
        } catch (e) {
            this.logger.error(e);
        }

    }.bind(this));

    return files;
}

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
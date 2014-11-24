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

var fs = require('fs');

exports.isValidModulePath = function(path) {
    return fs.existsSync(path + '.js') || fs.existsSync(path);
};

exports.loader = function(app, modpath) {

    if(!exports.isValidModulePath(modpath)) return false;

    var module;
    try {
        module = require(mp);
    } catch (e) {
        console.log('ERROR: unable to load module', path);
    }

    if(typeof module === 'function') module(app);

    return module;
};
var path = require('path'),
    fs = require('fs'),
    getModulePath = require('../utils/moduleloader').getModulePath;

module.exports = function(){
    // console.log('BUILD MODULE PATHS', this.moduleIds);
    var modulepath, success = true;
        this.missingModules = [];

    Object.keys(this.moduleIds).forEach(function(moduleId) {
        modulepath = getModulePath(this.path, this.moduleIds[moduleId]);

        if (!modulepath && this.requiredModules.indexOf(moduleId) !== -1) {
            //TODO: Consider collecting errors so we can check on flight!
            this.missingModules.push(moduleId);
            success = false;
        }

        this.paths[moduleId] = modulepath;
    }, this);

    //static path
    var staticPath = path.join(this.path, this.staticDir);
    this.paths.static = fs.existsSync(staticPath) ? staticPath : false;

    return success;
};
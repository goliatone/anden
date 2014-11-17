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
'use strict';


var extend = require('extend');
var util = require("util");
var events = require("events");

var DEFAULTS = {
    autoinitialize: true,
    config: {
        port: process.env.PORT || 9000,
        host: 'localhost',
        root: process.cwd(),
        ignore: [],
        moduleIds: {
        	environment:'environment',
        	routes:'routes',
        	middleware:'middleware',
        	sockets:'sockets'
        },
        mountPath: '',
        staticDir: 'public',
        defaultMiddleware:true
    }
};

var Anden = function(options) {
	events.EventEmitter.call(this);
    options = extend({}, this.constructor.DEFAULTS, options);
    if (options.autoinitialize) this.init(options);
};

util.inherits(Anden, events.EventEmitter);

Anden.DEFAULTS = DEFAULTS;

Anden.prototype.init = function(options) {
    if (this.initialized) return;
    this.initialized = true;
    extend(this, this.constructor.DEFAULTS, options);

    //Run core modules
    require('./lib/core')(this);

    this.emit('postinit');
};

Anden.prototype.run = function(config) {
    extend(this.config, config || {});
    this.logger.log('START!', this.config);

    this.app.run();
};

Anden.prototype.logger = console;

module.exports = Anden;
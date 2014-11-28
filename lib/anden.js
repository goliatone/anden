'use strict';


var extend = require('./utils/extend');
var util = require("util");
var events = require("events");

var DEFAULTS = {
    autoinitialize: true,
    name:'root',
    root:process.cwd(),
    config: {
        port: process.env.PORT || 9000,
        host: 'localhost',
        ignore: [],
        moduleIds: {
        	environment:'environment',
        	routes:'routes',
        	middleware:'middleware',
        	sockets:'sockets',
        	submodules:'submodules'
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
    console.log('INIT', this.config)
    //Run core modules
    require('./core')(this);

    this.emit('postinit');
};

Anden.prototype.run = function(config) {
    extend(this.config, config || {});
    this.logger.log('START!', this.config);

    this.app.run();

    this.emit('run');
};

Anden.prototype.logger = console;

module.exports = Anden;
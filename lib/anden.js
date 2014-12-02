'use strict';


var extend = require('gextend');
var util = require('util');
var path = require('path');
var events = require('events');
var fs = require('fs');
var debug;

var ROOT_NAME = 'root';

var DEFAULTS = {
    autoinitialize: true,
    name: ROOT_NAME,
    paths:{},
    path:process.cwd(),
    ignore: [],
    subapps:{},
    requiredModules:['routes', 'middleware'],
    moduleIds: {
        environment:'environment',
        routes:'routes',
        middleware:'middleware',
        sockets:'sockets'
    },
    mountpath: '',
    configname:'.anden.json',
    staticDir: 'public',
    defaultMiddleware:true,
    port: process.env.PORT || 9000,
    host: 'localhost'
};

var Anden = function(options) {
	events.EventEmitter.call(this);
    options = extend({}, this.constructor.DEFAULTS, options);
    if (options.autoinitialize) this.init(options);
};

util.inherits(Anden, events.EventEmitter);

Anden.DEFAULTS = DEFAULTS;
Anden.ROOT_NAME = ROOT_NAME;

Anden.prototype.init = function(options) {
    if (this.initialized) return;
    this.initialized = true;

    extend(this, this.constructor.DEFAULTS, options);
    //loadConf depends on having the right path, that is why we
    //first set the path, and then load the config.
    extend(this, this.loadConf());

    debug = require('debug')('anden:'+this.name);
    debug('INIT module', this.name);

    //Run core modules
    this.loaded = require('./core').call(this);

    console.log('==== ON INIT SUCCESS',this.name, this.loaded);
};

Anden.prototype.run = function(config) {
    //TODO: What happens if we have config.path?
    //should we pick config.port & config.host?
    extend(this, config || {});

    this.logger.log('START!', this.name, Object.keys(this.subapps));

    this.emit('beforerun');
    this.emit('beforerun.'+this.name);

    // this.engine.run();
    var server = this.server.listen(this.port, this.host, function(){
        this._address = 'http://'+server.address().address + ':' + server.address().port;
        debug('[%s] *** Anden running express server on %s ***', this.name, this._address);

        this.emit('run');

    }.bind(this));
};

Anden.prototype.getUrl = function(){
    return this._address;
};

Anden.prototype.loadConf = function(){
    var configpath = path.join(this.path, this.configname);
    if(! fs.existsSync(configpath)) return;
    var config = {};
    try {
        config = require(configpath);
    } catch(e){
        this.logger.log('ERROR loading config %s', configpath);
    }
    return config;
};

Anden.prototype.isRoot = function(){
    return this.name === this.constructor.ROOT_NAME;
};

Anden.prototype.registerSubapp = function(name){
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
};

Anden.prototype.logger = console;

Object.defineProperty(Anden.prototype, 'path', {
    get: function() { return this._path; },
    set: function(p) { this._path = path.resolve(p); },
    enumerable: true,
    configurable: true
});

Object.defineProperty(Anden.prototype, 'ignore', {
    get: function(){ return this._ignore;},
    set: function(i) {
        this._ignore = i.concat(this._ignore || []).filter(function(item, pos, self) {
            return self.indexOf(item) === pos;
        });
    },
    enumerable:true,
    configurable:true
});

module.exports = Anden;
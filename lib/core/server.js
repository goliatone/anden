var express = require('express'),
    debug,
    http = require('http');

module.exports = function(){
    debug = require('debug')('anden:' + this.name);

    this.engine = this.app = express();

    if(!this.server){
        this.server = http.createServer(this.app);
    }
    console.log('mountpath', this.mountpath);

    this.app.mountpath = this.mountpath;
};
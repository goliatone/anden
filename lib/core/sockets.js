var loader = require('../utils/moduleloader').loader;
var WebSocketServer = require('ws').Server;

module.exports = function() {
    console.log('SOCKETS');

    if (!this.sockets) {
        var wss = new WebSocketServer({
            server: this.server
        });

        wss.broadcast = function(data) {
            for (var i in this.clients) {
                this.clients[i].send(data);
            }
        };

        this.sockets = wss;
    }

    if (this.paths.sockets && loader(this, this.paths.sockets)) {
        console.log('SOCKETS MODULE LOADED', this.paths.sockets);
    }

    return true;
};
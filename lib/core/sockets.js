'use strict';

var WebSocketServer = require('ws').Server;
var path = require('path');

module.exports = function(anden){
	console.log('running sockets');
	var wss = new WebSocketServer({server:anden.server});

	wss.broadcast = function(data) {
	    for(var i in this.clients){
	        this.clients[i].send(data);
	    }
	};

	anden.sockets = wss;

	/*
	var io = require('socket.io')(anden.server);
	anden.sockets = io;
    */

	var mp = path.join(anden.config.root, anden.config.moduleIds.sockets);
    require(mp)(anden);
};
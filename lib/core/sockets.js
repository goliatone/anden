'use strict';

var WebSocketServer = require('ws').Server;
var path = require('path');
var helper = require('../utils/moduleloader');

module.exports = function(anden){
	console.log('running sockets');

	if(!anden.sockets){
		var wss = new WebSocketServer({server:anden.server});

		wss.broadcast = function(data) {
		    for(var i in this.clients){
		        this.clients[i].send(data);
		    }
		};

		anden.sockets = wss;
	}

	/*
	var io = require('socket.io')(anden.server);
	anden.sockets = io;
    */

	var mp = path.join(anden.root, anden.config.moduleIds.sockets);
    helper.loader(mp);
};
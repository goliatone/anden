'use strict';

var WebSocketServer = require('ws').Server;
var path = require('path');
var helper = require('../utils/moduleloader');
var debug = require('debug')('anden:core');

module.exports = function(anden){
	debug('[%s] running sockets', anden.name);

	return;

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


};
'use strict';

module.exports = function(anden){
	console.log('RUNNING SOCKETS');
	anden.sockets.on('connection', function(socket){
		console.log('ON CONNECTION')
		socket.on('message', function(data){
			console.log('MESSAGE', data);
			socket.send(data)
		});
	});
};
define('connectionManager', function(require){

	var Ractive = require('ractive');
	var GSocket = require('gsocket');

    var ConnectionManager = Ractive.extend({
        id: 'connectionManager',
        template: '#connetionManager-template',
        init: function() {
            this.on({
                onconnect: this.onConnect.bind(this)
            });

            this.set('ready', true);

            this.observe('socket', function(value){
            	if(!value) return;
            	this.socket = value;
            	this.set('endpoint', this.socket.endpoint);
            }.bind(this));

        },
        onConnect: function() {
            console.log('Connecting to %s ...', this.get('endpoint'));
            if (this.socket.state === GSocket.OPEN) this.socket.disconnect();
            else this.socket.connect(this.get('endpoint'));
        },
        data: {
            endpoint:''
        }
    });

    Ractive.components.ConnectionManager = ConnectionManager;

	return ConnectionManager;
});
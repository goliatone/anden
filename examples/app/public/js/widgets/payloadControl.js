define('payloadControl', function(require){

	var Ractive = require('ractive');


	var PayloadControl = Ractive.extend({
        id: 'payloadControl',
        template: '#payloadControl-template',
        init: function() {
            this.on('send', this.onClickSend.bind(this));
            this.observe('activePayload', this.onActivePayloadSet.bind(this));
        },
        onActivePayloadSet: function(payload, old) {
            if (!payload && !old) return;
            this.set('payload', payload);
            var message = '';
            if (payload) message = JSON.stringify(payload.data, null, 4);
            this.set('payloadData', message);
        },
        onClickSend: function() {
            var payload = this.get('payload');
            payload.data = JSON.parse(this.get('payloadData'));

            this.fire('sendRequest', {
                payload: payload
            });
        },
        data: {
            payloadData: ''
        }
    });
    Ractive.components.PayloadControl = PayloadControl;

    return PayloadControl;
});
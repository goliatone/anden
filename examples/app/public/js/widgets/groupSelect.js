define('groupSelect', function(require){

	var Ractive = require('ractive');

	var GroupSelect = Ractive.extend({
        id: 'groupSelect',
        template: '#groupSelect-template',
        init: function() {
            this.observe('selectedGroup', this.onGroupSelected.bind(this));
        },
        onGroupSelected: function(value, old) {
            this.set('selectedPayload', null);
        },
        data: {
            activePayloads: []
        }
    });

    Ractive.components.GroupSelect = GroupSelect;

    return GroupSelect;
});
define('importWidget', function(require){

	var Ractive = require('ractive');

	var ImportExport = Ractive.extend({
        id: 'importExport',
        debug:true,
        template: '#importExport-template',
        init: function() {
            Foundation.libs.reveal.init();
            this.on('import', this.onImport.bind(this));
            this.on('export', this.onExport.bind(this));
        },
        onImport: function() {
            var content = this.get('ieContent');
            if(!content) return;
            this.fire('requestImportPayload', content);
        },
        onExport:function(){
            this.fire('requestExportPayload');
        },
        data: {

        }
    });

    Ractive.components.ImportExport = ImportExport;

    return ImportExport;
});
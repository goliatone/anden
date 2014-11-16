/*global define:true requirejs:true*/
/* jshint strict: false */
requirejs.config({
    baseUrl: 'js',
    paths: {
        // 'app': 'app',
        'client': '/client',

        'gioc': 'components/gioc/src/gioc',
        'gpub': 'components/gpub/src/gpub',
        'gconfig': 'components/gconfig/gconfig',
        'gsocket': 'components/gsocket/src/gsocket',

        'gstorage': 'components/gstorage/src/gstorage',
        'localstore': 'components/gstorage/src/local.store',

        'gcollection': 'components/gcollection/src/gcollection',
        'gconfig.path': 'components/gconfig/gconfig.path',
        'gconfig.qstring': 'components/gconfig/gconfig.qstring',
        'gconfig.interpolate': 'components/gconfig/gconfig.interpolate',

        'keypath': 'components/gkeypath/keypath',
        'extend': 'components/gextend/src/extend',

        'console': 'widgets/console',
        'groupSelect': 'widgets/groupSelect',
        'importWidget': 'widgets/importWidget',
        'payloadControl': 'widgets/payloadControl',
        'connectionManager': 'widgets/connectionManager',

        'templatecontext': 'components/templatecontext/templatecontext',

        'ractive': 'components/ractive/ractive',
        'code-mirror': 'components/requirejs-codemirror/src/code-mirror',
        'jquery': 'components/jquery/dist/jquery',
        // 'foundation': 'foundation.min'
        'foundation': 'components/foundation/js/foundation.min'
    },
    cm: {
        // baseUrl to CodeMirror dir
        baseUrl: 'components/CodeMirror/',
        // path to CodeMirror lib
        path: 'lib/codemirror',
        // path to CodeMirror css file
        css: 'js/components/CodeMirror/lib/codemirror.css',
        // define themes
        themes: {
            tomorrowNight: 'js/components/CodeMirror/theme/tomorrow-night-eighties.css'
        },
        modes: {
            // modes dir structure
            path: 'mode/{mode}/{mode}'
        }
    },
    'shim': {
        'foundation': {
            deps: ['jquery'],
            exports: 'Foundation'

        },
        'jqplugin': {
            deps: ['jquery'],
            exports: 'jQuery.fn.alterClass'
        }
    }
});

define('main', function(require) {
    var $ = require('jquery'),
        Template = require('ractive'),
        GSocket = require('gsocket'),
        GIoc = require('gioc'),
        extend = require('extend'),
        GCollection = require('gcollection'),
        LocalStore = require('localstore'),
        GStorage = require('gstorage'),
        GPub = require('gpub');


    require('console');
    require('groupSelect');
    require('importWidget');
    require('payloadControl');
    require('connectionManager');

    require('foundation');
    $(document).foundation();

    GPub.observable(GSocket);
    GPub.observable(GCollection);

    var cgroups = new GCollection();
    var cpayloads = new GCollection({
        indexKey: 'name'
    });

    var IE = function(config) {
        this.collections = config.collections;
    };

    GCollection.prototype.from = function(data) {
        if (typeof data === 'string') data = JSON.parse(data);
        console.log('FROM', data);
        this._hash = data;
        this._dirty = true;
        this.emit('change');
        return this.values();
    };
    GCollection.prototype.to = function() {
        return this._hash;
    };

    IE.prototype.export = function() {
        var out = {};
        Object.keys(this.collections).map(function(collection) {
            out[collection] = this.collections[collection].to();
        }, this);
        return JSON.stringify(out, null, 4);
    };
    IE.prototype.import = function(data) {
        if (!data) return console.warn('Import: no data');

        if (typeof data === 'string') data = JSON.parse(data);
        Object.keys(this.collections).map(function(collection) {
            if (!data[collection]) return;
            console.log('Importing', collection, data[collection]);
            this.collections[collection].from(data[collection]);
        }, this);
    };

    var ie = new IE({
        collections: {
            'payloads': cpayloads
        }
    });

    cpayloads.on('update', function(e) {
        console.log('UPDATING COLLECTION ITEM', e.value);
        if(!e.value.group) return;
        cgroups.add({
            id: e.value.group
        });
    }).on('add', function(e) {
        if (!e.value.group) return;
        console.log('ADDING COLLECTION ITEM', e.value.group);
        cgroups.add({
            id: e.value.group
        });
    }).on('remove', function(e) {
        console.log('REMOVING COLLECTION ITEM', e.value);
    });

    var persistence = new GStorage({
        storeID: 'payloads',
        storeFactory: function(config) {
            return new LocalStore(config);
        }
    });
    persistence.get('payloads').then(function(e) {
        if (!e) return console.warn('NOTHING HERE');
        cpayloads.reset();
        cpayloads.add(e);
        cpayloads.on('change', function() {
            persistence.set('payloads', this.values());
        });
    });


    var data = {
        connected: false,
        stringify: function(value) {
            return JSON.stringify(value, null, 4);
        }
    };

    var socket = new GSocket({
        autoconnect: false,
        endpoint: (function() {
            var wsPort = (window.location.port.toString() === '' ? '' : ':' + window.location.port);
            return 'ws://' + window.location.hostname.replace('www', '') + wsPort;
        })()
    });
    socket.on('connected', function() {
        window.v.set('connected', true);
    }).on('closing', function() {
        window.v.set('connected', false);
    });




    Template.prototype.setComponentData = function(componentID, path, value) {
        var component = this.findComponent(componentID);
        if (path && !value) component.set(path);
        else component.set(path, value);
        return component;
    };

    var view = new Template({
        el: '#content',
        template: '#content-template',
        components: Template.components,
        data: data
    });

    view.findComponent('ConnectionManager').observe('ready', function() {
        view.setComponentData('ConnectionManager', 'socket', socket);
    });

    view.findComponent('Console').on('messageRendered', function() {
        $('pre code').each(function(i, e) {
            if ($(this).hasClass('hljs') || $(this).find('hljs').length !== 0) return;
            hljs.highlightBlock(e);
        });
    });

    view.findComponent('GroupSelect').observe('selectedGroup', function(groupID) {
        console.warn('On Selected Group update', groupID);
        if (!groupID) return;
        var payloads = cpayloads.where({
            group: groupID
        });
        view.setComponentData('GroupSelect', 'activePayloads', payloads);
    });

    view.findComponent('GroupSelect').observe('selectedPayload', function(payloadID) {
        console.log('SELECTED PAYLOAD', payloadID);
        var payload = cpayloads.get(payloadID);
        payload = extend({}, payload);
        view.setComponentData('PayloadControl', 'activePayload', payload);
    });

    view.findComponent('PayloadControl').on('sendRequest', function(e) {
        //TODO: We need to CREATE new groups. Those get lost!!!
        console.log('Sending data %o now!', e.payload);

        var payload = e.payload;

        cpayloads.add(payload);

        socket.send(extend({}, payload.data));

        /*
         * Note, since we are passing by reference
         * the data object, and we are modifying it
         * inside the send the content of data !== raw anymore
         */
        v.findComponent('Console').appendLog(payload.data);
    });

    view.findComponent('ImportExport').on('requestImportPayload', function(value) {
        ie.import(value);
    });

    view.findComponent('ImportExport').on('requestExportPayload', function(){
        // if(!value) return;
        var payload = ie.export();
        this.set('ieContent', payload);
    });

    cpayloads.on('add', function(item) {
        var state = {
            selectedGroup: item.group,
            selectedPayload: item.name,
            groups: cgroups.values(true),
            payloads: cpayloads.values(true)
        };
        console.warn('Payload Collection on add', state);

        view.setComponentData('GroupSelect', state);

        //TODO: Shouldn't this be picked up by the previous *state* update?!
        //We need to force rendering and displaying any new payloads.
        var payloads = cpayloads.where({
            group: item.group
        });
        view.setComponentData('GroupSelect', 'activePayloads', payloads);
    });

    //Initialize TODO: Make generic
    var state = {
        groups: cgroups.values(true),
        payloads: cpayloads.values(true)
    };

    view.setComponentData('GroupSelect', state);

    /*var CodeMirror = require('code-mirror!javascript:tomorrowNight');
    var editor = window.editor = CodeMirror.fromTextArea(document.getElementById('ieContent'), {
        lineNumbers: true,
        mode: 'javascript',
        theme:'tomorrow-night-eighties'
    });*/

    var ioc = new GIoc();
    ioc.map('data', data);
    ioc.map('view', view);
    ioc.map('socket', socket);
    ioc.map('extend', extend);
    ioc.map('payloadStrong', cpayloads);

    window.ioc = ioc;
    window.v = view;
    window.co = cpayloads;
    window.persistence = persistence;
    window.cn = view.findComponent('Console');
    window.cm = view.findComponent('ConnectionManager');
    window.pm = view.findComponent('GroupSelect');
    window.cp = cpayloads;
    window.cg = cgroups;
    window.ie = ie;
});

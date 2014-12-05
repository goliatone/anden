var assert = require('assert');

describe('anden', function(){
    var Anden = require('../'),
        anden;

    beforeEach(function(){
        anden = new Anden();
    })
    it('should have a ROOT_NAME class prop', function(){
        assert.equal('root', Anden.ROOT_NAME);
    });

    it('should have a DEFAULTS class prop', function(){
        assert.equal('object', typeof Anden.DEFAULTS);
    });

    it('should be instance of EventEmitter', function(){
        //minimal interface that needs to be implemented!
        assert.equal('function', typeof anden.on);
        assert.equal('function', typeof anden.emit);
    });

    xit('should initialize with DEFAULTS props', function(){
        Anden.DEFAULTS.autoinitialize = false;
        anden = new Anden({autoinitialize:false});
        Object.keys(Anden.DEFAULTS).forEach(function(prop){
            console.log(prop, Anden.DEFAULTS[prop], anden[prop])
            assert.deepEqual(Anden.DEFAULTS[prop], anden[prop]);
        });
    });


    it('should have a run method', function(){
        assert.equal('function', typeof anden.run);
    });


});
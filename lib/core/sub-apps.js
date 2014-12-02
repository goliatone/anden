var getSubapps = require('../utils/moduleloader').getSubapps;

module.exports = function() {
    console.log('SUB-APPS');

    var names = getSubapps(this);
    names.forEach(this.registerSubapp, this);

    return true;
};

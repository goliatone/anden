var extend = function extend(target) {
    var sources = [].slice.call(arguments, 1);
    sources.forEach(function (source) {
        for (var property in source) {
            if(source[property] && source[property].constructor &&
                source[property].constructor === Object){
                target[property] = target[property] || {};
                target[property] = extend(target[property], source[property]);
            } else target[property] = source[property];
        }
    });
    return target;
};

module.exports = extend;
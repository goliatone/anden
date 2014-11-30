
function space(x) {
    var res = '';
    while(x--) res += ' ';
    return res;
}

exports.dump = function dump(){
    for (var i = 0; i < arguments.length;  i++) {
        if(arguments[i].stack instanceof Array){
            console.log('');
            arguments[i].stack.forEach(function(a){
                var route = a.route;
                if(route){
                    route.stack.forEach(function(r){
                        var method = r.method.toUpperCase();
                        console.log(method,space(8 - method.length),route.path);
                    })
                }
            });
        }
    }
}
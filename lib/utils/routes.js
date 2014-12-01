var extend = require('gextend');

/*
 * Route Metadata
 */
function RouteMetadata(mountpath, method, uri){
    this.uri = uri;
    this.mountpath = mountpath;
    this.method = method.toUpperCase();
    this.toString = function(){
        console.log(this.method, '\t', this.mountpath + this.uri);
    };
}

/*
 * App Metadata
 */
function AppMetadata(anden){
    this.path = anden.app.path();
    this.routes = this.getRouters(anden);
    this.name = anden.name;
}

AppMetadata.prototype.getRouters = function (anden){
    return [].concat(anden.routers, [anden.app._router]);
};

/*
 * Anden Metadata
 */
function AndenMetadata(anden){
    this.meta = {};
    this.apps = extend({}, anden.subapps);
    this.apps[anden.name] = anden;

    this.collect();
}

AndenMetadata.prototype.collect = function(){
    var path, meta, routeMeta;

    Object.keys(this.apps).forEach(function(id){
        meta = new AppMetadata(this.apps[id]);
        meta.routes.forEach(function(r){
            r.stack.forEach(function(layer){
                layer.route && layer.route.stack.forEach(function(r){
                    routeMeta = new RouteMetadata(meta.path, r.method, layer.route.path);
                    routeMeta.toString();
                });
            });
        });
        this.meta[meta.name] = meta;
    }, this);
};




exports.collectRouteMetameta = function (anden){
   new AndenMetadata(anden);
};
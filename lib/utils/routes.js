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
    this.name = anden.name;
    this.path = anden.app.path();
    this.routes = this.getRouters(anden);
    this.routesMeta = [];
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

    this.walkAllRoutes();
}

AndenMetadata.prototype.walkAllRoutes = function(cb){
    Object.keys(this.meta).forEach(function(id){
        this.meta[id].routesMeta.forEach(function(meta){
            cb(meta);
        });
    }, this);
};

AndenMetadata.prototype.collect = function(){
    var path, meta, routeMeta;

    Object.keys(this.apps).forEach(function(id){
        meta = new AppMetadata(this.apps[id]);

        meta.routes.forEach(function(route){
            route.stack.forEach(function(layer){
                layer.route && layer.route.stack.forEach(function(r){
                    meta.routesMeta.push(new RouteMetadata(meta.path, r.method, layer.route.path));
                });
            });
        });
        this.meta[meta.name] = meta;
    }, this);
};




exports.collectRouteMetameta = function (anden){
   return new AndenMetadata(anden);
};
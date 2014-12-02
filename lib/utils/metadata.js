var extend = require('gextend');

/////////////////////////////////////
/// AndenMetadata
/////////////////////////////////////
/*
 * Anden Metadata
 */
function AndenMetadata(anden){
    this.collect(anden);
}

AndenMetadata.prototype.reset = function(anden){
    this.meta = {};
    this.apps = {};
    this.apps[anden.name] = anden;
    this.apps = extend(this.apps, anden.subapps);
};

AndenMetadata.prototype.walkAllMetas = function(cb){
    Object.keys(this.meta).forEach(function(id){
        cb(this.meta[id]);
    }, this);
};

AndenMetadata.prototype.walkAllRoutes = function(cb){
    this.walkAllMetas(function(appmeta){
        appmeta.routesMeta.forEach(function(routemeta){
            cb(routemeta, appmeta);
        });
    });
};

AndenMetadata.prototype.collect = function(anden){
    this.reset(anden);
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


/////////////////////////////////////
/// AppMetadata
/////////////////////////////////////
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


/////////////////////////////////////
/// RouteMetadata
/////////////////////////////////////
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



exports.collectRouteMetameta = function (anden){
   return new AndenMetadata(anden);
};
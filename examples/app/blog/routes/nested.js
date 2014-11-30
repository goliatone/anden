var Route = {};

Route.priority = 11;
//We don't need the mountpath here, we already plug it on subap creation
// Route.using = '/blog';

Route.register = function(app, options){
    console.log('**********************************')
    console.log('**********************************')
    console.log('- blog: register tag route');
    app.get('/tags', function(req, res){
        res.send('<h1>All your tags</h1><p>This should list tags</p>');
    });
};

Route.routes = {
    'GET /post': function(req, res) {
        res.send('==> GET all posts');
    },
    'GET /post/:id': function(req, res) {
        console.log('params', req.params);
        res.send('===> GET post with id : '+ req.params.id);
    },
    'POST /:resource': function(req, res) {},
    'PUT /:resource/:id': function(req, res) {},
    'PATCH /:resource/:id': function(req, res) {},
    'DELETE /:resource/:id': function(req, res) {}
};

module.exports = Route;

var Route = {};

Route.priority = 11;
// Route.using = '/admin';

Route.register = function(app, options){
    console.log('**********************************')
    console.log('**********************************')
    console.log('- admin: register tag route');
    app.get('/users', function(req, res){
        res.send('<h1>All your users</h1><p>This should list all users</p>');
    });
};

Route.routes = {
    'GET /pages': function(req, res) {
        res.send('==> GET all pages');
    },
    'GET /user/:id': function(req, res) {
        console.log('params', req.params);
        res.send('===> GET post with id : '+ req.params.id);
    },
    'POST /:user': function(req, res) {},
    'PUT /:user/:id': function(req, res) {},
    'PATCH /:user/:id': function(req, res) {},
    'DELETE /:user/:id': function(req, res) {}
};

module.exports = Route;

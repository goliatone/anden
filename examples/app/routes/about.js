var Route = {};

Route.priority = 10;
Route.using = '/user';

Route.register = function(app, options){
    console.log('- users: register routes');
    app.get('/peperone', function(req, res){
        res.send('Peperone is here, mofos!');
    });
};

Route.routes = {
    'GET /users': function(req, res) {
        res.send('==> GET users');
    },
    'GET /:resource/:id': function(req, res) {
        console.log('params', req.params);
        res.send('===> GET user: '+ req.params.resource+ ' '+ req.params.id);
    },
    'POST /:resource': function(req, res) {},
    'PUT /:resource/:id': function(req, res) {},
    'PATCH /:resource/:id': function(req, res) {},
    'DELETE /:resource/:id': function(req, res) {}
};

module.exports = Route;

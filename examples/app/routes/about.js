var Route = {};

Route.priority = 10;

Route.register = function(app, options){
    console.log('- users: register routes');
    app.get('/about', function(req, res){
        res.send('<h1>About</h1><p>This is an about page</p>');
    });
};

module.exports = Route;

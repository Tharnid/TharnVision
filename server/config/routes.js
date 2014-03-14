// required
var auth = require('./auth'),
	users = require('../controllers/users'),
	courses = require('../controllers/courses'),
	mongoose = require('mongoose'),
	User = mongoose.model('User');


module.exports =  function(app) {

	// returns a list of all users...adding chain of middleware to make sure users have access
	app.get('/api/users', auth.requiresRole('admin'), users.getUsers);
	// create users
	app.post('/api/users', users.createUser);
	// update users
	app.put('/api/users', users.updateUser);

	// route for the partials
	app.get('/partials/*', function(req, res) { // :partialPath causes an infinite loop that will crash app
	  res.render('../../public/app/' + req.params); // .partialPath remove this to stop loop as well
	  // have to go up to levels now to find partials
	});

	// course list
    app.get('/api/courses', courses.getCourses);

	// 404 catch route
	app.all('/api/*', function(req, res) {
    	res.send(404);
  	});

	// login route
	app.post('/login', auth.authenticate);

	// logout route
	  app.post('/logout', function(req, res) {
	    req.logout();
	    res.end();
	  });

	// route for index
	app.get('*', function(req, res) {
	    res.render('index', {
	      bootstrappedUser: req.user
	    });
	}); // * asterick will match all routes
}
// required
var auth = require('./auth'),
	mongoose = require('mongoose'),
	User = mongoose.model('User');


module.exports =  function(app) {

	// returns a list of all users...adding chain of middleware to make sure users have access
	app.get('/api/users', auth.requiresRole('admin') ,function(req, res) { // don't invoke just pass the function
		User.find({}).exec(function(err, collection) {
			res.send(collection);
		})
	});

	// route for the partials
	app.get('/partials/*', function(req, res) { // :partialPath causes an infinite loop that will crash app
	  res.render('../../public/app/' + req.params); // .partialPath remove this to stop loop as well
	  // have to go up to levels now to find partials
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
// required
var passport = require('passport');


module.exports =  function(app) {
	// route for the partials
	app.get('/partials/*', function(req, res) { // :partialPath causes an infinite loop that will crash app
	  res.render('../../public/app/' + req.params); // .partialPath remove this to stop loop as well
	  // have to go up to levels now to find partials
	});

	// login route
	  app.post('/login',function(req, res, next) {
	  	var auth = passport.authenticate('local', function(err, user) {
	  		if(err) {return next(err);}
	  		if(!user) { res.send({success:false})}
	  		req.logIn(user, function(err) {
	  			if(err) {return next(err);}
	  			res.send({success:true, user: user});
	  		})
	  	})
	  	auth(req, res, next);
	  });

	// route for index
	app.get('*', function(req, res) {
		res.render('index');
	}); // * asterick will match all routes
}
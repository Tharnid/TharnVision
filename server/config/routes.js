

module.exports =  function(app) {
	// route for the partials
	app.get('/partials/*', function(req, res) { // :partialPath causes an infinite loop that will crash app
	  res.render('../../public/app/' + req.params); // .partialPath remove this to stop loop as well
	  // have to go up to levels now to find partials
	});

	// route for index
	app.get('*', function(req, res) {
		res.render('index');
	}); // * asterick will match all routes
}
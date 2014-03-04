var mongoose = require('mongoose'),
	userModel = require('../models/User');

module.exports = function(config) {
	// connect to mongo env
	mongoose.connect(config.db);

	var db = mongoose.connection;

	db.on('error', console.error.bind(console, 'connection error...'));
	db.once('open', function callback() {
	  console.log('TharnVision db opened!!!');
	});

	// create default users function called from models/User.js
  	userModel.createDefaultUsers();

};




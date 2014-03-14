 var mongoose = require('mongoose'),
	// models
	userModel = require('../models/User');
	courseModel = require('../models/Course');

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
  	courseModel.createDefaultCourses();
};




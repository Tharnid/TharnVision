
var path = require('path');

// configure root
var rootPath = path.normalize(__dirname + '/../../');

module.exports = {
	development: {
		db: 'mongodb://localhost/TharnVision',
		rootPath: rootPath,
		port: process.env.PORT || 3030
	},

	production: {
		db: 'mongodb://aragoth:ylix12ylix@ds027829.mongolab.com:27829/tharnvision',
		rootPath: rootPath,
		port: process.env.PORT || 80
	}
}
// App requirements

var express = require('express');

// enviroment variables dev prod etc.
var env = process.env.NODE_ENV = process.env.NODE_ENV || 'development';

// setting up express variables
var app = express();

// config
var config = require('./server/config/config')[env];

require('./server/config/express')(app, config);

require('./server/config/mongoose')(config);

require('./server/config/routes')(app);

// listen to requests
// var port = process.env.PORT || 9002;
app.listen(config.port);

console.log('Listening on port ' + config.port + '.....the server has started!!!');
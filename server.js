// App requirements

var express = require('express');
	stylus = require('stylus');

// enviroment variables dev prod etc.
var env = process.env.NODE_ENV = process.env.NODE_ENV || 'development';

// setting up express variables
var app = express();

// stylus config
function compile(str, path) {
	return stylus(str).set('filename', path);
}

app.configure(function() {
  app.set('views', __dirname + '/server/views');
  app.set('view engine', 'jade');
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(stylus.middleware(
    {
      src: __dirname + '/public',
      compile: compile
    }
  ));
  app.use(express.static(__dirname + '/public'));
});

// route for index

app.get('*', function(req, res) {
	res.render('index');
}); // * asterick will match all routes

// listen to requests
var port = 9002;
app.listen(port);

console.log('Listening on port ' + port + '.....the server has started!!!');
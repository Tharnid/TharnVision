// App requirements

var express = require('express');
	stylus = require('stylus');
  mongoose = require('mongoose');

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

// mongodb stuff
// mongo connection
mongoose.connect('mongodb://localhost/TharnVision');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error...'));
db.once('open', function callback() {
  console.log('TharnVision db opened!!!');
});

// test message from mongo
var messageSchema = mongoose.Schema({message: String});
var Message = mongoose.model('Message', messageSchema);
var mongoMessage;
Message.findOne().exec(function(err, messageDoc) {
  mongoMessage = messageDoc.message;
});

// route for the partials
app.get('/partials/:partialPath', function(req, res) {
  res.render('partials/' + req.params.partialPath);
});

// route for index
app.get('*', function(req, res) {
	res.render('index', {
    mongoMessage: mongoMessage
  });
}); // * asterick will match all routes

// listen to requests
var port = process.env.PORT || 9002;
app.listen(port);

console.log('Listening on port ' + port + '.....the server has started!!!');
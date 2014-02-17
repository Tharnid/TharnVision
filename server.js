// App requirements

var express = require('express'),
    mongoose = require('mongoose'),
    passport = require('passport'),

    // passport-local
    LocalStrategy = require('passport-local').Strategy;

// enviroment variables dev prod etc.
var env = process.env.NODE_ENV = process.env.NODE_ENV || 'development';

// setting up express variables
var app = express();

// config
var config = require('./server/config/config')[env];

require('./server/config/express')(app, config);

require('./server/config/mongoose')(config);

var User = mongoose.model('User');

passport.use(new LocalStrategy(
  function(username, password, done) {
    User.findOne({username:username}).exec(function(err, user){
      if(user && user.authenticate(password)) {
        return done(null, user);
        // console.log(user);
      } 
      else
      {
        return done(null, false);
        // console.log(user);
      } 
    })
  } 
));

passport.serializeUser(function(user, done) {
    if(user) {
      done(null, user._id);
    }
    // console.log(user);
});

  passport.deserializeUser(function(id, done) {
    User.findOne({_id:id}).exec(function(err, user) {
      if(user) {
        return done(null, user);
        // console.log(user);
      } else {
        return done(null, false);
        // console.log(user);
      }
    })
  })

require('./server/config/routes')(app);

// listen to requests
// var port = process.env.PORT || 9002;
app.listen(config.port);

console.log('Listening on port ' + config.port + '.....the server has started!!!');
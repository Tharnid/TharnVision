// required
var passport = require('passport'),
  mongoose = require('mongoose'),
  LocalStrategy = require('passport-local').Strategy,
  User = mongoose.model('User');

module.exports = function() {
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

// adding some middleware


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
}
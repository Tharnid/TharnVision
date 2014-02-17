var mongoose = require('mongoose'),
	// adding crypto
	crypto = require('crypto');

module.exports = function(config) {
	// connect to mongo env
	mongoose.connect(config.db);

	var db = mongoose.connection;

	db.on('error', console.error.bind(console, 'connection error...'));
	db.once('open', function callback() {
	  console.log('TharnVision db opened!!!');
	});

	// User schema
	var userSchema = mongoose.Schema({
		firstName: String,
		lastName: String,
		username: String,
		salt: String,
		hashed_pwd: String,
		// roles: [String]
	});

  userSchema.methods = {
    authenticate: function(passwordToMatch) {
      return hashPwd(this.salt, passwordToMatch) === this.hashed_pwd;
    }
  };

	var User = mongoose.model('User', userSchema);

	// Find a user
  User.find({}).exec(function(err, collection) {
    if(collection.length === 0) {
      var salt, hash;
      salt = createSalt();
      hash = hashPwd(salt, 'tharnid');
      User.create({firstName:'tharnid',lastName:'tharnid',username:'tharnid', salt: salt, hashed_pwd: hash}); // , salt: salt, hashed_pwd: hash, roles: ['admin']
      salt = createSalt();
      hash = hashPwd(salt, 'saldor');
      User.create({firstName:'saldor',lastName:'saldor',username:'saldor', salt: salt, hashed_pwd: hash}); // , salt: salt, hashed_pwd: hash, roles: []
      salt = createSalt();
      hash = hashPwd(salt, 'aragoth');
      User.create({firstName:'aragoth',lastName:'aragoth',username:'aragoth', salt: salt, hashed_pwd: hash}); // , salt: salt, hashed_pwd: hash
    }
  })
}

function createSalt() {
	return crypto.randomBytes(128).toString('base64');
}

function hashPwd(salt, pwd) {
	var hmac = crypto.createHmac('sha1', salt);
	return hmac.update(pwd).digest('hex');
}


var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');

var UserSchema = new mongoose.Schema({
	email: {
		type: String,
		index: true
	},
	password : {
		type: String
	}
});

var User = module.exports = mongoose.model('User', UserSchema);

module.exports.findUserByEmail = (email, callback) => {
	var query = {email: email};
	User.findOne(query, callback);
}

module.exports.comparePassword = (password, hash, callback) => {
	bcrypt.compare(password, hash, function(err, isMatch) {
		if(err) throw err;
		callback(null, isMatch);
	});
}

module.exports.findUserById = (id, callback)=>{
	User.findById(id, callback);
}
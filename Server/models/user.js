var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// set up a mongoose model
module.exports = mongoose.model('User', new Schema({ 
	username: String,
	name: String, 
	password: String, // will be hash
	publickey: String, // RSA public key 
	email: String,
	phone: String,
	admin: Boolean, // perhaps change to role
	friends: [String],
	devices: [String],
}));
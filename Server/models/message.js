var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// set up a mongoose model
module.exports = mongoose.model('Message', new Schema({ 
	to: String,
	from: String,
	message: String, // encrypted message
	time: { type : Date, default: Date.now },
	seen: Boolean,
}));
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// set up a mongoose model
module.exports = mongoose.model('Device', new Schema({ 
	name: String,
	fingerprint: String,
	enabled: Boolean,
}));
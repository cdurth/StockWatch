'use strict';

var User = require('../../models/user');

var admin = new User({
	name: 'Admin',
	password: 'password',
	admin: true
});

exports.createDemoUser = function (req, res) {
	User.findOne({
		name: admin.name
	}, function (err, user) {
		if (!user) {
			// create a sample user
			admin.save(function (err) {
				if (err) throw err;
				console.log('User saved successfully');
				res.json({ success: true, message: "admin user created"});
			});
		} else {
			console.log('user already exists');
			res.json({success: false, message: "admin user already exists"});
		}
	});
};

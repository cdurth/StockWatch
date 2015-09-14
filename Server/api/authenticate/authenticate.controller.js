'use strict';

var jwt    = require('jsonwebtoken');
var User   = require('../../models/user');

exports.authenticateUser = function(req, res) {
	console.log(req.body);
	// find the user
	User.findOne({
		name: req.body.name
	}, function(err, user) {
		
		if (err) throw err;

		if (!user) {
			res.json({ success: false, message: 'Authentication failed. User not found.' });
		} else if (user) {

			// check if password matches
			if (user.password != req.body.password) {
				res.json({ success: false, message: 'Authentication failed. Wrong password.' });
			} else {

				// if user is found and password is right
				// create a token
				var token = jwt.sign(user, req.app.get('superSecret'), {
					expiresInMinutes: 1440 // expires in 24 hours
				});

				res.json({
					success: true,
					message: 'Enjoy your token!',
					token: token
				});
			}		

		}

	});
};

exports.getUsers = function(req,res){
	User.find({}, function(err, users) {
    res.json(users);
  });
};

'use strict';

var express = require('express');
var controller = require('./authenticate.controller');

var router = express.Router();

router.post('/', controller.authenticateUser);
router.get('/users',controller.getUsers);

module.exports = router;

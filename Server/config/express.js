var express = require('express');
var jwt = require('jsonwebtoken');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

module.exports = function (app, config) {
  app.use(logger('dev'));
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());

  // middleware that protects all routes except the auth
  app.use(function (req, res, next) {
    
    if (req.url === '/api/setup') {
      // allow request to unprotected setup route
      next();
    }
    else if (req.url !== '/api/authenticate') {
      // check for token
      var token = req.body.token || req.query.token || req.headers['x-access-token'];
      console.log(token);
      // decode token
      if (token) {
  
        // verify token secret and expiration
        jwt.verify(token, req.app.get('superSecret'), function (err, decoded) {
          if (err) {
            return res.json({ success: false, message: 'Failed to authenticate token.' });
          } else {
            // if everything is good, save to request for use in other routes
            req.decoded = decoded;
            next();
          }
        });

      } else {
        // no token provided, return error 
        return res.status(403).send({
          success: false,
          message: 'No token provided.'
        });
      }
    } else {
      // allow request to unprotected auth route
      next();
    }
  });
  
  // CLEANER ERRORS
  if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
      res.status(err.status || 500);
      res.send('error', {
        message: err.message,
        error: err,
        title: 'error'
      });
    });
  }

  app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.send('error', {
      message: err.message,
      error: {},
      title: 'error'
    });
  });

};

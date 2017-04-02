'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
require("dotenv").config();
var express = require('express');
var router = express.Router();
var jwt = require('jwt-simple');
var User = require('../models/UserModel');
var bcrypt = require('bcrypt-nodejs');
var passport = require('passport');

// require our strategy from passport
require('../services/passport');

var signinStrategy = passport.authenticate('signinStrategy', { session: false });

function tokenForUser(user) {
  var timestamp = new Date().getTime();
  return jwt.encode({ userId: user.id, iat: timestamp }, process.env.SECRET);
}

router.post('/api/signin', signinStrategy, function (req, res, next) {
  res.json({ token: tokenForUser(req.user) });
});

router.post('/api/signup', function (req, res, next) {
  // get username and password from the request body
  var _req$body = req.body,
      username = _req$body.username,
      password = _req$body.password;

  //If no username or password, return an error

  if (!username || !password) {
    return res.status(422).json({ error: 'Oops! Please provide a user name and password.' });
  }

  // Query for a user with the provided user name
  User.findOne({ username: username }).exec().then(function (existingUser) {
    //if the provided user name already exists return error
    if (existingUser) {
      return res.status(422).json({ error: 'Oops! That user name already exists.' });
    }

    // If user does not exist, create user
    // bcrypt will hash the password
    bcrypt.genSalt(10, function (salt) {
      bcrypt.hash(password, salt, null, function (err, hashedPassword) {
        if (err) {
          return next(err);
        }
        // Create new user
        var newUser = new User({ username: username, password: hashedPassword });
        //Save and return the new user
        newUser.save().then(function (user) {
          return res.json({ token: tokenForUser(user) });
        });
      });
    });
  }).catch(function (err) {
    return next(err);
  });
});

exports.default = router;
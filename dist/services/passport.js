'use strict';

var bcrypt = require('bcrypt-nodejs');
var passport = require('passport');
var User = require('../models/UserModel');

var _require = require('passport-jwt'),
    JwtStrategy = _require.Strategy,
    ExtractJwt = _require.ExtractJwt;

var LocalStrategy = require('passport-local');

var signinStrategy = new LocalStrategy(function (username, password, done) {
  User.findOne({ username: username }).exec().then(function (user) {
    //If no user, call done with NULL argument and false signifying error
    if (!user) {
      return done(null, false);
    }

    bcrypt.compare(password, user.password, function (err, isMatch) {
      if (err) {
        return done(err, false);
      }
      //If password does not match call done with NULL and false
      if (!isMatch) {
        return done(null, false);
      }
      return done(null, user);
    });
  }).catch(function (err) {
    return done(err, false);
  });
});

// Setup JwtStrategy
var jwtOptions = {
  // Get secret from env
  secretOrKey: process.env.SECRET,
  // Tell strategy where to find token in request
  jwtFromRequest: ExtractJwt.fromHeader('authorization')
};

// Create JwtStrategy
// Accepts token and decodes it
var authStrategy = new JwtStrategy(jwtOptions, function (payload, done) {
  User.findById(payload.userId, function (err, user) {
    if (err) {
      return done(err, false);
    }

    if (user) {
      done(null, user);
    } else {
      done(null, false);
    }
  });
});

//Tell passport to use this strategy
passport.use('authStrategy', authStrategy);
passport.use('signinStrategy', signinStrategy);
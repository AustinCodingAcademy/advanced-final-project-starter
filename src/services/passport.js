const bcrypt = require('bcrypt-nodejs');
const passport = require('passport');
const User = require('../models/UserModel');
const { Strategy: JwtStrategy, ExtractJwt } = require('passport-jwt');
const LocalStrategy = require('passport-local');

const signinStrategy = new LocalStrategy(function(username, password, done) {
  User.findOne({ username: username }).exec()
    .then(user => {
      //If no user, call done with NULL argument and false signifying error
      if(!user) {
        return done(null, false);
      }

      bcrypt.compare(password, user.password, function(err, isMatch) {
        if(err) {
          return done(err, false);
        }
        //If password does not match call done with NULL and false
        if(!isMatch) {
          return done(null, false);
        }
        return done(null, user);
      });
    })
    .catch(err => done(err, false));
});

// Setup JwtStrategy
const jwtOptions = {
  // Get secret from env
  secretOrKey: process.env.SECRET,
  // Tell strategy where to find token in request
  jwtFromRequest: ExtractJwt.fromHeader('authorization')
};

// Create JwtStrategy
// Accepts token and decodes it
const authStrategy = new JwtStrategy(jwtOptions, function(payload, done) {
  User.findById(payload.userId, function(err, user) {
    if(err) { return done(err, false); }

    if(user) {
      done(null, user);
    } else {
      done(null, false);
    }
  });
});

//Tell passport to use this strategy
passport.use('authStrategy', authStrategy);
passport.use('signinStrategy', signinStrategy);

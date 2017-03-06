const bcrypt = require('bcrypt');
const passport = require('passport');
const User = require('../models/UserModel');
const { Strategy: JwtStrategy, ExtractJwt } = require('passport-jwt');
const LocalStrategy = require('passport-local');


const signinStrategy = new LocalStrategy(function (username, password, done) {
  User.findOne({ username }).exec()
    .then(user => {
      // If there is no user found, call done with a `null` argument, signifying
      // no error and `false` signifying that the signin failed
      if (!user) {
        return done(null, false);
      }

      bcrypt.compare(password, user.password, function (err, isMatch) {
        // If there is an error, call done with the error
        if (err) {
          return done(err, false);
        }

        // If the passwords do not match, call done with a `null` argument, signifying
        // no error and `false` signifying that the signin failed
        if (!isMatch) {
          return done(null, false);
        }

        // If there are no errors and the passwords match,
        // call done with a `null` argument, signifying no error
        // and with the now signed in user
        return done(null, user);
      });
    })
    .catch(err => done(err, false));
});


// Setup options for JwtStrategy
const jwtOptions = {
  // Get the secret from the environment
  secretOrKey: process.env.SECRET,
  // Tell the strategy where to find the token in the request
  jwtFromRequest: ExtractJwt.fromHeader('authorization')
};


// Create JWT strategy
// This will take the token and decode it to
// extract the information we have stored in it
const authStrategy = new JwtStrategy(jwtOptions, function (payload, done) {
  User.findById(payload.userId, function (err, user) {
    if (err) { return done(err, false); }

    if (user) {
      done(null, user);
    } else {
      done(null, false);
    }
  });
});


// Tell passport to use this strategy
passport.use('authStrategy', authStrategy);
passport.use('signinStrategy', signinStrategy);

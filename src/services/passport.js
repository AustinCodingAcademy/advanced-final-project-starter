import bcrypt from 'bcrypt-nodejs';
import passport from 'passport';
import User from '../models/UserModel';
import LocalStrategy from 'passport-local';
import {
  Strategy as JwtStrategy,
  ExtractJwt
} from 'passport-jwt';
require('dotenv').config();

const signinStrategy = new LocalStrategy((username, password, done) => {
  User.findOne({ username }).exec()
    .then(user => {
      // If there is no user found call done with 'null' argument, signifying no error
      // and 'false' signifying that the signin failed
      if (!user) {
        return done(null, false);
      }

      bcrypt.compare(password, user.password, (error, isMatch) => {
        // If there is an error, call done with error
        if (error) {
          return done(error, false);
        }

        // If the passwords don't match, call done with null (no error)
        // and 'false' (sign in failed)
        if (!isMatch) {
          return done(null, false);
        }

        // If no errors and the passwords match
        // call done with 'null' (no error)
        // and with the now signed in user
        return done(null, user);
      });
    })
    .catch(error => done(error, false));
});

// Setup options for JwtStrategy
const jwtOptions = {
  // Get the secret from our environment
  secretOrKey: process.env.SECRET,
  // Tell our strategy where to find our token in the request
  jwtFromRequest: ExtractJwt.fromHeader('authorization')
};

// Create JWT strategy
// This will take our token and decode it to
// extract the information we have stored in it
const authStrategy = new JwtStrategy(jwtOptions, (payload, done) => {
  User.findById(payload.userId, (error, user) => {
    if (error) { return done(error, false); }

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

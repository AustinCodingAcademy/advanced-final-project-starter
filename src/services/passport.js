require('dotenv').config();
import bcrypt from 'bcrypt';
import passport from 'passport';
import User from '../models/UserModel';
import {
  Strategy as JwtStrategy,
  ExtractJwt
} from 'passport-jwt';
import LocalStrategy from 'passport-local';

const signinStrategy = new LocalStrategy(function (username, password, done) {
  User.findOne({ username }).exec()
    .then(user => {
      if (!user) {
        return done(null, false);
      }

      bcrypt.compare(password, user.password, function (error, isMatch) {
        if (error) {
          return done(error, false);
        }

        if (!isMatch) {
          return done(null, false);
        }

        return done(null, user);
      });
    })

    .catch(error => done(error, false));
});

const jwtOptions = {
  secretOrKey: process.env.SECRET,
  jwtFromRequest: ExtractJwt.fromHeader('authorization')
};

const authStrategy = new JwtStrategy(jwtOptions, function (payload, done) {
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

passport.use('signinStrategy', signinStrategy);
passport.use('authStrategy', authStrategy);

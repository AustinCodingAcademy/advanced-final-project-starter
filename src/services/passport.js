import bcrypt from 'bcrypt';
import passport from 'passport';
import User from '../models/UserModel';
import {
  Strategy as JwtStrategy,
  ExtractJwt
} from 'passport-jwt';
import LocalStrategy from 'passport-local';
require('dotenv').config();

const signinStrategy = new LocalStrategy((username, password, done) => {
  User.findOne({ username }).exec()
    .then(user => {
      if (!user) {
        return done(null, false);
      }

      bcrypt.compare(password, user.password, (err, isMatch) => {

        if (err) {
          return done(err, false);
        }

        if (!isMatch) {
          return done(null, false);
        }

        return done(null, user);
      });
    })
    .catch(err => done(err, false));
});

const jwtOptions = {
  secretOrKey: process.env.SECRET,
  jwtFromRequest: ExtractJwt.fromHeader('authorization')
};

const authStrategy = new JwtStrategy(jwtOptions, (payload, done) => {
  User.findById(payload.userId, (err, user) => {
    if (err) { return done(err, false); }

    if (user) {
      done(null, user);
    } else {
      done(null, false);
    }
  });
});

passport.use('authStrategy', authStrategy);
passport.use('signinStrategy', signinStrategy);

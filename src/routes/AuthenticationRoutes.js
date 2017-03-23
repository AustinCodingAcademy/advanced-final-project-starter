import express from 'express';
const router = express.Router();
import jwt from 'jwt-simple';
import User from '../models/UserModel';
import bcrypt from 'bcrypt';
import passport from 'passport';
import '../services/passport';

const signinStrategy = passport.authenticate('signinStrategy', { session: false });

function tokenForUser(user) {
  const timestamp = new Date().getTime();
  return jwt.encode({ userId: user.id, iat: timestamp }, process.env.SECRET);
}

router.post('/api/signin', (request, response) => {
  response.json({ message: 'You\'ve been authenticated!'});
});

router.post('/api/signup', signinStrategy, (request, response, next) => {
  const {username, password} = request.body;

  if (!username || !password) {
    return response.status(422)
      .json({error: 'You must enter a username and/or password'});
  }

  User.findOne({ username }).exec()
    .then(existingUser => {
      if (existingUser) {
        return response.status(422).json({ error: 'Username is in use' });
      }

      bcrypt.hash(password, 10, (err, hashedPassword) => {
        if (err) {
          return next(err);
        }

        const newUser = new User({ username, password: hashedPassword });

        newUser.save()
          .then(user => response.json({token: tokenForUser(user)}));
      });
    })
    .catch(err => next(err));
});

export default router;

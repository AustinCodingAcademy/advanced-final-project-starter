const express = require('express');
const router = express.Router();
const jwt = require('jwt-simple');
const User = require('../models/UserModel');
const bcrypt = require('bcrypt-nodejs');
const passport = require('passport');

// require our strategy from passport
require('../services/passport');

const signinStrategy = passport.authenticate('signinStrategy', { session: false });

function tokenForUser(user) {
  const timestamp = new Date().getTime();
  return jwt.encode({ userId: user.id, iat: timestamp }, process.env.SECRET);
}

router.post('/api/signin', signinStrategy, function(req, res, next) {
  res.json({ token: tokenForUser(req.user)});
});

router.post('/api/signup', function(req, res, next) {
  // get username and password from the request body
  const { username, password } = req.body;

  //If no username or password, return an error
  if (!username || !password) {
    return res.status(422)
    .json({ error: 'Oops! Please provide a user name and password.'});
  }

  // Query for a user with the provided user name
  User.findOne({ username }).exec()
    .then((existingUser) => {
      //if the provided user name already exists return error
      if(existingUser) {
        return res.status(422).json({ error: 'Oops! That user name already exists.'});
      }

      // If user does not exist, create user
      // bcrypt will hash the password
      bcrypt.getSalt(10, function(salt) {
        bcrypt.hash(password, salt, null,  function(err, hashedPassword) {
          if(err) {
            return next(err);
          }
          // Create new user
          const newUser = new User({ username, password: hashedPassword });
          //Save and return the new user
          newUser.save()
            .then(user => res.json({ token: tokenForUser(user) }));
        });
      });
    })
    .catch(err => next(err));
});

export default router;

const express = require('express');
const router = express.Router();
const jwt = require('jwt-simple');
const User = require('../models/UserModel');
const bcrypt = require('bcrypt');
const passport = require('passport');


// Require our custom strategies
require('../services/passport');


// Authentication
const signinStrategy = passport.authenticate('signinStrategy', { session: false});


// Helper method to create token for a user
function tokenForUser(user) {
  const timestamp = new Date().getTime();
  return jwt.encode({ userId: user.id, iat: timestamp }, process.env.SECRET);
}


/* eslint no-unused-vars: 0 */
router.post('/api/signin', signinStrategy, function (req, res, next) {
  res.json({ token: tokenForUser(req.user)});
});


router.post('/api/signup', function (req, res, next) {
  // Grab the username and password from the request body
  const { username, password } = req.body;

  // If no username or password was supplied return an error
  if (!username || !password) {
    return res.status(422)
      .json({ error: 'You must provide a username and password' });
  }

  // Look for a user with the current user name
  User.findOne({ username }).exec()
    .then((existingUser) => {
      // If the user exists, return an error on sign up
      if (existingUser) {
        return res.status(422).json({ error: 'Username is in use' });
      }

      // If the user does not exist, create the user
      // Use bcrypt to hash their password (Never save plain text passwords!)
      bcrypt.hash(password, 10, function (err, hashedPassword) {
        if (err) {
          return next(err);
        }

        // Create a new user with the supplied username and the hashed password
        const user = new User({ username, password: hashedPassword });

        // Save and return the user
        user.save()
          .then(newUser => res.json({ token: tokenForUser(newUser) }));
      });
    })
    .catch(err => next(err));
});


module.exports = router;

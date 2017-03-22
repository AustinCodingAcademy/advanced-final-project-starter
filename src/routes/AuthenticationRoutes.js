import express from 'express';
const router = express.Router();
import User from '../models/UserModel';
import bcrypt from 'bcrypt-nodejs';

router.post('/api/signup', (request, response, next) => {
  // Grab the username and password from our request body

  const { username, password } = request.body;
  // If no username or password was supplied, return an error

  if (!username || !password) {
    return response.status(422)
    .json({ error: 'You must provide a username and password' });
  }

  // Look for a user with the current username

  User.findOne({ username }).exec()
    .then((existingUser) => {
      // If the user exists, return an error on signup
      if (existingUser) {
        return response.status(422).json({ error: 'Username is in use'});
      }

      // If the user does not exist create the user
      // Use bcrypt to hash their password so we don't save plain text passwords
      bcrypt.genSalt(10, (salt) => {
        bcrypt.hash(password, salt, null, (error, hashedPassword) => {
          if (error) {
            return next(error);
          }

          // Create a new user with the supplied username and the hashed password
          const newUser = new User({ username, password: hashedPassword });

          // Save and return the user
          newUser.save()
            .then(user => response.json(user));

        });
      });
    })
    .catch(error => next(error));
});

export default router;

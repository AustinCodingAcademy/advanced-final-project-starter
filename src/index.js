// dotenv allows us to declare environment variables in a .env file, \
// find out more here https://github.com/motdotla/dotenv
require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const passport = require('passport');
import ListRoutes from './routes/ListRoutes';
import ListItemRoutes from './routes/ListItemRoutes';


// Require our custom strategies
require('./services/passport');


/* eslint no-console: 0 */
mongoose.Promise = global.Promise;
mongoose
  .connect('mongodb://localhost/advanced-final-project-starter')
  .then(() => console.log('[mongoose] Connected to MongoDB'))
  .catch(() => console.log('[mongoose] Error connecting to MongoDB'));

const app = express();

const authenticationRoutes = require('./routes/AuthenticationRoutes');

app.use(bodyParser.json());
app.use(authenticationRoutes);

const authStrategy = passport.authenticate('authStrategy', { session: false });

app.use(authStrategy, ListRoutes);
app.use(authStrategy, ListItemRoutes);
// Applied middleware to routes, and all ListRoutes will be protected by authStrategy.
// This means a user will not have access unless they are logged into the application.

/* eslint no-unused-vars: 0 */
app.get('/api/secret', authStrategy, function (req, res, next) {
  res.send(`The current user is ${req.user.username}`);
});


const port = process.env.PORT || 3001;

app.listen(port, () => {
  console.log(`Listening on port:${port}`);
});

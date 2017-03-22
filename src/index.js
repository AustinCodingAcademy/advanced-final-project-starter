// dotenv allows us to declare environment variables in a .env file, \
// find out more here https://github.com/motdotla/dotenv
require('dotenv').config();
import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import passport from 'passport';
import './services/passport';

mongoose.Promise = global.Promise;
mongoose
  .connect('mongodb://localhost/todo-list-app')
  .then(() => console.log('[mongoose] Connected to MongoDB'))
  .catch(() => console.log('[mongoose] Error connecting to MongoDB'));

const app = express();

import authenticationRoutes from './routes/AuthenticationRoutes';

app.use(bodyParser.json());
app.use(authenticationRoutes);

const authStrategy = passport.authenticate('authStrategy', { session: false });

app.get('/api/secret', authStrategy, (request, response, next) => {
  response.send(`The current user is ${request.user.username}`);
});

const port = process.env.PORT || 3001;

app.listen(port, () => {
  console.log(`Listening on port:${port}`);
});

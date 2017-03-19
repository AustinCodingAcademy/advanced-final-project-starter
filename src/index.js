// dotenv allows us to declare environment variables in a .env file, \
// find out more here https://github.com/motdotla/dotenv
require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const passport = require("passport");
import AuthenticationRoutes from './routes/AuthenticationRoutes';
import GameRoutes from './routes/GameRoutes';

mongoose.Promise = global.Promise;
mongoose
  .connect("mongodb://localhost/movie-memory")
  .then(() => console.log("[mongoose] Connected to MongoDB"))
  .catch(() => console.log("[mongoose] Error connecting to MongoDB"));

const app = express();

//const authenticationRoutes = require("./routes/AuthenticationRoutes");

app.use(bodyParser.json());
app.use(AuthenticationRoutes);
app.use(GameRoutes);

const authStrategy = passport.authenticate('authStrategy', { session: false});

app.get('/api/secret', authStrategy, function(req, res, next) {
  res.send(`The current user is ${req.user.username}`);
})

const port = process.env.PORT || 3001;
app.listen(port, () => console.log(`Listening on port:${port}`));

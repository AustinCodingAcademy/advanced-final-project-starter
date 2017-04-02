// dotenv allows us to declare environment variables in a .env file, \
// find out more here https://github.com/motdotla/dotenv
require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const passport = require("passport");
import AuthenticationRoutes from './routes/AuthenticationRoutes';


mongoose.Promise = global.Promise;
const MONGODB_URI = process.env.MONGODB_URI;
mongoose
  .connect(MONGODB_URI)
  .then(() => console.log("[mongoose] Connected to MongoDB"))
  .catch(() => console.log("[mongoose] Error connecting to MongoDB"));

const app = express();

app.use(express.static('public'));

app.get('/', (req, res, next) => {
  res.sendFile('public/index.html');
});

//const authenticationRoutes = require("./routes/AuthenticationRoutes");

app.use(bodyParser.json());
app.use(AuthenticationRoutes);

const authStrategy = passport.authenticate('authStrategy', { session: false});
import GameRoutes from './routes/GameRoutes';

app.use(authStrategy, GameRoutes);

app.get('/api/secret', authStrategy, function(req, res, next) {
  res.send(`The current user is ${req.user.username}`);
})

const port = process.env.PORT || 3001;
app.listen(port, () => console.log(`Listening on port:${port}`));

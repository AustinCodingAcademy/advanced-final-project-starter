"use strict";

var _AuthenticationRoutes = require("./routes/AuthenticationRoutes");

var _AuthenticationRoutes2 = _interopRequireDefault(_AuthenticationRoutes);

var _GameRoutes = require("./routes/GameRoutes");

var _GameRoutes2 = _interopRequireDefault(_GameRoutes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// dotenv allows us to declare environment variables in a .env file, \
// find out more here https://github.com/motdotla/dotenv
require("dotenv").config();
var express = require("express");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var passport = require("passport");


mongoose.Promise = global.Promise;
var MONGODB_URI = process.env.MONGODB_URI;
mongoose.connect(MONGODB_URI).then(function () {
  return console.log("[mongoose] Connected to MongoDB");
}).catch(function () {
  return console.log("[mongoose] Error connecting to MongoDB");
});

var app = express();

app.use(express.static('public'));

app.get('/', function (req, res, next) {
  res.sendFile('public/index.html');
});

//const authenticationRoutes = require("./routes/AuthenticationRoutes");

app.use(bodyParser.json());
app.use(_AuthenticationRoutes2.default);

var authStrategy = passport.authenticate('authStrategy', { session: false });


app.use(authStrategy, _GameRoutes2.default);

app.get('/api/secret', authStrategy, function (req, res, next) {
  res.send("The current user is " + req.user.username);
});

var port = process.env.PORT || 3001;
app.listen(port, function () {
  return console.log("Listening on port:" + port);
});
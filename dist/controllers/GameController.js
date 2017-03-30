'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _GameModel = require('../models/GameModel');

var _GameModel2 = _interopRequireDefault(_GameModel);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var gameController = {};

gameController.list = function (request, response, next) {
  _GameModel2.default.find({ owner: request.user._id }).exec().then(function (game) {
    return response.json(game);
  }).catch(function (err) {
    return next(err);
  });
};

gameController.show = function (request, response, next) {
  _GameModel2.default.findById(request.params._id).exec().then(function (game) {
    return response.json(game);
  }).catch(function (err) {
    return next(err);
  });
};

gameController.create = function (request, response, next) {
  var GAME = new _GameModel2.default({
    owner: request.user._id,
    name: request.body.name,
    game: request.body.game
  });
  console.log('trying to save', GAME);
  GAME.save().then(function (newGame) {
    return response.json(newGame);
  }).catch(function (err) {
    return next(err);
  });
};

gameController.update = function (request, response, next) {
  _GameModel2.default.findById(request.params._id).exec().then(function (game) {
    game.owner = game.owner;
    game.name = request.body.name || game.name;
    game.game = request.body.game || game.game;

    return game.save();
  }).then(function (game) {
    return response.json(game);
  }).catch(function (err) {
    return next(err);
  });
};

gameController.remove = function (request, response, next) {
  _GameModel2.default.findByIdAndRemove(request.params._id).exec().then(function (game) {
    return response.json(game);
  }).catch(function (err) {
    return next(err);
  });
};

exports.default = gameController;
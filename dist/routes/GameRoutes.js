'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _GameController = require('../controllers/GameController');

var _GameController2 = _interopRequireDefault(_GameController);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

router.get('/api/movie-games', _GameController2.default.list);
router.get('/api/movie-games/:_id', _GameController2.default.show);
router.post('/api/movie-games', _GameController2.default.create);
router.put('/api/movie-games/:_id', _GameController2.default.update);
router.delete('/api/movie-games/:_id', _GameController2.default.remove);

exports.default = router;
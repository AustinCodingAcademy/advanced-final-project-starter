'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var gameSchema = new _mongoose2.default.Schema({
  'owner': {
    required: true,
    type: _mongoose2.default.Schema.Types.ObjectId
  },
  'name': {
    required: true,
    type: String
  },
  'game': {
    required: true,
    type: Array
  }
});

exports.default = _mongoose2.default.model('movie-game', gameSchema);
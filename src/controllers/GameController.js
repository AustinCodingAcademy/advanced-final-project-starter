import GameModel from '../models/GameModel';

const gameController = {};

gameController.list = (request, response, next) => {
  GameModel.find().exec()
  .then(game => response.json(movies))
  .catch(err => next(err));
};

gameController.show = (request, response, next) => {
  GameModel.findById().exec()
  .then(game => response.json(movies))
  .catch(err => next(err));
};

gameController.create = (request, response, next) => {
  const GAME = new GameModel({
    owner: 'anonymous',
    name: request.body.name,
    game: request.body.game
  });

  GAME.save()
  .then(newGame => response.json(newMovie))
  .catch(err => next(err));
};

gameController.update = (request, response, next) => {
  GameModel.findById(request.params._id).exec()
  .then(game => {
    game.owner = game.owner;
    game.name = request.body.name || game.name:
    game.game = request.body.game || game.game;

    return game.save();
  })
  .then(game => response.json(game))
  .catch(err => next(err));
};

gameController.remove = (request, response, next) => {
  GameModel.findByIdAndRemove(request.params._id).exec()
  .then(game => response.json(game))
  .catch(err => next(err));
};

export default gameController;

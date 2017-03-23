import express from 'express';
import GameController from '../controllers/GameController';

const router = express.Router();

router.get('/api/movie-games', GameController.list);
router.get('/api/movie-games/:_id', GameController.show);
router.post('/api/movie-games', GameController.create);
router.put('/api/movie-games/:_id', GameController.update);
router.delete('/api/movie-games/:_id', GameController.remove);

export default router;

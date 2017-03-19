import express from 'express';
import GameController from '../controllers/GameController';

const router = express.Router();

router.get('/games', GameController.list);
router.get('/games/:_id', GameController.show);
router.post('/games', GameController.create);
router.put('/games/:_id', GameController.update);
router.delete('/games/:_id', GameController.update);

export default router;

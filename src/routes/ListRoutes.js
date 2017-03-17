import express from 'express';
import { create, update } from '../controllers/ListsController';


const router = express.Router();


router.post('/lists', create);


router.put('/lists/:id', update);


export default router;

import express from 'express';
import { create, update } from '../controllers/ListsItemsController';


const router = express.Router();


router.post('/lists/:list_id/items', create);


router.put('/lists/:list_id/items/:item_id', update);


export default router;

import express from 'express';
import ListsItemsController from '../controllers/ListsItemsController';
const router = express.Router();


// Declare GET routes.
router.get('/lists', ListsItemsController.list);

router.get('/lists/:list_id/items', ListsItemsController.show);


// Declare a POST (create) route.
router.post('/lists/:list_id/items', ListsItemsController.create);


// Declare a PUT (update) route.
router.put('/lists/:list_id/items/:item_id', ListsItemsController.update);


// Declare a DELETE (remove) route.
router.delete('/lists/:list_id/items/:item_id', ListsItemsController.remove);


export default router;

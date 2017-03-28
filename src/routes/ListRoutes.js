import express from 'express';
import ListController from '../controllers/ListsController';
const router = express.Router();


// Declare GET routes.
router.get('/lists', ListController.list);

router.get('/lists/:list_id', ListController.show);


// Declare a POST (create) route.
router.post('/lists', ListController.create);


// Declare a PUT (update) route.
router.put('/lists/:id', ListController.update);


// Declare a DELETE (remove) route.
router.delete('/lists/:id', ListController.remove);


export default router;

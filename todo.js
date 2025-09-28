import express from 'express'; 
import auth from '../middleware/auth.js'; 
import * as todoController from '../controllers/todoController.js';

const router = express.Router();

router.use(auth); // protect all todo routes

router.post('/', todoController.createTodo); 
router.get('/', todoController.getTodos); 
router.get('/:id', todoController.getTodoById); 
router.put('/:id', todoController.updateTodo); 
router.delete('/:id', todoController.deleteTodo);

export default router;
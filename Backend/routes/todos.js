import { express } from 'express';
const Router = express.Router();

import {
    getAllTodos,
    getTodoById,
    createTodo,
    updateTodo,
    deleteTodo
} from '../controllers/todos.js';

Router.get('/todos', getAllTodos);
Router.get('/todos/:id', getTodoById);
Router.post('/todos', createTodo);
Router.put('/todos/:id', updateTodo);
Router.delete('/todos/:id', deleteTodo);



export { Router as todosRouter };

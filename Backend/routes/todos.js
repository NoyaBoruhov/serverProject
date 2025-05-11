import  express  from 'express';
const Router = express.Router();

import {
    getAllTodos,
    getTodoById,
    createTodo,
    updateTodo,
    deleteTodo
} from '../controllers/todos.js';

Router.get('/', getAllTodos);
Router.get('/:id', getTodoById);
Router.post('', createTodo);
Router.put('/:id', updateTodo);
Router.delete('/:id', deleteTodo);



export { Router as todosRouter };

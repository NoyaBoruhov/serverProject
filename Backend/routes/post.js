import {express} from 'express';
const Router = express.Router();
import {
    getAllTodos,
    getTodoById,
    createTodo,
    updateTodo,
    deleteTodo
} from '../controllers/post.js';

Router.get('/posts', getAllTodos);
Router.get('/posts/:id', getTodoById);
Router.post('/posts', createTodo);
Router.put('/posts/:id', updateTodo);
Router.delete('/posts/:id', deleteTodo);


export{Router as todosRouter};


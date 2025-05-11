import  express  from 'express';
const Router = express.Router();
import {
    getAllComments,
    getCommentById,
    createComment,
    updateComment,
    deleteComment
} from '../controllers/comments.js';

Router.get('/', getAllComments);
Router.get('/:id', getCommentById);
Router.post('', createComment);
Router.put('/:id', updateComment);
Router.delete('/:id', deleteComment);


export { Router as commentRouter };




import {express} from 'express';
const Router=express.Router();
import {
    getAllComments,
    getCommentById,
    createComment,
    updateComment,
    deleteComment
} from '../controllers/comments.js';

Router.get('/comments', getAllComments);
Router.get('/comments/:id', getCommentById);
Router.post('/comments', createComment);
Router.put('/comments/:id', updateComment);
Router.delete('/comments/:id', deleteComment);


export{Router as userRouter};
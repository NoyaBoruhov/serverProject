import  express  from 'express';
const Router = express.Router();
import {
    getAllPosts,
    getPostById,
    createPost,
    updatePost,
    deletePost
} from '../controllers/post.js';

Router.get('/', getAllPosts);
Router.get('/:id', getPostById);
Router.post('', createPost);
Router.put('/:id', updatePost);
Router.delete('/:id', deletePost);


export { Router as postRouter };

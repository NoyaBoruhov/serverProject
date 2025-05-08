import {express} from 'express';
const Router=express.Router();
import {
    getAllPosts,
    getPostById,
    createPost,
    updatePost,
    deletePost
} from '../controllers/post.js';

Router.get('/posts', getAllPosts);
Router.get('/posts/:id', getPostById);
Router.post('/posts', createPost);
Router.put('/posts/:id', updatePost);
Router.delete('/posts/:id', deletePost);


export{Router as userRouter};

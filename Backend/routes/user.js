
import {express} from 'express';

const Router=express.Router();
import {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser
} from '../controllers/user.js';

Router.get('/users', getAllUsers);
Router.get('/users/:id', getUserById);
Router.post('/users', createUser);
Router.put('/users/:id', updateUser);
Router.delete('/users/:id', deleteUser);


export{Router as userRouter};
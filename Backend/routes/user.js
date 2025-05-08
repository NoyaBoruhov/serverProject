
import express from 'express';

const Router = express.Router();
import {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser
} from '../controllers/user.js';

Router.get('/', getAllUsers);
Router.get('/:id', getUserById);
Router.post('', createUser);
Router.put('/:id', updateUser);
Router.delete('/:id', deleteUser);


export { Router as userRouter };
import {
    QueryListOfUsers,
    QueryUserById,
    QueryCreateUser,
    QueryUpdateUser,
    QueryDeleteUser
} from '../service/users.js';

export const getAllUsers = async (req, res) => {
    const users = await QueryListOfUsers();
    res.send(users);
}

export const getUserById = async (req, res) => {
    const user = await QueryUserById(req.params.id);
    res.send(user);
}

export const createUser = async (req, res) => {
    const user = await QueryCreateUser(req.body);
    res.send(user);
}

export const updateUser = async (req, res) => {
    const user = await QueryUpdateUser(req.params.id, req.body);
    res.send(user);
}

export const deleteUser = async (req, res) => {
    const user = await QueryDeleteUser(req.params.id);
    res.send(user);
}


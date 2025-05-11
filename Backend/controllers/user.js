import {
    QueryListOfUsers,
    QueryUserById,
    QueryCreateUser,
    QueryUpdateUser,
    QueryDeleteUser
} from '../service/user.js';

export const getAllUsers = async (req, res) => {
    const users = await QueryListOfUsers();
    res.status(200).json(users);
    // res.send(users);
}

export const getUserById = async (req, res) => {
    const user = await QueryUserById(req.params.id);
    res.send(user);
}

export const createUser = async (req, res) => {
    const user = await QueryCreateUser(req.body,res);
    res.status(200).json(user);
    // res.send(user);
}

export const updateUser = async (req, res) => {
    try {
        const user = await QueryUpdateUser(req.params.id, req.body); // קריאה לפונקציה לעדכון משתמש
        res.status(200).json({ message: 'User updated successfully', data: user }); // החזרת התוצאה
    } catch (err) {
        res.status(500).json({ error: 'Error updating user: ' + err.message }); // טיפול בשגיאה במקרה של כישלון
    }
};


export const deleteUser = async (req, res) => {
    const user = await QueryDeleteUser(req.params.id);
    res.status(200).json(user);

    // res.send(user);
}


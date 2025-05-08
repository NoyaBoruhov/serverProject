import{
    getAllTodos,
    getTodoById,
    createTodo,
    updateTodo,
    deleteTodo
} from '../service/todos.js';

export const getAllTodos = async (req, res) => {
    const todos = await getAllTodos(req.body);
    res.send(todos);
}

export const getTodoById = async (req, res) => {
    const todo = await getTodoById(req.params.id);
    res.send(todo);
}

export const createTodo = async (req, res) => {
    const todo = await createTodo(req.body);
    res.send(todo);
}

export const updateTodo = async (req, res) => {
    const todo = await updateTodo(req.params.id, req.body);
    res.send(todo);

}

export const deleteTodo = async (req, res) => {
    const todo = await deleteTodo(req.params.id);
    res.send(todo);
}


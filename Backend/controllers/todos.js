import{
    QueryListOfTodos,
    QueryTodoById,
    QueryCreateTodo,
    QueryUpdateTodo,
    QueryDeleteTodo
} from '../service/todos.js';

export const getAllTodos = async (req, res) => {
    const todos = await QueryListOfTodos();
        res.send(todos);
}

export const getTodoById = async (req, res) => {
    const todo = await QueryTodoById(req.params.id);
    // res.send(todo);
    res.status(200).json(todo);

}

export const createTodo = async (req, res) => {
    const todo = await QueryCreateTodo(req.body);
    res.send(todo);
}

export const updateTodo = async (req, res) => {
    const todo = await QueryUpdateTodo(req.params.id, req.body);
    res.send(todo);

}

export const deleteTodo = async (req, res) => {
    const todo = await QueryDeleteTodo(req.params.id);
    res.send(todo);
}


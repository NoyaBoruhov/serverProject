import { dataConfig } from "../data";
export const AddTodo = async (todo) => {
    try {

        const response = await fetch(dataConfig.baseUrl + 'todos', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(todo),
        });
        if (!response.ok) {
            throw new Error('Failed to check user');
        }
        return await response.json();
    } catch (error) {
        throw error;
    }
}
export const updateAttribute = async (attribute,id) => {
    try {
        const response = await fetch(dataConfig.baseUrl + `todos/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(attribute)
        });
        if (!response.ok) {
            throw new Error('Failed to update todo details');
        }
       return await response.json();
    } catch (error) {
        throw error;
    }
}
export const getTodosByUserId = async (userId) => {
    try {
        const response = await fetch(dataConfig.baseUrl + `todos?userId=${userId}`);
        if (!response.ok) {
            throw new Error('Failed to fetch todos');
        }
        return await response.json();
    }
    catch (error) 
    {
        throw error;
    }
}
export const getAllTodos = async () => {
    try {
        const response = await fetch(dataConfig.baseUrl + 'todos');
        if (!response.ok) {
            throw new Error('Failed to fetch todos');
        }
        return await response.json();
    }
    catch (error) {
        throw error;
    }
}
export const DeleteTodo = async (todoId) => {
    try {
        const response = await fetch(dataConfig.baseUrl + `todos/${todoId}`, {
            method: 'DELETE',
        });
        if (!response.ok) {
            throw new Error('Failed to delete todo');
        }
        return await response.json();
    }
    catch (error) {
        throw error;
    }
    
}
import React, { useState } from 'react';
import { useUserContext } from './UseContext';
import { AddTodo, updateAttribute } from '../JS/service/todo'; 
function AddUpdateTodo({allTodos,setAllTodos,setTodos, setShowAddUpdateTodo, todo }) {
    const [errorMessage, setErrorMessage] = useState('');
    const { currentUser } = useUserContext();
    const [todoUpdate, setTodoUpdate] = useState({ title: todo?.title ||""});
    const handleSubmit=async (e)=>
    {        e.preventDefault();
        const todoToAdd = {
            id:allTodos.length>0 ? (Number(allTodos[allTodos.length-1].id) +1).toString():"1",
            userId: currentUser.id,
            title: e.target.title.value,
            completed: false
        }
        try {
            const data =todo? await updateAttribute(todoUpdate,todo.id):await AddTodo(todoToAdd);
            setTodos((prevTodos) => todo?prevTodos.map((todo) => (todo.id === data.id ? { ...todo, ...data } : todo)):[...prevTodos,data]);
            setErrorMessage('');
            setAllTodos((prevTodos) => todo?prevTodos.map((todo) => (todo.id === data.id ? { ...todo, ...data } : todo)):[...prevTodos,data]);
        } catch (error) {
            console.error('Error checking user:', error);
            setErrorMessage('שגיאה בבדיקת עדכון המשימה.');
        }
        cancel();
    }
    const cancel = () => {
        setShowAddUpdateTodo(false);
    }

    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor="title">כותרת</label>
            <input type="text" id="title" name="title" value={todoUpdate.title || ""} onChange={(e) => setTodoUpdate({title: e.target.value })} />
            <button type="submit">{todo ? "עדכן" : "הוסף"}</button>
            <button type="button" onClick={cancel}>ביטול</button>
            {errorMessage && <p>{errorMessage}</p>}
        </form>
    );
}
export default AddUpdateTodo;
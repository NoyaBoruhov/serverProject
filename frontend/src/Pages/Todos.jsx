import React, { useState, useEffect } from 'react';
import { dataConfig } from '../JS/data';
import { useUserContext } from '../Components/UseContext';
import SortSearchTodos from '../Components/SortSearchTodos';
import AddUpdateTodo from '../Components/AddUpdateTodo';
import { getTodosByUserId, updateAttribute ,getAllTodos,DeleteTodo} from '../JS/service/todo';
function Todos() {
    const [sortOption, setSortOption] = useState('id'); // ברירת מחדל: מספר מזהה
    const [searchTerm, setSearchTerm] = useState({ type: '', value: '' });
    const { currentUser } = useUserContext();
    const [todos, setTodos] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [showAddUpdateTodo, setShowAddUpdateTodo] = useState(0);
    const [todoUpdate, setTodoUpdate] = useState(null);
    const [allTodos, setAllTodos] = useState([]);
    const UpdateCompletd = async (id, currentStatus) => {
        const updateData = { completed: !currentStatus }
        try {
            const data = await updateAttribute(updateData, id);
            setTodos((prevTodos) =>
                prevTodos.map((todo) => (todo.id === id ? { ...todo, ...data } : todo)));
        } catch (error) {
            console.error('Error updating todo details:', error);
        }
    }

    const bringTodos = async () => {
        try {
            const existingTodos = await getTodosByUserId(currentUser.id);
            if (existingTodos.length === 0) {
                setErrorMessage("todo doesnt  exists. Please add todo.")
            }
            setTodos(existingTodos);
            const allTodos = await getAllTodos();
            setAllTodos(allTodos);
            setErrorMessage('');
        }
        catch (error) {
            console.error('לא נמצאה רשימת המשתמשים', error);
        }
    }
    useEffect(() => {
        bringTodos()
    }, []);
    useEffect(() => {
        if (!showAddUpdateTodo>0 && todos.length == 0) {
            setErrorMessage("todo doesnt  exists. Please add todo.")
        }
        else {
            setErrorMessage('')
        }
    }, [showAddUpdateTodo, todos]);
    const deleteTodo = async (id) => {
        try {
            // שולחים בקשת מחיקה לשרת
            const response = await DeleteTodo(id);
            // בודקים אם הבקשה הצליחה
            if (todos.length === 1) {
                setErrorMessage("todo doesnt  exists. Please add todo.")
            }
            // מעדכנים את ה-state כדי להסיר את המשימה
            setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
        } catch (error) {
            console.error('Error deleting todo:', error); // טיפול בשגיאות
        }
    };

    useEffect(() => {

        const sortedTodos = todos.filter(x => !searchTerm.type ||
            searchTerm.type == 'alphabetical' && x.title.includes(searchTerm.value) ||
            x[searchTerm.type] == searchTerm.value)

        switch (sortOption) {
            case 'random': {
                sortedTodos.sort(() => Math.random() - 0.5);
                break;
            }
            case 'alphabetical': {
                sortedTodos.sort((a, b) => a.title.localeCompare(b.title));
                break;
            }
            default: sortedTodos.sort((a, b) => a[sortOption] - b[sortOption]);
        }
        setSearchResults(sortedTodos)
    }, [todos, sortOption, searchTerm])

    return (
        <div>
            <div>
                <SortSearchTodos sortOption={sortOption} handleSortChange={setSortOption} setSearch={setSearchTerm} />
            </div>
            <button onClick={() => setShowAddUpdateTodo(1)} >הוספת משימה</button>
            <ul>
                {
                    searchResults.map((todo, index) => (
                        <li key={index} style={{ direction: "rtl", textAlign: "right", fontSize: "20px" }}>
                            <input type="checkbox" checked={todo.completed}
                                onChange={() => { UpdateCompletd(todo.id, todo.completed) }}
                            />
                            {todo.id} -- {todo.title}
                            <button onClick={() => deleteTodo(todo.id)}>מחק</button>
                            <button onClick={() => { setTodoUpdate(todo); setShowAddUpdateTodo(2); }}>עדכן</button>
                        </li>
                    ))}
            </ul>
            {showAddUpdateTodo>0? <AddUpdateTodo todos={todos} allTodos={allTodos} setAllTodos={setAllTodos} setTodos={setTodos} setShowAddUpdateTodo={setShowAddUpdateTodo} todo={showAddUpdateTodo==2?todoUpdate:null}/>:null}
            {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}

        </div>

    )

}
export default Todos;

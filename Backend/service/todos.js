import { con } from "../../database/DB.js";

export const QueryListOfTodos = () => {
    con.query("SELECT * FROM todos", (err, result) => {
        if (err) throw err;
        console.log(result);
        return result;
    });
};

// export const QueryCreateTodo = (todo) => {
//     con.query("Insert INTO todos SET ?", [todo], (err, result) => {
//         if (err) throw err;
//         console.log(result);
//     });
// };


export const QueryCreateTodo = (todo, res) => {
    const { userId, title, completed } = todo;
    con.query("INSERT INTO todos SET userId = ?, title = ?, completed = ?", [userId, title, completed], (err, result) => {
        if (err) {
            console.log(err);
            return res.status(400).json({ error: 'An error occurred while creating the todo' });
        }
        console.log(result);
        return result;
    });
}
export const QueryDeleteTodo = (id) => {
    con.query("DELETE FROM todos WHERE id = ?", [id], (err, result) => {
        if (err) throw err;
        console.log(result);
    });
};

// export const QueryUpdateTodo = (id, todo) => {
//     con.query("UPDATE todos SET ? WHERE id = ?", [todo, id], (err, result) => {
//         if (err) throw err;
//         console.log(result);
//     });
// };

export const QueryUpdateTodo = async (id, todo) => {
    try {
        const result = await new Promise((resolve, reject) => {
            con.query("UPDATE todos SET ? WHERE id = ?", [todo, id], (err, result) => {
                if (err) {
                    reject(err); // במקרה של שגיאה, דוחה את ה-Promise עם השגיאה
                } else {
                    resolve(result); // במקרה של הצלחה, מחזיר את התוצאה
                }
            });
        });
        return result;
    } catch (err) {
        throw new Error('Error updating todo: ' + err.message); // זרוק שגיאה אם קרתה
    }
};

export const QueryTodoById = (id) => {
    con.query("SELECT * FROM todos WHERE id = ?", [id], (err, result) => {
        if (err) throw err;
        console.log(result);
        return result;
    });
};

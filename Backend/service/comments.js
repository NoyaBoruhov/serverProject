import { con } from "../../database/DB.js";

export const QueryListOfComments = () => {
    con.query("SELECT * FROM comments", (err, result, fields) => {
        if (err) throw err;
        console.log(result);
        return result;
    });
};

export const QueryCommentById = (id) => {
    con.query("SELECT * FROM comments WHERE id = ?", [id], (err, result) => {
        if (err) throw err;
        console.log(result);
        return result;
    });
};

// export const QueryCreateComment = (comment) => {
//     con.query("Insert INTO comments SET ?", [comment], (err, result) => {
//         if (err) throw err;
//         console.log(result);
//     });
// };

export const QueryCreateComment = (comment, res) => {
    const { postId, name, email, body   } = comment;
    con.query("INSERT INTO comments SET postId = ?, name = ?, email = ?, body = ?", [postId, name, email, body], (err, result) => {
        if (err) {
            console.log(err);
            return res.status(400).json({ error: 'An error occurred while creating the comment' });
        }
        console.log(result);
        return result;
    });
}

// export const QueryUpdateComment = (id, comment) => {
//     con.query("UPDATE comments SET ? WHERE id = ?", [comment, id], (err, result) => {
//         if (err) throw err;
//         console.log(result);
//     });
// };

export const QueryUpdateComment = async (id, comment) => {
    try {
        const result = await new Promise((resolve, reject) => {
            con.query("UPDATE comments SET ? WHERE id = ?", [comment, id], (err, result) => {
                if (err) {
                    reject(err); // במקרה של שגיאה, דוחה את ה-Promise עם השגיאה
                } else {
                    resolve(result); // במקרה של הצלחה, מחזיר את התוצאה
                }
            });
        });
        return result;
    } catch (err) {
        throw new Error('Error updating comment: ' + err.message); // זרוק שגיאה אם קרתה
    }
};

export const QueryDeleteComment = (id) => {
    con.query("DELETE FROM comments WHERE id = ?", [id], (err, result) => {
        if (err) throw err;
        console.log(result);
    });
};


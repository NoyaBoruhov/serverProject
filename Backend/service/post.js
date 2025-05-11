import { con } from "../../database/DB.js";

export const QueryCreatePost = (post, res) => {
    const { userId, title, body } = post;
    con.query("INSERT INTO posts SET userId = ?, title = ?, body = ?", [userId, title, body], (err, result) => {
        if (err) {
            console.log(err);
            return res.status(400).json({ error: 'An error occurred while creating the post' });
        }
        console.log(result);
        return result;
    });
}

export const QueryListOfPosts = () => {
     con.query("SELECT * FROM posts", (err, result) =>{
               if (err) throw err;
               console.log(result);
              return result;
           });
};

export const QueryPostById = (id) => {
    con.query("SELECT * FROM posts WHERE id = ?", [id], (err, result) => {
        if (err) throw err;
        console.log(result);
        return result;
    });
};



// export const QueryUpdatePost = (id, post) => {
//     con.query("UPDATE posts SET ? WHERE id = ?", [post, id], (err, result) => {
//         if (err) throw err;
//         console.log(result);
//     });
// };

export const QueryUpdatePost = async (id, post) => {
    try {
        const result = await new Promise((resolve, reject) => {
            con.query("UPDATE posts SET ? WHERE id = ?", [post, id], (err, result) => {
                if (err) {
                    reject(err); // במקרה של שגיאה, דוחה את ה-Promise עם השגיאה
                } else {
                    resolve(result); // במקרה של הצלחה, מחזיר את התוצאה
                }
            });
        });
        return result;
    } catch (err) {
        throw new Error('Error updating post: ' + err.message); // זרוק שגיאה אם קרתה
    }
};
export const QueryDeletePost = (id) => {
    con.query("DELETE FROM posts WHERE id = ?", [id], (err, result) => {
        if (err) throw err;
        console.log(result);
    });
};


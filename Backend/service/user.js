import { con } from "../../database/DB.js";

export const QueryListOfUsers = async (condition) => {
<<<<<<< HEAD
    if (condition) {
       await con.query("SELECT * FROM users WHERE id = ?", [condition], (err, result)=> {
            if (err) throw err;
            console.log(result);
            return result;
           
        });
        
=======
    // if (condition) {
    //     con.query("SELECT * FROM users WHERE id = ?", [condition], (err, result)=> {
    //         if (err) throw err;
    //         console.log(result);

    //        return result;
    //     });
>>>>>>> 4194762a7a0ff0064e3034586124764f772930ac

    // } else {
          con.query("SELECT * FROM users", (err, result) =>{
            if (err) throw err;
            console.log(result);
           return result;
        });
       
    // }
};

export const QueryUserById = async (id) => {
    con.query("SELECT * FROM users WHERE id = ?", [id], (err, result)=> {
        if (err) throw err;
        console.log(result);
       return result;
    });
}

<<<<<<< HEAD
export const QueryCreateUser = async (user) => {
    con.query("Insert INTO users SET ?", [user], (err, result)=> {
        if (err) throw err;
        console.log(user);
       return result;
    });}



export const QueryUpdateUser = async (id, user) => {
    console.log(user);
    con.query("UPDATE users SET ? WHERE id = ?", [user, id], (err, result)=> {
        if (err) throw err;
        console.log(result);
       return result;
    });
}

export const QueryDeleteUser = async(id) => {
=======

// export const QueryCreateUser = (user) => {
//     con.query("Insert INTO users SET ?", [user], (err, result)=> {
//         if (err) throw err;
//         console.log(result);
//        return result;
//     });}


export const QueryCreateUser = (user, res) => {
    const { name, user_name, email, phone } = user;
    con.query("INSERT INTO users SET name = ?, user_name = ?, email = ?, phone = ?", [name, user_name, email, phone], (err, result) => {
        if (err) {
            console.log(err);
            return res.status(400).json({ error: 'An error occurred while creating the user' });
        }
        console.log(result);
        return result;
    });
}



// export const QueryUpdateUser = (id, user) => {
    
//     con.query("UPDATE users SET ? WHERE id = ?", [user, id], (err, result)=> {
//         if (err) throw err;
//         console.log(result);
//        return result;
//     });
// }
export const QueryUpdateUser = async (id, user) => {
    try {
        const result = await new Promise((resolve, reject) => {
            con.query("UPDATE users SET ? WHERE id = ?", [user, id], (err, result) => {
                if (err) {
                    reject(err); // במקרה של שגיאה, דוחה את ה-Promise עם השגיאה
                } else {
                    resolve(result); // במקרה של הצלחה, מחזיר את התוצאה
                }
            });
        });
        return result;
    } catch (err) {
        throw new Error('Error updating user: ' + err.message); // זרוק שגיאה אם קרתה
    }
};


export const QueryDeleteUser = (id) => {
>>>>>>> 4194762a7a0ff0064e3034586124764f772930ac
    con.query("DELETE FROM users WHERE id = ?", [id], (err, result)=> {
        if (err) throw err;
        console.log(result);
       return result;
    });
}
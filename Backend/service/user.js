import { con } from "../../database/DB.js";

export const QueryListOfUsers = async (condition) => {
    if (condition) {
        con.query("SELECT * FROM users WHERE id = ?", [condition], (err, result)=> {
            if (err) throw err;
            console.log(result);

           return result;
        });

    } else {
          con.query("SELECT * FROM users", (err, result) =>{
            if (err) throw err;
            console.log(result);
           return result;
        });
       
    }
};

export const QueryUserById = (id) => {
    con.query("SELECT * FROM users WHERE id = ?", [id], (err, result)=> {
        if (err) throw err;
        console.log(result);
       return result;
    });
}

export const QueryCreateUser = (user) => {
    con.query("Insert INTO users SET ?", [user], (err, result)=> {
        if (err) throw err;
        console.log(result);
       return result;
    });}



export const QueryUpdateUser = (id, user) => {
    con.query("UPDATE users SET ? WHERE id = ?", [user, id], (err, result)=> {
        if (err) throw err;
        console.log(result);
       return result;
    });
}

export const QueryDeleteUser = (id) => {
    con.query("DELETE FROM users WHERE id = ?", [id], (err, result)=> {
        if (err) throw err;
        console.log(result);
       return result;
    });
}
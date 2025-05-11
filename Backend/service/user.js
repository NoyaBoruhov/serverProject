import { con } from "../../database/DB.js";

export const QueryListOfUsers = async (condition) => {
    if (condition) {
       await con.query("SELECT * FROM users WHERE id = ?", [condition], (err, result)=> {
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

export const QueryUserById = async (id) => {
    con.query("SELECT * FROM users WHERE id = ?", [id], (err, result)=> {
        if (err) throw err;
        console.log(result);
       return result;
    });
}

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
    con.query("DELETE FROM users WHERE id = ?", [id], (err, result)=> {
        if (err) throw err;
        console.log(result);
       return result;
    });
}
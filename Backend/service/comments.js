import { con } from "../../database/DB";

export const QueryListOfComments = (condition) => { 
    con.query("SELECT * FROM comments",(err,result,fields)=>{
        if(err) throw err;
        console.log(result);
    })};

export const QueryCommentById = (id) => {
    return Comment.findById(id).exec();
}

export const QueryCreateComment = (comment) => {
    return comment.create(comment);
}

export const QueryUpdateComment = (id, comment) => {
    return comment.update(comment, {where: {id: id}}).exec();
}


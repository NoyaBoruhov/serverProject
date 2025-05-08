export const QueryListOfComments = (condition) => { 
    if(condition){
        return Comment.findAll(condition).exec();
    }else{
        return Comment.findAll().exec();
    }
};

export const QueryCommentById = (id) => {
    return Comment.findById(id).exec();
}

export const QueryCreateComment = (comment) => {
    return comment.create(comment);
}

export const QueryUpdateComment = (id, comment) => {
    return comment.update(comment, {where: {id: id}}).exec();
}


export const QueryListOfUsers = (condition) => { 
    if(condition){
        return User.findAll(condition).exec();
    }else{
        return User.findAll().exec();
    }
};

export const QueryUserById = (id) => {
    return User.findById(id).exec();
}

export const QueryCreateUser = (user) => {
    return user.create(user);
}

export const QueryUpdateUser = (id, user) => {
    return user.update(user, {where: {id: id}}).exec();
}


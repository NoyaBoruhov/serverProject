import { dataConfig } from "../data";
export const GetUserById = async (userId) => {
    try {
        const response = await fetch(dataConfig.baseUrl + `users/${userId}`);
        if (!response.ok) {
            throw new Error('Failed to fetch user details');
        }
        return await response.json();
    } catch (error) {
        throw error;
    }
}

export const GetUsersByUsernameWebsite = async (userdata) => {
    const response = await fetch(dataConfig.baseUrl + `users?username=${userdata.name}&website=${userdata.website}`);
    if (!response.ok) {
        throw new Error('Failed to fetch users');
    }
    return await response.json();
}
export const GetUsersByUsername = async (username) => {
    try {
        console.log(userdata);
        const response = await fetch(dataConfig.baseUrl + `users?username=${username}`);
        if (response.status === 404) {
            navigate('*')
        }
        if (!response.ok) {
            throw new Error('Failed to fetch users');
        }
        return await response.json();
    } catch (error) {
        throw error;
    }
}
export const AddUser = async (newUser) => {
    try{const response = await fetch(dataConfig.baseUrl +'users', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(newUser),
    });
    if(!response.ok){
        throw new Error('Failed to check user');
    }
    return await response.json();}
    catch (error) {
        throw error;
    }
}
export const UpdateUser = async (id,fullData) => {
    try {
        const response = await fetch(dataConfig.baseUrl + `users/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(fullData)
        });
        if (!response.ok) {
            throw new Error('Failed to update user details');
        }
        return await response.json();
    } catch (error) {
        throw error;
    }
}
export const GetUsersByAttribute = async (attribute) => {
    try {
        const response = await fetch(dataConfig.baseUrl + `users?${attribute.type}=${attribute.value}`);
        if (!response.ok) {
            throw new Error('Failed to fetch users');
        }
        return await response.json();
    } catch (error) {
        throw error;
    }
}
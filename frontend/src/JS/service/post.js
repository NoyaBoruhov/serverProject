import { dataConfig } from '../data';
export const UpdatePostById = async (userId,post,postId) => {
    const response = await fetch(dataConfig.baseUrl + `posts/${postId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            "userId": userId,
            "title": post.title,   
            "body": post.body}),
    });    
    if (!response.ok) {
        throw new Error('Failed to update post');
    }
    const updatedPost = await response.json();
    return updatedPost;
}
export const GetPosts = async () => {
    try {
        const response = await fetch(dataConfig.baseUrl + 'posts');
        if (!response.ok) {     
            throw new Error('Failed to fetch todos');
        }
        return await response.json();
    }
    catch (error) {
         throw error;
    }
}
export const AddPost = async (post) => {
    try {
        const response = await fetch(dataConfig.baseUrl + 'posts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(post),
        });
        if (!response.ok) {
            throw new Error('Failed to add post');
        }
        return await response.json();
    } catch (error) {
        throw error;
    }
}
export const DeletePost = async (postId) => {
    try {
        const response = await fetch(dataConfig.baseUrl + `posts/${postId}`, {
            method: 'DELETE',
        });
        if (!response.ok) { 
            throw new Error('Failed to delete post');
        }
    } catch (error) {
        console.error('Error deleting post:', error);
    }
}

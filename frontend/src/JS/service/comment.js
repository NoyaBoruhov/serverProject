import { dataConfig } from "../data";
export const GetCommentsByPostId = async (postId) => {
    try {
        const response = await fetch(dataConfig.baseUrl + `comments?postId=${postId}`);
        if (!response.ok) {
            throw new Error('Failed to fetch comments');
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching comments:', error);
    }
}
export const AddComment = async (comment) => {
    try {
        const response = await fetch(dataConfig.baseUrl + 'comments', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(comment),
        });
        if (!response.ok) {
            throw new Error('Failed to add comment');
        }
        return await response.json();
    } catch (error) {
        console.error('Error adding comment:', error);
    }
}
export const DeleteComment = async (commentId) => {
    try {
        const response = await fetch(dataConfig.baseUrl + `comments/${commentId}`, {
            method: 'DELETE',
        });
        if (!response.ok) {
            throw new Error('Failed to delete comment');
        }
    } catch (error) {
        throw error;
    }
}
export const updateComment = async (commentId, comment) => {
    try {
        const response = await fetch(dataConfig.baseUrl + `comments/${commentId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(comment),
        });
        if (!response.ok) {
            throw new Error('Failed to update comment');
        }
        return await response.json();
    } catch (error) {
        throw error;
    }
}
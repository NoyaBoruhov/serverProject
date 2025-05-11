import React, { useState, useEffect } from 'react';
import { useUserContext } from '../Components/UseContext';
import { AddPost, UpdatePostById } from '../JS/service/post';
function AddUpdatePost({ posts,post, setPosts ,setShowAddUpdatePost }) {
    const [errorMessage, setErrorMessage] = useState('');
    const { currentUser } = useUserContext();
    const [updatePost, setUpdatePost] = useState({...post});
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const addPost={
                id:posts.length>0 ? (Number(posts[posts.length-1].id)+1).toString():"1",
                userId: currentUser.id,
                title: updatePost.title,
                body: updatePost.body,
            };
            const data =post? await UpdatePostById(currentUser.id, updatePost, post.id): await AddPost(addPost);
            setErrorMessage('');
            setPosts(post?(prevPosts) => prevPosts.map((p) => p.id === updatePost.id ? updatePost : p):(prevPosts) => [...prevPosts, data]);
            setShowAddUpdatePost(false);
        } catch (error) {
            console.error('Error checking user:', error);
            setErrorMessage('שגיאה בבדיקת  המשימה.');
        }
        cancel();
    }
        const cancel = () => {
            setShowAddUpdatePost(false);
        }
        return (
            <form onSubmit={handleSubmit}>
                <label htmlFor="title" >כותרת</label>
                <input type="text" id="title" name="title" value={updatePost.title||""} onChange={(e) => setUpdatePost({ ...updatePost, title: e.target.value })}/>
                <label htmlFor="body">גוף הפוסט</label>
                <input type="text" id="body" name="body" value={updatePost.body||""} onChange={(e) => setUpdatePost({ ...updatePost, body: e.target.value })}/>
                <button type="submit">אישור</button>
                <button type="button" onClick={cancel}>ביטול</button>
                {errorMessage && <p>{errorMessage}</p>}
            </form>
        );
    }

    export default AddUpdatePost;
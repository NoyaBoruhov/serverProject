import React from 'react'
import { useState } from 'react';
import { AddComment,updateComment } from '../JS/service/comment';
import { useUserContext } from '../Components/UseContext';

const AddUpdateComment = ({setComments,comment,setShowAddUpdateComments,postId,comments}) => {    
    const {currentUser} = useUserContext();
    const [data, setData] = useState({
        id: comment?.id ||comments.length>0 ? (Number(comments[comments.length-1].id)+1).toString():"1",
        name: comment?.name || '', 
        body: comment?.body || '',  
        email: currentUser.email,
        postId: postId
    });
    const handleSubmitAddUpdate = async (e) => {
            e.preventDefault();
                try {
                    const dataComment = comment?await updateComment(comment.id,data): await AddComment(data);      
                    setComments(comment?(prev) => prev.map((c) => c.id === dataComment.id ? dataComment : c):(prev) => [...prev,dataComment]);
                    setShowAddUpdateComments(false);
                } catch (error) {
                    console.error('Error updating post:', error);
                }
                cancel();
        
    }
    const cancel = () => {
        setShowAddUpdateComments(false);
    }
    return (
    <form>
        <label>כותרת תגובה:</label>
        <input type="text" name="name" value={data.name} onChange={(e) => setData({ ...data, name: e.target.value })} />
        <label>תוכן התגובה:</label>
        <input type="text" name="body" value={data.body} onChange={(e) => setData({ ...data, body: e.target.value })}/>
        <button type="submit" onClick={handleSubmitAddUpdate}>שלח</button>
        <button onClick={cancel}>ביטול</button>
    </form>
    );
}

export default AddUpdateComment
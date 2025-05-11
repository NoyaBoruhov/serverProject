import React, { useEffect,useState } from 'react'
import { GetCommentsByPostId,DeleteComment } from '../JS/service/comment';
import { useUserContext } from './UseContext';
import AddUpdateComment from './AddUpdateComment';
import { useParams } from 'react-router-dom';
const Comments = () => {
    const {currentUser} = useUserContext();
    const [comments, setComments] = useState([]);
    const [showAddUpdateComments, setShowAddUpdateComments] = useState(0);
    const [updateComment, setUpdateComment] = useState(null);
    const postId=useParams().id;
    const BringComments = async () => {
        try {
            const updatedComments =  await GetCommentsByPostId(postId);      
            setComments(updatedComments.filter(comment => comment.postId != null));
        }
        catch(error){
            console.error('Error fetching comments:', error);
        }
    }
    useEffect(() => {
        BringComments();
    },[])
    const deleteComment = (comment) => async () => {
        try{
            await DeleteComment(comment.id);
            setComments((prev) => prev.filter((c) => c.id !== comment.id));
        }
        catch(error){
            console.error('Error deleting comment:', error);
        }
    }
    return (<>
    <button onClick={()=>{setShowAddUpdateComments(1)}}>הוספת תגובה </button>
    {
        showAddUpdateComments>0 && (
        <AddUpdateComment postId={postId} setComments={setComments} setShowAddUpdateComments={setShowAddUpdateComments} comment={updateComment} comments={comments}/>
        )
    }
    {comments.map((comment) => (
        <div key={comment.id}>
            <b>כתובת מגיב:</b>
            {comment.email}
            <br/>
          <b>  כותרת תגובה:</b>
            {comment.name}
            <br/>
            <b>גוף תגובה:</b>
            {comment.body}
            {
               comment.email === currentUser.email
                &&<><button onClick={() => {setShowAddUpdateComments(2);setUpdateComment(comment)}}>עדכון תגובה</button>
                 <button onClick={deleteComment(comment)}>מחיקת תגובה</button></>
            }
            <hr/>
        </div>
        ))}
    </>)
};
export default Comments
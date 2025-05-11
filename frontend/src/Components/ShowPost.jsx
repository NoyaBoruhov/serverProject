import React from 'react'
import { useState } from 'react';
import {useNavigate,Outlet } from 'react-router-dom';
const ShowPost = ({post,setShowPost}) => {
    const [comments, setComments] = useState(false);
    const navigate=useNavigate();
    const stopShowPost = () => setShowPost(prev => [...(prev).filter(p => p.id !== post.id)]);
    return (
        <div style={{direction:"rtl"}}>
         כותרת הפוסט: 
           <strong>{post.title}</strong>
           <br/>
           גוף הפוסט: 
           {post.body}
           <br/>
           <button onClick={()=>{setComments(prev => !prev); navigate(`${post.id}/comments`)}}>
            {comments?"הסתר תגובות":"הצג תגובות"}
            </button>
           <button onClick={stopShowPost}>הסתר הצגה</button>
           { <Outlet/>}
        </div>
    )
}

export default ShowPost
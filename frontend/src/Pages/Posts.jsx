import React, { useState, useEffect } from 'react';
import { useUserContext } from '../Components/UseContext';
import AddUpdatePost from '../Components/AddUpdatePost';
import ShowPost from '../Components/ShowPost';
import SearchPosts from '../Components/searchPosts';
import { GetPosts, DeletePost } from '../JS/service/post';
const  Posts=()=> {
    const [errorMessage, setErrorMessage] = useState('');
    const [posts, setPosts] = useState([]);
    const [showUpdatePost, setShowUpdatePost] = useState(false);
    const [showAddPost, setShowAddPost] = useState(false);
    const [postUpdate, setPostUpdate] = useState({});
    const [showPost, setShowPost] = useState([]);
    const [searchTerm, setSearchTerm] = useState({ type: '', value: '' });
    const [sortOption, setSortOption] = useState('id');
    const [filteredPosts, setFilteredPosts] = useState([]);
    const { currentUser } = useUserContext();
    const bringPosts = async () => {
        try {
            const existingPosts = await GetPosts();
            if (existingPosts.length === 0) {
                setErrorMessage("post doesnt  exists. Please add post.")
            }
            setPosts(existingPosts);
            setErrorMessage('');
        }
        catch (error) {
            console.error('לא נמצאה רשימת פוסטים', error);
        }
    }
    useEffect(() => {
        bringPosts()
    }, []);
    useEffect(() => {

        const filtered = posts.filter((x) =>
            !searchTerm.type || // אם לא נבחרה קטגוריה
            (searchTerm.type === 'title' && x.title.includes(searchTerm.value)) || // חיפוש לפי כותרת
            (searchTerm.type === 'id' && x.id.toString() === searchTerm.value) // חיפוש לפי ID
        );

        filtered.sort((a, b) => {
            if (sortOption.type === 'id') return a.id - b.id;
            return 0;
        });

        setFilteredPosts(filtered);
    }, [searchTerm, sortOption, posts]);
    const myPosts = () => {
        var myPosts = filteredPosts.filter(post => post.userId === currentUser.id);
        setFilteredPosts(myPosts);
    }
    const Delete = async (post) => {
        try {
            DeletePost(post.id)
            setPosts((prevPosts) => prevPosts.filter((p) => p.id !== post.id));
            setShowUpdatePost(false);
        }
        catch (error) {
            console.error('Error deleting post:', error);
        }
    }
    return (
        <div>
            <SearchPosts setSearch={setSearchTerm} />
            <button onClick={() => setShowAddPost(true)} >הוספת פוסט</button>
            <button onClick={() => { myPosts(); setShowPost([]); }}>הפוסטים שלי</button>
            <button onClick={() => { setFilteredPosts(posts); setShowPost([]); }}>כל הפוסטים</button>
            <ul>
                {
                    filteredPosts.length > 0 ? (
                        filteredPosts.map((post, index) => (
                            <li key={index} style={{ direction: "rtl", textAlign: "right", fontSize: "20px" }}>
                                {post.id}--{post.title}
                                <button onClick={() => Delete(post)}>מחק</button>
                                <button onClick={() => { setPostUpdate(post); setShowUpdatePost(true); }}>עדכן</button>
                                {showPost.some(showedPost => showedPost.id === post.id) ? <ShowPost post={post} setShowPost={setShowPost} /> :
                                    <button onClick={() => setShowPost([...showPost, post])}>הצגה</button>}

                            </li>
                        ))
                    ) : null

                }
            </ul>
            {showAddPost && <AddUpdatePost setPosts={setPosts} setShowAddUpdatePost={setShowAddPost} posts={posts} />}
            {showUpdatePost && <AddUpdatePost setPosts={setPosts} setShowAddUpdatePost={setShowUpdatePost} posts={posts} post={postUpdate} />}
            {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
        </div>
    );
}
export default Posts;
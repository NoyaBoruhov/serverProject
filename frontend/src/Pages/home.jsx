import React, { useState } from 'react';
import { Outlet, useNavigate, Link } from "react-router-dom";
import { useUserContext } from '../Components/UseContext';


function Home() {
    const navigate = useNavigate();
    const { currentUser, setCurrentUser } = useUserContext();
    return (<>
        <h1>שלום ל{currentUser.name}</h1>
        <Link to="info">
            פרטים אישיים
        </Link>
        <Link to="todos">
            רשימת משימות
        </Link>
        

        <Link to="post">
            פוסטים
        </Link>
        <Link to="/login" onClick={() => {
            setCurrentUser({});
            navigate("/login", { replace: true }); // ניתוב מחדש לעמוד התחברות
        }}>
            Logout
        </Link>
        <Outlet />
    </>
    );



}
export default Home;
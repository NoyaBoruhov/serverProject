import React, { useState } from 'react';
import { useNavigate, Link, data } from "react-router-dom";
import { dataConfig } from '../JS/data';
import { useUserContext } from '../Components/UseContext';
import { useEffect } from 'react';
import { GetUsersByUsernameWebsite } from '../JS/service/user';

function Login() {
    useEffect(() => {
        localStorage.setItem('userId', null);
    }, []);
    const { currentUser, setCurrentUser } = useUserContext();
    const [userdata, setUserdata] = useState({ name: '', website: '' });
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const existingUser = await GetUsersByUsernameWebsite(userdata);
            if (existingUser.length === 0) {
                setErrorMessage('Username or password is incorrect. Please try again.');
                return;
            }
            localStorage.setItem('userId', JSON.stringify(existingUser[0].id));
            setCurrentUser(existingUser[0]);
            navigate(`/users/${existingUser[0].id}/home`);
        }
        catch (error) {
            console.error('לא נמצאה רשימת המשתמשים', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor="username">שם משתמש:</label>
            <input
                type="text"
                id="username"
                value={userdata.name}
                onChange={(e) => setUserdata((prevUser) => ({
                    ...prevUser,
                    name: e.target.value,
                }))}
                required
            />
            <label htmlFor="password">הסיסמא שלך:</label>
            <input
                type='password'
                id="password"
                value={userdata.password}
                onChange={(e) => setUserdata((prevUser) => ({
                    ...prevUser,
                    website: e.target.value,
                }))}
                required
            />
            <button type="submit" >כניסה</button>
            <Link to="/register">
                לעמוד הרשמה
            </Link>
            {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
        </form>
    );
}

export default Login;
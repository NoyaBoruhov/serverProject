import React, { useState } from 'react';
import { useNavigate, Link } from "react-router-dom";
import { useUserContext } from '../Components/UseContext';
import { AddUser, GetUsersByUsername } from '../JS/service/user';
function Register() { 
    const {setCurrentUser} = useUserContext();   
    const [userdata, setUserdata] = useState({ username: '', newPassword: '', varifyPassword: '' });
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();
    const checkUserExists = async () => {
         var newUser = { username: userdata.username, website: userdata.newPassword }
        try{
            const existingUser = await GetUsersByUsername(userdata.username);
            if (existingUser.length>0) {
              alert('Username already exists. Please choose another one.');
              return;
            }
          }
          catch (error) {
            console.error('לא נמצאה רשימת המשתמשים', error);
          }
        try {
            const data = await AddUser(newUser);
            setErrorMessage('');
            setCurrentUser(data);
            localStorage.setItem('userId',JSON.stringify(data.id));
        } catch (error) {
            console.error('Error checking user:', error);
            setErrorMessage('שגיאה בבדיקת המשתמש.');
        }
        if (userdata.newPassword != userdata.varifyPassword)
        {
            setErrorMessage('אימות סיסמא לא תקין');
            return false;
        }
        return true;
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        if(checkUserExists())
        {
            navigate('/fullDetails');
        }
    };
    const handleSetUserdata=(e) => {
        const { name, value } = e.target;
        setUserdata((prevUser) => ({
            ...prevUser,
            [name]: value,
        }));
    }
    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor="username">שם משתמש:</label>
            <input
                name='username'
                type="text"
                id="username"
                value={userdata.username}
                onChange={handleSetUserdata}
                required
            />
            <label htmlFor="userpassword">סיסמת חדשה:</label>
            <input
                name='newPassword'
                type='password'
                id="userPassword"
                value={userdata.newPassword}
                onChange={handleSetUserdata}
                required
            />
            <label htmlFor="userpassword">אימות סיסמא :</label>
            <input
                name='varifyPassword'
                type='password'
                id="verifyPassword"
                required
                onChange={handleSetUserdata}
            />
            <button type="submit" >הרשמה</button>
            <Link to="/login">
               לעמוד ההתחברות
            </Link>
            {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
        </form>
    );
}

export default Register;
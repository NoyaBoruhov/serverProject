import { createContext, useContext } from "react";
import { useState } from "react";
import { useEffect } from "react";
import {useNavigate } from "react-router-dom";
import { dataConfig } from "../JS/data";
const UserContext = createContext();
export const UserProvider = ({children}) => 
{
  const navigate = useNavigate();
    const [currentUser, setCurrentUser] = useState({});
    localStorage.removeItem('userId');
    useEffect(() => {
        const userId = JSON.parse(localStorage.getItem('userId'));
        if (userId) {
          fetchUserDetails(userId);
        }
        else{
          navigate('/login');
        }
      }, []);
      const fetchUserDetails = async (userId) => {
        try {
          const response = await fetch(dataConfig.baseUrl +`users/${userId}`);
          if (!response.ok) {
            throw new Error('Failed to fetch user details');
          }
          const DatailsUser = await response.json();
          setCurrentUser(DatailsUser[0]);
        } catch (error) {
          navigate('/login');
          console.error('Error fetching user details:', error);
        }
      };
    return (
        <UserContext.Provider value={{currentUser,setCurrentUser}}>
            {children}
        </UserContext.Provider>
    );
};
export const useUserContext = () => useContext(UserContext);

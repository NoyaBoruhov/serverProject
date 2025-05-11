import { useContext, useState } from "react";
import { useUserContext } from "../Components/UseContext";
import { useNavigate } from "react-router-dom";
import { UpdateUser, GetUsersByAttribute } from "../JS/service/user";

function FullDetails() {
    const navigate = useNavigate();
    const { currentUser, setCurrentUser } = useUserContext();
    const [userDetails, setUserDetails] = useState({});
    const handleSetUser = (e) => {
        const { name, value, className } = e.target;
        switch (className) {
            case "userDetails":
                setUserDetails((prevUser) => ({
                    ...prevUser,
                    [name]: value,
                }));
                break;
            case "userAdress":
                setUserDetails((prevUser) => ({
                    ...prevUser,
                    adress: { ...prevUser.adress, [name]: value }
                    ,
                }));
                break;
            case "userCompany":
                setUserDetails((prevUser) => ({
                    ...prevUser,
                    company: { ...prevUser.company, [name]: value }
                    ,
                }));
                break;
        }

    }
    const updateUser = async () => {
        const fullData = {
            ...currentUser,
            ...userDetails
        }
        try {
            const data = await UpdateUser(currentUser.id, fullData);
            setCurrentUser(data);

        } catch (error) {
            console.error('Error updating user details:', error);
        }
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            var data = await GetUsersByAttribute({ type: 'email', value: userDetails.email })
            data=data.filter((u) => u.id !== currentUser.id);
            if (data.length > 0) {
                alert('משתמש זה כבר קיים במערכת');
            }
            else {
                updateUser();
                navigate(`/users/${currentUser.id}/home`);
            }
        } catch (error) {
            console.error('Error updating user details:', error);
        }
    }
    return (
        <form onSubmit={handleSubmit}>
            <h3>פרטי משתמש:</h3>
            <label htmlFor="username">שם משתמש:</label>
            <input type="text" name="name" className="userDetails" id="username" onChange={handleSetUser} required />
            <label htmlFor="email">מייל:</label>
            <input type="email" name="email" className="userDetails" id="mail" onChange={handleSetUser} required />
            <label htmlFor="phone">מספר טלפון:</label>
            <input type="phone" name="phone" id="phone" className="userDetails" onChange={handleSetUser} placeholder="הזן מספר טלפון חוקי" required />
            <hr />
            <h3 >כתובת:</h3>
            <label htmlFor="city">עיר:</label>
            <input type="text" id="city" name="city" className="userAdress" onChange={handleSetUser} required />
            <label htmlFor="street">רחוב:</label>
            <input type="text" id="street" name="street" className="userAdress" onChange={handleSetUser} required />
            <label htmlFor="suite">סוויטה:</label>
            <input type="type" id="suite" name="suite" className="userAdress" onChange={handleSetUser} required />
            <label htmlFor="zipcode">מיקוד:</label>
            <input type="text" id="zipcode" name="zipcode" className="userAdress" onChange={handleSetUser} placeholder="הזן מיקוד חוקי בן 5 עד 7 ספרות" required />
            <hr />
            <h3 >פרטי חברה:</h3>
            <label htmlFor="companyName">שם חברה:</label>
            <input type="text" id="companyName" name="name" className="userCompany" onChange={handleSetUser} required />
            <label htmlFor="catchPhrase">סלוגן חברה:</label>
            <input type="text" id="catchPhrase" name="catchPhrase" className="userCompany" onChange={handleSetUser} required />
            <button type="submit">אישור</button>
        </form>
    )

}

export default FullDetails;
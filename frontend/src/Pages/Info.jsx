import { useUserContext } from "../Components/UseContext";
const UserInfo = ()=>  {
    const { currentUser } = useUserContext();
  
          return (
            <div>
              {
                <div>
                  <h2>User Details</h2>
                  <p><strong>Name:</strong> {currentUser.name}</p>
                  <p><strong>Username:</strong> {currentUser.username}</p>
                  <p><strong>Email:</strong> {currentUser.email}</p>
                  <p><strong>Phone:</strong> {currentUser.phone}</p>
                  <h3>Address</h3>
                  <p><strong>Street:</strong> {currentUser.adress.street}</p> 
                  <p><strong>Suite:</strong> {currentUser.adress.suite}</p>
                  <p><strong>City:</strong> {currentUser.adress.city}</p>
                  <p><strong>Zipcode:</strong> {currentUser.adress.zipcode}</p>
                  <h3>Company</h3>
                  <p><strong>Name:</strong> {currentUser.company.name}</p>
                  <p><strong>Catchphrase:</strong> {currentUser.company.catchPhrase}</p>

                </div>
              }
            </div>
          );
  }
  export default UserInfo
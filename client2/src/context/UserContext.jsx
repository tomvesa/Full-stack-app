import { createContext, useState } from "react";
import Cookies from 'js-cookie';
import api from "../utils/dataFetch";

const UserContext = createContext(null);

export const UserProvider = ({children}) => {
  
    // Check if token exists in cookies
    const cookie = Cookies.get("authenticatedUser")
    const [authUser, setAuthUser] = useState(cookie ? JSON.parse(cookie) : null);
    
    const signIn = async (credentials) => {
        const response = await api('users', "GET", null, credentials);
            if ( response.status === 200 ) {
                const user = await response.json();
                console.log(user);
                setAuthUser(user);
                Cookies.set('authenticatedUser', JSON.stringify(user), {
                  expires:1,
                  secure: true,
                  sameSite: 'none',
                  path: '/',
                
                }); 
                return user;
            }else if (response.status === 401){
                return null;
            } else {
                throw new Error(response.statusText);
            }
    }

    const signOut = ()=>{

      setAuthUser(null);
    }
 

    return (
      <UserContext.Provider
        value={{
          authUser,
          actions: {
            signIn,
            signOut
          },
        }}
      >
        {children}
      </UserContext.Provider>
    );
}

export default UserContext;
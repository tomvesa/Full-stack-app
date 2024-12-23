import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";

import UserContext from "../context/UserContext";
import '../styles/nav.css';



const Nav = () => {
  // get user data and action from user context
  const { authUser, actions } = useContext(UserContext);
  const navigate = useNavigate()

  const handleLogout = (e) => {
    //on logout sign out and redirect to main page
    e.preventDefault();
    actions.signOut();
    navigate('/');
  }

    return (
      <nav>
      {/**based on the user data display login/signup or logout components */}
          {authUser === null? 
          <ul className="header--signedout">
            <li><Link className="signup" to="users/signup">Sign up</Link></li>
            <li><Link className="signin" to="users/signin">Sign in</Link></li>
          </ul>
          :
          <ul className="header--signedin">
           <li> <span>Welcome {authUser.user.firstName} {authUser.user.lastName}</span></li>
            <li><Link className="logout" onClick={handleLogout}>Logout</Link></li>
          </ul>
          }

      </nav>
    );
  }
  
  export default Nav;
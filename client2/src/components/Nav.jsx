import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";

import UserContext from "../context/UserContext";
import '../styles/nav.css';



const Nav = () => {
  const { authUser, actions } = useContext(UserContext);
  const navigate = useNavigate()

  const handleLogout = (e) => {
    e.preventDefault();
    actions.signOut();
    navigate('/');
  }

    return (
      <nav>
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
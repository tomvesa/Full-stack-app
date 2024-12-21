import { useNavigate } from "react-router-dom";

import Nav from "./Nav.jsx";

const Header = () => {
    const navigate = useNavigate();

    const returnToHome = () => {
      navigate("/");
    }
  
    return (
      <header className="header--flex" >
          <h1 className="header--logo" onClick={returnToHome} >Courses</h1>
          <Nav />
      </header>
    );
  };
  
  export default Header
import { useContext } from "react";
import {Navigate, Outlet, useLocation } from "react-router-dom";
import UserContext from "../context/UserContext";

const PrivateRoute = () => {
    // creating private element to make sure only authenticated users can access routes within this component
    const { authUser} = useContext(UserContext);
    const location = useLocation()
    //console.log(location);
// user private route if user is authenticated, else redirect to signin
   return  authUser ? <Outlet /> : <Navigate to="users/signin" state={{from: location.pathname}} />;
}

export default PrivateRoute;
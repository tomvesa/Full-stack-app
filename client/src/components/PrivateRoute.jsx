import { useContext } from "react";
import {Navigate, Outlet } from "react-router-dom";
import UserContext from "../context/UserContext";

const PrivateRoute = () => {
    const { authUser} = useContext(UserContext);
// user private route if user is authenticated, else redirect to signin
   return  authUser ? <Outlet /> : <Navigate to="users/signin" />;
}

export default PrivateRoute;
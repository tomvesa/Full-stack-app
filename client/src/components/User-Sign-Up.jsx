import { useRef, useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../utils/dataFetch";
import ValidationErrors from "./ValidationError";

import UserContext from "../context/UserContext";

const UserSignUp = () => {
    const {actions} = useContext(UserContext);
    const navigate = useNavigate();
    // ref fields
    const firstName = useRef(null);
    const lastName = useRef(null);
    const emailAddress = useRef(null);
    const password = useRef(null);
    const [errors, setErrors] = useState([]);



    const handleSubmit = async (e) => {
        e.preventDefault();
      // collect user information
        const user = {
            firstName: firstName.current.value,
            lastName: lastName.current.value,
            emailAddress: emailAddress.current.value,
            password: password.current.value
        }

        try {
          // send user infomation to create a new account
          const response = await api("users", "POST", user, null);
          if (response.status === 201) {
            // if user is created logg them in right away and redirect to main page
            const signedUser = await actions.signIn(user);
            if (signedUser) {
              navigate("/");
            }
          } else if (response.status === 400) {
            // on bad request set error messages
            const data = await response.json();
            setErrors(data.errors);
            console.log(errors);
          } else {
            // on other errors throw error redirect to error page
            throw new Error(
              "Network response was not ok " + response.statusText
            );
          }
        } catch (e) {
          console.error("Error creating user:", e);
          navigate("/error");
        }

            

    }

    return (
        <main>
            <div className="form--centered">
            <h2>Sign Up</h2>
            <>
                {errors.length > 0 ? <ValidationErrors errors={errors} /> : null}
            </>
            <form onSubmit={handleSubmit}>
                <label htmlFor="firstName">First Name</label>
                <input id="firstName" name="firstName" type="text" ref={firstName}/>
                <label htmlFor="lastName">Last Name</label>
                <input id="lastName" name="lastName" type="text" ref={lastName} />
                <label htmlFor="emailAddress">Email Address</label>
                <input id="emailAddress" name="emailAddress" type="email" ref={emailAddress} />
                <label htmlFor="password">Password</label>
                <input id="password" name="password" type="password" ref={password} />
                <button className="button" 
                        type="submit">
                        Sign Up</button>

            </form>
            <p>Already have a user account? Click here to <Link to="/users/signin">sign in</Link>!</p>
        </div>
    </main>
    )
}

export default UserSignUp;
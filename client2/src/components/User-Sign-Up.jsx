import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import api from "../utils/dataFetch";

const UserSignUp = () => {

    const firstName = useRef(null);
    const lastName = useRef(null);
    const emailAddress = useRef(null);
    const password = useRef(null);
    const [errors, setErrors] = useState([]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const user = {
            firstName: firstName.current.value,
            lastName: lastName.current.value,
            emailAddress: emailAddress.current.value,
            password: password.current.value
        }

        const response = await api("users", "POST", user, null);
        console.log(response);

    }

    return (
        <main>
            <div className="form--centered">
            <h2>Sign Up</h2>
            
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
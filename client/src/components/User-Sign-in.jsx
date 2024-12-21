import {useNavigate, Link} from 'react-router-dom';
import { useRef, useContext, useState } from 'react';
import ValidationErrors from './ValidationError';
import UserContext from "../context/UserContext";

const UserSignIn = () => {
    const {actions} = useContext(UserContext);
    const navigate = useNavigate();

    const [errors, setErrors] = useState([]);
    // form fields state
    const emailAddress = useRef('');
    const password = useRef('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        const  credentials = {
            emailAddress: emailAddress.current.value,
            password: password.current.value
        }  

        try {
            const user = await actions.signIn(credentials);   
           
            if (user) {
                navigate("/");
            } else {
                setErrors(["Sign in failed"])
            } 
        } catch (err) {
            console.error('Error fetching data:', err);
            navigate('/error' );
        }
    }



    return (

        <main >
            <div className="form--centered" >
                <h2>Sign In</h2>
                <>{errors.length > 0 ? <ValidationErrors errors={errors} /> : null}</>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="emailAddress">Email Address</label>
                    <input id="emailAddress" name="emailAddress" type="email" ref={emailAddress} />
                    <label htmlFor="password">Password</label>
                    <input id="password" name="password" type="password" ref={password} />

                    <button className="button" type="submit">Sign In</button>
                    <button className="button button-secondary">Cancel</button>
                </form>
                <p>{`Don't have a user account? Click here to `}<Link to="/users/signup">sign up</Link>!</p>
                
            </div>
        </main>
    )
        }

export default UserSignIn        
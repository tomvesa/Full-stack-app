import {useNavigate, Link, useLocation} from 'react-router-dom';
import { useRef, useContext, useState } from 'react';
import ValidationErrors from './ValidationError';
import UserContext from "../context/UserContext";

const UserSignIn = () => {
    // get actions sign in and sign out from user context
    const {actions} = useContext(UserContext);
    const navigate = useNavigate();
    // keep track of the location
    const location = useLocation();

    //state for errors
    const [errors, setErrors] = useState([]);

    // form fields reference
    const emailAddress = useRef('');
    const password = useRef('');

    const handleCancel = ()=>{
        // redirect to main page
        navigate("/");
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        // check where the user tried to go to redirect them to desired page or main page
        let from = "/";
        if(location.state){
            // if location stat is set, after login redirect them to this page 
            from = location.state.from;
        }
        const  credentials = {
            emailAddress: emailAddress.current.value,
            password: password.current.value
        }  

        try {
            const user = await actions.signIn(credentials);   
           
            if (user) {
                // after successful login redirect to desired page or main page
                navigate(from);
            } else {
                // set error messege 
                setErrors(["Sign in failed"])
            } 
        } catch (err) {
            // redirect to error page when api call fails
            console.error('Error fetching data:', err);
            navigate('/error' );
        }
    }



    return (

        <main >
            <div className="form--centered" >
                <h2>Sign In</h2>
                {/* display error messages */}
                <>{errors.length > 0 ? <ValidationErrors errors={errors} /> : null}</>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="emailAddress">Email Address</label>
                    <input id="emailAddress" name="emailAddress" type="email" ref={emailAddress} />
                    <label htmlFor="password">Password</label>
                    <input id="password" name="password" type="password" ref={password} />

                    <button className="button" type="submit">Sign In</button>
                    <button className="button button-secondary" onClick={handleCancel}>Cancel</button>
                </form>
                <p>{`Don't have a user account? Click here to `}<Link to="/users/signup">sign up</Link>!</p>
                
            </div>
        </main>
    )
        }

export default UserSignIn        
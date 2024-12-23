import {useNavigate, Link, useLocation} from 'react-router-dom';
import { useRef, useContext, useState } from 'react';
import ValidationErrors from './ValidationError';
import UserContext from "../context/UserContext";

const UserSignIn = () => {
    const {actions} = useContext(UserContext);
    const navigate = useNavigate();
    const location = useLocation();
    console.log(location)

    const [errors, setErrors] = useState([]);
    // form fields state
    const emailAddress = useRef('');
    const password = useRef('');

    const handleCancel = ()=>{
        navigate("/");
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        let from = "/";
        if(location.state){
            from = location.state.from;
        }
        const  credentials = {
            emailAddress: emailAddress.current.value,
            password: password.current.value
        }  

        try {
            const user = await actions.signIn(credentials);   
           
            if (user) {
                navigate(from);
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
                    <button className="button button-secondary" onClick={handleCancel}>Cancel</button>
                </form>
                <p>{`Don't have a user account? Click here to `}<Link to="/users/signup">sign up</Link>!</p>
                
            </div>
        </main>
    )
        }

export default UserSignIn        
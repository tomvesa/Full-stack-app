import { useContext, useRef, useState } from "react";
import api from "../utils/dataFetch";
import Cookies from 'js-cookie';

import UserContext from "../context/UserContext"; 


const CourseCreate = () => {
    const cookie = Cookies.get("authenticatedUser");
    console.log("cookie", cookie);
    const {authUser} = useContext(UserContext);

    //ref fields
    const courseTitle = useRef('');
    const courseDescription = useRef('');
    const estimatedTime = useRef('');
    const materialsNeeded = useRef('');
    //errors State 
    const [errors, setErrors] = useState([]);

    const handleSubmit = async (e) => {
        
        e.preventDefault();
        
        const courseData = {
            title: courseTitle.current.value,
            description: courseDescription.current.value,
            estimatedTime: estimatedTime.current.value,
            materialsNeeded: materialsNeeded.current.value,
            userId: authUser.user.id,
        }
        console.log("sending course data", courseData);
        try{
            //const response = await api('courses/', "POST", courseData, credentials);
            const response = await api("courses/", "POST", courseData, null);
            console.log(courseData);
            console.log("response", response);


        } catch (error) {
            console.error('Error creating course:', error);
            setErrors(["Failed to create course"])
        }
    }

    return (
        <main>
            <div className="wrap">
                <h2>Create Course</h2>
                <div className="validation--errors">
                    <h3>Validation Errors</h3>
                    <ul>
                        <li>Please provide a value for "Title"</li>
                        <li>Please provide a value for "Description"</li>
                    </ul>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="main--flex">
                        <div>
                            <label htmlFor="courseTitle" aria-required>Course Title</label>
                            <input id="courseTitle" name="courseTitle" type="text" ref={courseTitle} />

                            <label htmlFor="courseDescription">Course Description</label>
                            <textarea id="courseDescription" name="courseDescription" ref={courseDescription}></textarea>
                        </div>
                        <div>
                            <label htmlFor="estimatedTime">Estimated Time</label>
                            <input id="estimatedTime" name="estimatedTime" type="text" ref={estimatedTime} />

                            <label htmlFor="materialsNeeded">Materials Needed</label>
                            <textarea id="materialsNeeded" name="materialsNeeded" ref={materialsNeeded}></textarea>
                        </div>
                    </div>
                    <button className="button" type="submit">Create Course</button>
                    <button className="button button-secondary" >Cancel</button>
                </form>
            </div>
        </main>        
    )
}

export default CourseCreate;
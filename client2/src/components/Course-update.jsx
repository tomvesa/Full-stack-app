import { useNavigate } from "react-router-dom";
import { useEffect, useState, useRef, useContext } from "react";
import Cookies from 'js-cookie';
import api from "../utils/dataFetch";

import UserContext from "../context/UserContext";

const CourseUpdate = () =>{
    // cookie authentication for user
    const cookie = Cookies.get("authenticatedUser");
    console.log("cookie", cookie);
    const {authUser} = useContext(UserContext);


    const navigate = useNavigate();
    const [courseData, setCourseData] = useState(null);    
    const [errors, setErrors] = useState([]);
    const path = location.pathname.substring(1);
    const coursePath = path.replace("/update", "");

    //ref fields
    const courseTitle = useRef('');
    const courseDescription = useRef('');
    const estimatedTime = useRef('');
    const materialsNeeded = useRef('');

    // Fetch course data from API get course by Id
    const callAPI = async () => {
        
        try {
            const response = await api(`${coursePath}`);
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            const data = await response.json();
             setCourseData(data.course);  // Updated to set a single course

        } catch (error) {
           navigate("/404"); 
           return console.error('Error fetching course:', error);
           
        }
    };

    // call API it fetch the data
    useEffect(() =>  {
         callAPI();
       },[]);

    

    const handleSubmit = async (e) => {
        
        e.preventDefault();
        
        const courseDataToUpdate = {
            title: courseTitle.current.value,
            description: courseDescription.current.value,
            estimatedTime: estimatedTime.current.value,
            materialsNeeded: materialsNeeded.current.value,
        }
        console.log("sending course data to update", courseDataToUpdate);
        try{
            //const response = await api('courses/', "POST", courseData, credentials);
            const response = await api(coursePath, "PUT", courseDataToUpdate, null);
            console.log(courseDataToUpdate);
            console.log("response", response);


        } catch (error) {
            console.error('Error updating course:', error);
            setErrors(["Failed to update course"])
        }
    }

    const handleCancel = (e)=>{
        e.preventDefault();
        const courseDetailPath = path.replace("/update", "");
        navigate(courseDetailPath);    
    }

    return (
        <main>
            {/* Render course data or a loading state */}
            {courseData ? (
                <form onSubmit={handleSubmit}>
                    <div className="main--flex">
                        <div>
                            <label htmlFor="courseTitle">Course Title</label>
                            <input id="courseTitle" name="courseTitle" type="text" ref={courseTitle} defaultValue={courseData.title} />

                            <p>By {courseData.Instructor.firstName} {courseData.Instructor.lastName}</p>

                            <label htmlFor="courseDescription">Course Description</label>
                            <textarea id="courseDescription" name="courseDescription" ref={courseDescription} defaultValue={courseData.description}></textarea>
                        </div>
                        <div>
                            <label htmlFor="estimatedTime">Estimated Time</label>
                            <input id="estimatedTime" name="estimatedTime" type="text" ref={estimatedTime} defaultValue={courseData.estimatedTime} />

                            <label htmlFor="materialsNeeded">Materials Needed</label>
                            <textarea id="materialsNeeded" name="materialsNeeded" ref={materialsNeeded} defaultValue={courseData.materialsNeeded}></textarea>
                        </div>
                    </div>
                    <button className="button" type="submit">Update Course</button><button className="button button-secondary" onClick={handleCancel}>Cancel</button>
                </form>
            ) : (
                <p>Loading...</p>
            )}
        </main>
    );
};

export default CourseUpdate;
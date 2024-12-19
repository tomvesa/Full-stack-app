import { useNavigate } from "react-router-dom";
import { useEffect, useState, useRef, useContext } from "react";
import Cookies from 'js-cookie';
import api from "../utils/dataFetch";
import ValidationErrors from "./ValidationError";

import UserContext from "../context/UserContext";

const CourseUpdate = () =>{
    // cookie authentication for user
    const cookie = Cookies.get("authenticatedUser");
    console.log("cookie", cookie);
    const {authUser} = useContext(UserContext);


    const navigate = useNavigate();
    const [courseData, setCourseData] = useState(null);    
    const [errors, setErrors] = useState([]);
    const [success, setSuccess] = useState(null);
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
            } else if (response.status === 200) {
            const data = await response.json();
             setCourseData(data.course);  // Updated to set a single course
                }
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
            title: courseTitle.current.value.trim(),
            description: courseDescription.current.value.trim(),
            estimatedTime: estimatedTime.current.value.trim(),
            materialsNeeded: materialsNeeded.current.value.trim(),
        }
        console.log("sending course data to update", courseDataToUpdate);
        try{
            //const response = await api('courses/', "POST", courseData, credentials);
            const response = await api(coursePath, "PUT", courseDataToUpdate, null);
            console.log("res status PUT ", response.status);
            if (response.status === 204) {
                setSuccess("Course updated successfully, redirecting to course details...");
                setTimeout(() => {
                    console.log(coursePath)
                    navigate(`/${coursePath}`);
                }, 2000);
            } if (response.status === 400) {
                const data = await response.json();
                setErrors([data.error]);
                console.log("PUT errors ", data.error);
            }


        } catch (error) {
            console.error('Error updating course:', error);
            setErrors(["Failed to update course"]);
            setSuccess(null);
        }
    }

    const handleCancel = (e)=>{
        e.preventDefault();
        navigate(`/${coursePath}`);    
    }

    return (
      <main>
        <>{errors.length > 0 ? <ValidationErrors errors={errors} /> : null}</>
        <div className="notification">
          {success && <span className="success">{success}</span>}
        </div>
        <div className="wrap">
          <h2>Update Course</h2>
          {/* Render course data or a loading state */}
          {courseData ? (
            <form onSubmit={handleSubmit}>
              <div className="main--flex">
                <div>
                  <label htmlFor="courseTitle">Course Title</label>
                  <input
                    id="courseTitle"
                    name="courseTitle"
                    type="text"
                    ref={courseTitle}
                    defaultValue={courseData.title}
                  />

                  <p>
                    By {courseData.Instructor.firstName}{" "}
                    {courseData.Instructor.lastName}
                  </p>

                  <label htmlFor="courseDescription">Course Description</label>
                  <textarea
                    id="courseDescription"
                    name="courseDescription"
                    ref={courseDescription}
                    defaultValue={courseData.description}
                  ></textarea>
                </div>
                <div>
                  <label htmlFor="estimatedTime">Estimated Time</label>
                  <input
                    id="estimatedTime"
                    name="estimatedTime"
                    type="text"
                    ref={estimatedTime}
                    defaultValue={courseData.estimatedTime}
                  />

                  <label htmlFor="materialsNeeded">Materials Needed</label>
                  <textarea
                    id="materialsNeeded"
                    name="materialsNeeded"
                    ref={materialsNeeded}
                    defaultValue={courseData.materialsNeeded}
                  ></textarea>
                </div>
              </div>
              <button className="button" type="submit">
                Update Course
              </button>
              <button
                className="button button-secondary"
                onClick={handleCancel}
              >
                Cancel
              </button>
            </form>
          ) : (
            <p>Loading...</p>
          )}
        </div>
      </main>
    );
};

export default CourseUpdate;
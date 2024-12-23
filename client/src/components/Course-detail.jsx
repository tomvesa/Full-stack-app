import  { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import ReactMarkdown from 'react-markdown'
import api from '../utils/dataFetch';
import ValidationErrors from './ValidationError';
import UserContext from '../context/UserContext';

const CourseDetail = () => {
    const navigate = useNavigate();

   //check if the user has already logged in from the context
    const { authUser } = useContext(UserContext);
    
    // states for the course data, success message and error messages
    const [courseData, setCourseData] = useState(null);
    const [success, setSuccess] = useState(null);
    const [errors, setErrors] = useState([]);
    // Get path name without "/" to be used in the API call
    const path = location.pathname.substring(1);

    // call API to get the course data
    const callAPI = async () => {
        try {
            const response = await api(`${path}`);
            if (!response.ok) {
               // on response error throw error and redirect to 404
                throw new Error('Network response was not ok ' + response.statusText);
            } else { const data = await response.json();
             setCourseData(data.course);  // Updated to set a single course             
            }
        } catch (error) {
           navigate("/404"); 
           return console.error('Error fetching course:', error);           
        }
    };

    // call API to delete course
    const callDeleteAPI = async() =>{
        try {
          // call course API with Delete Method
            const response = await api(`${path}`, "DELETE");
            if (response.status === 204) {
              // on success set success message and redirect to main page after 2s delay
                setSuccess("Course deleted successfully");
                setTimeout(() =>{
                    navigate("/");
                }, 2000);
            } else if (response.status === 403){
              // on authorisation error set error, display message and redirect to main page after 2s delay
                setErrors(["Not authorized to delete this course"]);
                setTimeout(() =>{
                    navigate("/");
                }, 2000);
            } else {
              // if different errors redirect to 404 page
                setErrors(["Course not found"]);
                setTimeout(() =>{
                    navigate("/404");
                }, 2000);
            }
        } catch (error) {
            console.error('Error deleting course:', error);
            navigate("/404");
        }
    }

    useEffect(() => {
        callAPI();
    }, []);

    // on page load start with "Loading..." message before first data is loaded
    if (!courseData) return <div>Loading...</div>;  

    const handleReturn = (e) => {
      // get back to main page
        e.preventDefault();
        navigate('/');
    }

    const handleUpdate = (e) => {
      // redirect to course update page
        e.preventDefault();
        navigate(`/${path}/update`);
    }

    const handleDelete = (e) => {
      // call delete API
        e.preventDefault();
        callDeleteAPI()
    }

    return (
      <main>
        {/* display action bar only when the course is created by logged in user */}
        {authUser && authUser.user.id === courseData.userId ? (
          <div className="actions--bar">
            <div className="wrap">
              <a className="button" onClick={handleUpdate}>
                Update Course
              </a>
              <a className="button" onClick={handleDelete}>
                Delete Course
              </a>
              <a className="button button-secondary" onClick={handleReturn}>
                Return to List
              </a>
            </div>
          </div>
        ) : null}
        <div className="wrap">
          <h2>Course Detail</h2>
          {/* display validation errors if any exists*/}
          <>{errors.length > 0 ? <ValidationErrors errors={errors} /> : null}</>
          <div className="notification">
            {/* display success message if any exists */}
            {success && <span className="success">{success}</span>}
          </div>
          <form>
            <div className="main--flex">
              <div>
                <h3 className="course--detail--title">Course</h3>
                <h4 className="course--name">{courseData.title}</h4>
                <p>
                  By {courseData.Instructor?.firstName}{" "}
                  {courseData.Instructor?.lastName}
                </p>
                <ReactMarkdown>{courseData.description}</ReactMarkdown>
              </div>
              <div>
                <h3 className="course--detail--title">Estimated Time</h3>
                <p>{courseData.estimatedTime || "N/A"}</p>

                <h3 className="course--detail--title">Materials Needed</h3>
                <ul className="course--detail--list">
                <ReactMarkdown>{courseData.materialsNeeded}</ReactMarkdown>
                </ul>
              </div>
            </div>
          </form>
        </div>
      </main>
    );
};

export default CourseDetail;

import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../utils/dataFetch';
import Cookies from 'js-cookie';

import UserContext from '../context/UserContext';

const CourseDetail = () => {
    const navigate = useNavigate();

    // cookie authentication for user
    const cookie = Cookies.get("authenticatedUser");
    console.log("cookie", cookie);
    const {user} = useContext(UserContext).authUser;
    console.log("authUser", user.id);

    const [courseData, setCourseData] = useState(null);
    const [courseMaterials, setCourseMaterials] = useState([]);
    // Get path name without "/" to be used in the API call
    const path = location.pathname.substring(1);

    
    const callAPI = async () => {
        try {
            const response = await api(`${path}`);
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            const data = await response.json();
             setCourseData(data.course);  // Updated to set a single course
             console.log(courseData)

        } catch (error) {
           navigate("/404"); 
           return console.error('Error fetching course:', error);
           
        }
    };

    useEffect(() => {
        callAPI();
    }, []);

    useEffect(() => {
        if (courseData) {
            console.log(courseData); // Will log after course is updated
            if (courseData.materialsNeeded) {
            const materials = courseData.materialsNeeded.split('\n').map(material => material.replace("*","").trim())
            setCourseMaterials( materials ) 
            }
        }
    }, [courseData]);

    if (!courseData) return <div>Loading...</div>;  // Loading state

    const handleReturn = (e) => {
        e.preventDefault();
        navigate('/');
    }

    const handleUpdate = (e) => {
        e.preventDefault();
        navigate(`/${path}/update`);
    }

    return (
        <main>
        {/* display action bar only when the course is created by logged in user */}
         {  user.id === courseData.userId ? 
            <div className="actions--bar">
                <div className="wrap">
                    <a className="button" onClick={handleUpdate}>Update Course</a>
                    <a className="button" href="#">Delete Course</a>
                    <a className="button button-secondary" onClick={handleReturn}>Return to List</a>
                </div>
            </div>
            : null }
            <div className="wrap">
                <h2>Course Detail</h2>
                <form>
                    <div className="main--flex">
                        <div>
                            <h3 className="course--detail--title">Course</h3>
                            <h4 className="course--name">{courseData.title}</h4>
                            <p>By {courseData.Instructor?.firstName} {courseData.Instructor?.lastName}</p>
                            <p className="course--description">{courseData.description}</p>
                        </div>
                        <div>
                            <h3 className="course--detail--title">Estimated Time</h3>
                            <p>{courseData.estimatedTime || "N/A"}</p>

                            <h3 className="course--detail--title">Materials Needed</h3>
                            <ul className="course--detail--list">
                            {courseMaterials.map((material, index) => (
                                    material ?
                                    <li key={index}>{material}</li>:
                                    ""                                    
                                ))}

                            </ul>
                        </div>
                    </div>
                </form>
            </div>
        </main>
    );
};

export default CourseDetail;

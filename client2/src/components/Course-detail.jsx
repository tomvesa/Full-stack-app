import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../utils/dataFetch';

const CourseDetail = () => {
    const navigate = useNavigate();
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

    return (
        <>
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
        </>
    );
};

export default CourseDetail;

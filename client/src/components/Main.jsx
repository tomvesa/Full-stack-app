import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import api from '../utils/dataFetch.jsx';
import CourseButton from './courseButton.jsx';
import AddNewCourse from './CourseAddNewButton';


const Main = () =>{
  // main page/home page with all courses buttons
    const navigate = useNavigate();
  // state for all courses data  
    const [courses, setCourses] = useState([]);
   

    const callAPI = async () => {
      // get all courses data
        try {
          const response = await api("courses");
          
          if (!response.ok) {
            // on response error redirect to error page
            throw new Error('Network response was not ok ' + response.statusText);
          } else {
          // set courses data  
          const data = await response.json();
          setCourses(data.courses);
          }
        } catch (error) {
          console.error('Error fetching courses:', error);
          navigate("/error");
        }
      };
    
     useEffect(() =>{
        callAPI();
     }, [] );
      

    return (
        <main>
            <h2>Course List</h2>
            <div className="wrap main--grid">
            {/** iterate through course data to display buttons */}
            {courses.map((item, index) =>(
                <CourseButton 
                    key={index}
                    title={item.title}
                    id={item.id}
                />
            ))}
            {/* display new course button at the end of the courses list*/ }
             <AddNewCourse />
            </div>

        </main>
    )
}

export default Main
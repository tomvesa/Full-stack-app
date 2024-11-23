import { useEffect, useState, useContext } from 'react'
import api from '../utils/dataFetch.jsx';
import CourseButton from './courseButton.jsx';
import AddNewCourse from './CourseAddNewButton';
import UserContext from '../context/UserContext.jsx';

const Main = () =>{
    const [courses, setCourses] = useState([]);
    const {authUser} = useContext(UserContext);

    const callAPI = async () => {
        try {
          const response = await api("courses");
          if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
          }
          const data = await response.json();
          setCourses(data.courses);
        } catch (error) {
          console.error('Error fetching courses:', error);
        }
      };
    
     useEffect(() =>{
        callAPI();
     }, [] );
      

    return (
        <main>
            <h2>Course List</h2>
            <div className="wrap main--grid">
            {courses.map((item, index) =>(
                <CourseButton 
                    key={index}
                    title={item.title}
                    id={item.id}
                />
            ))}
            {authUser ?
            <>
             <AddNewCourse />
            </>
            : null
            }

            </div>

        </main>
    )
}

export default Main
import { Routes, Route, Navigate } from 'react-router-dom'
import Main from './components/Main.jsx';
import CourseDetail from './components/Course-detail';
import NotFound from './components/NotFound';
import CourseCreate from './components/Course-create';
import CourseUpdate from './components/Course-update';
import UserSignUp from './components/User-Sign-Up';
import UserSignIn from './components/User-Sign-In';


const AppRoutes = () =>{
    return ( 

            <Routes>
                <Route exact path="/" element={<Main />} />
                <Route path="/courses" element={<Navigate to="/" />} />
                <Route path="/courses/:id" element={<CourseDetail />} />
                <Route path="/courses/:id/update" element={<CourseUpdate />} />
                <Route path="/courses/create" element={<CourseCreate />} />
                <Route path="/users/signup" element={<UserSignUp />} />
                <Route path="users/signin" element={<UserSignIn />} />
                <Route path="/404" element={<NotFound />} />
            </Routes>

    )
}

export default AppRoutes;
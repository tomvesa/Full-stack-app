import { Routes, Route, Navigate } from 'react-router-dom'
import Main from './components/Main.jsx';
import CourseDetail from './components/Course-detail';
import NotFound from './components/NotFound';
import CourseCreate from './components/Course-create';
import CourseUpdate from './components/Course-update';
import UserSignUp from './components/User-Sign-Up';
import UserSignIn from './components/User-Sign-in';
import PrivateRoute from './components/PrivateRoute';
import Forbidden from './components/Forbidden';
import Error from './components/Error';


const AppRoutes = () =>{
    return (
      <Routes>
        <Route exact path="/" element={<Main />} />

        <Route path="/courses" element={<Navigate to="/" />} />
        <Route path="/courses/:id" element={<CourseDetail />} />
        <Route element={<PrivateRoute />}>
          <Route path="/courses/:id/update" element={<CourseUpdate />} />
          <Route path="/courses/create" element={<CourseCreate />} />
        </Route>
        
        <Route path="/users/signup" element={<UserSignUp />} />
        <Route path="users/signin" element={<UserSignIn />} />

        <Route path="/forbidden" element={<Forbidden />} />
        <Route path="/404" element={<NotFound />} />        
        <Route path="/error" element={<Error />} />
        
        <Route path="*" element={<Navigate to="/404"  />} />

      </Routes>
    );
}

export default AppRoutes;
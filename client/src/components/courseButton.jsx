import {useNavigate} from 'react-router-dom'

const CourseButton = (props) => {
    // general course button to redirect to course details page
    const navigate = useNavigate();
    // get id and title of the course from props 
    const{id, title} = props;

    const handleClick = (e) => {
        e.preventDefault();
        navigate(`/courses/${id}`);
    }

    return (
                <a className="course--module course--link" onClick={handleClick} data-course-id={id}>
                    <h2 className="course--label">Course</h2>
                    <h3 className="course--title">{title}</h3>
                </a>
    )
}

export default CourseButton;
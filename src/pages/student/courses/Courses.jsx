import Card from '../../../components/shared/Card';
import img from '../../../assets/images/student/7040859.jpg';
import { useGetStudentCourses } from '../../../api/student/courses';
import { useNavigate } from 'react-router-dom';

const Courses = () => {
  const { data, error, isLoading } = useGetStudentCourses();
  const navigate = useNavigate();

  // Handle loading state
  if (isLoading) {
    return <p>Loading courses...</p>;
  }

  // Handle error state
  if (error) {
    return (
      <div className="alert alert-danger" role="alert">
        Error: {error?.response?.data?.message || 'Failed to fetch courses'}
      </div>
    );
  }

  // Handle case where there are no courses
  if (!data || data?.length === 0) {
    return (
      <div className="text-center">
        <img src={img} alt="No courses" className="img-fluid" style={{ maxWidth: '300px' }} />
        <h4 className="mt-3">No courses found</h4>
        <p>You are not enrolled in any courses yet.</p>
        <button
          onClick={() => {
            navigate('/student/home');
          }}
          className="btn btn-outline-purple"
        >
          Enroll Now
        </button>
      </div>
    );
  }

  // Display courses
  return (
    <div>
      <h3 className="mb-3">Courses</h3>
      <div className="row row-cols-1 row-cols-md-3 g-4 mx-0" style={{ overflowX: 'hidden' }}>
        {data?.map((course) => (
          <div className="col" key={course.c_id}>
            <Card
              title={course.c_name}
              description={course.c_description}
              img={course.image || img} // Fallback image if course.image is not provided
              id={course.c_id}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Courses;

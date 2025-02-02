import { useParams } from 'react-router-dom';
import { useGetCourseById } from '../../../api/student/courses';
import { useEnrollCourse } from '../../../api/student/courses'; // Import the enroll hook
import { showToast } from '../../../utils/toast';
import { Toast } from 'react-bootstrap';
import { ToastContainer } from 'react-toastify';

const CourseById = () => {
  const { id } = useParams();
  const { data: course, isLoading, isError } = useGetCourseById(id);
  const enrollMutation = useEnrollCourse(); // Initialize the enroll mutation

  const handleEnroll = () => {
    enrollMutation.mutate(id, {
      onSuccess: () => {
        showToast('Enrolled successfully!'); // Show success message
      },
      onError: (error) => {
        showToast(error.response?.data?.message || 'Failed to enroll in the course.', 'error'); // Show error message
      },
    });
  };

  if (isLoading) {
    return <p>Loading course details...</p>;
  }

  if (isError) {
    return <p>Error fetching course details.</p>;
  }

  return (
    <>
      <div className="container mt-5">
        <h3>Course Details</h3>
        {course ? (
          <div>
            <p>Name: {course.c_name}</p>
            <p>Description: {course.c_description}</p>
            <button
              onClick={handleEnroll}
              className="btn btn-outline-purple"
              disabled={enrollMutation.isLoading} // Disable button while enrolling
            >
              {enrollMutation.isLoading ? 'Enrolling...' : 'Enroll in this Course'}
            </button>
          </div>
        ) : (
          <p>Course not found.</p>
        )}
      </div>
      <ToastContainer />
    </>
  );
};

export default CourseById;

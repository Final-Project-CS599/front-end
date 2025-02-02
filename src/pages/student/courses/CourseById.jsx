import { useParams } from 'react-router-dom';
import { useGetCourseById } from '../../../api/student/courses';
import { useEnrollCourse } from '../../../api/student/courses'; // Import the enroll hook
import { useGetStudentCourses } from '../../../api/student/courses'; // Import the hook to fetch enrolled courses
import { showToast } from '../../../utils/toast';
import { ToastContainer } from 'react-toastify';

const CourseById = () => {
  const { id } = useParams();
  const { data: course, isLoading: isCourseLoading, isError: isCourseError } = useGetCourseById(id);
  const { data: enrolledCourses, isLoading: isEnrolledLoading } = useGetStudentCourses(); // Fetch enrolled courses
  const enrollMutation = useEnrollCourse(); // Initialize the enroll mutation

  // Convert id to a number (if c_id is a number)
  const courseId = Number(id);

  // Check if the current course is already enrolled
  const isEnrolled = enrolledCourses?.some(
    (enrolledCourse) => enrolledCourse.c_id === courseId // Use strict equality
  );

  // Debugging logs
  console.log('Course ID:', courseId, typeof courseId);
  console.log('Enrolled Courses:', enrolledCourses);
  console.log('Is Enrolled:', isEnrolled);

  const handleEnroll = () => {
    enrollMutation.mutate(id, {
      onSuccess: () => {
        showToast('Enrolled successfully!', 'success'); // Show success message
      },
      onError: (error) => {
        showToast(error.response?.data?.message || 'Failed to enroll in the course.', 'error'); // Show error message
      },
    });
  };

  if (isCourseLoading || isEnrolledLoading) {
    return <p>Loading course details...</p>;
  }

  if (isCourseError) {
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
            {/* Conditionally render the Enroll button */}
            {!isEnrolled && (
              <button
                onClick={handleEnroll}
                className="btn btn-outline-purple"
                disabled={enrollMutation.isLoading} // Disable button while enrolling
              >
                {enrollMutation.isLoading ? 'Enrolling...' : 'Enroll in this Course'}
              </button>
            )}
            {isEnrolled && <p className="text-success">You are already enrolled in this course.</p>}
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

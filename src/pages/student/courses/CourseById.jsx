import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useGetCourseById } from '../../../api/student/courses';
import { useEnrollCourse } from '../../../api/student/courses';
import { useGetStudentCourses } from '../../../api/student/courses';
import { showToast } from '../../../utils/toast';
import { ToastContainer } from 'react-toastify';
import axios from 'axios';

const CourseById = () => {
  const { id } = useParams();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [receiptFile, setReceiptFile] = useState(null);

  const {
    data: course,
    isLoading: isCourseLoading,
    isError: isCourseError,
    refetch: refetchCourse,
  } = useGetCourseById(id);
  const { data: enrolledCourses, isLoading: isEnrolledLoading, refetch } = useGetStudentCourses();
  const enrollMutation = useEnrollCourse();

  const isEnrolled = enrolledCourses?.some(
    (enrolledCourse) => Number(enrolledCourse.c_id) === Number(id)
  );

  const handleEnroll = () => {
    if (course.c_type === 'Extra' && !isEnrolled) {
      setIsModalOpen(true);
    } else {
      enrollMutation.mutate(id, {
        onSuccess: () => {
          showToast('Enrolled successfully!', 'success');
          refetchCourse();
          refetch();
        },
        onError: (error) => {
          showToast(error.response?.data?.message || 'Failed to enroll in the course.', 'error');
        },
      });
    }
  };

  const handleUploadReceipt = async (e) => {
    e.preventDefault();

    if (!receiptFile) {
      showToast('Please select a file to upload.', 'error');
      return;
    }

    const formData = new FormData();
    formData.append('file', receiptFile);
    formData.append('student_id', id);
    formData.append('course_id', course.c_id);

    try {
      const response = await axios.post(
        'http://localhost:3000/api/v1/student/courses/addPayment',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${localStorage.getItem('userToken')}`,
          },
        }
      );

      if (response.status === 200) {
        showToast('Receipt uploaded and enrolled successfully!', 'success');
        setIsModalOpen(false);
        refetchCourse();
        refetch();
      }
    } catch (error) {
      showToast(error.message || 'Failed to upload receipt and enroll in the course.', 'error');
    }
  };

  if (isCourseLoading || isEnrolledLoading) {
    return <p>Loading course details...</p>;
  }

  if (isCourseError) {
    return <p>Error fetching course details.</p>;
  }

  return (
    <>
      <div className="container">
        {course ? (
          <div className="card-body">
            <h2 className="card-title  mb-4">{course.c_name}</h2>

            {/* Course Category and Type */}
            <div className="mb-3">
              <span className="badge bg-secondary me-2">{course.c_category}</span>
              <span className="badge bg-info">{course.c_type}</span>
            </div>

            {/* Course Description */}
            <p className="card-text mb-4">{course.c_description}</p>

            {/* Schedule */}
            <div className="mb-4">
              <h5 className="mb-3">Schedule</h5>
              <p className="mb-1">
                <strong>Start Date:</strong> {new Date(course.c_start_date).toLocaleString()}
              </p>
              <p>
                <strong>End Date:</strong> {new Date(course.c_end_date).toLocaleString()}
              </p>
            </div>

            {/* Instructor */}
            <div className="mb-4">
              <h5 className="mb-3">Instructor</h5>
              <p className="mb-0">Instructor ID: {course.c_instructorId}</p>
            </div>

            {/* Course ID */}
            <div className="mb-4">
              <h5 className="mb-3">Course ID</h5>
              <p className="mb-0">{course.c_id}</p>
            </div>

            {/* Status */}
            <div className="mb-4">
              <h5 className="mb-3">Status</h5>
              <p className="mb-1">
                <strong>Created At:</strong> {new Date(course.c_created_at).toLocaleString()}
              </p>
              <p className="mb-0">
                <strong>Last Updated:</strong> {new Date(course.c_updated_at).toLocaleString()}
              </p>
            </div>

            {/* Enrollment Section */}
            <div className="text-center">
              {!isEnrolled && (
                <button
                  className="btn btn-outline-purple"
                  onClick={handleEnroll}
                  disabled={enrollMutation.isLoading}
                >
                  {enrollMutation.isLoading
                    ? 'Enrolling...'
                    : course.c_type === 'Extra'
                      ? 'Upload Receipt'
                      : 'Enroll in this Course'}
                </button>
              )}
              {isEnrolled && (
                <p className="text-success mt-3">You are already enrolled in this course.</p>
              )}
            </div>
          </div>
        ) : (
          <p>Course not found.</p>
        )}
      </div>

      {/* Modal for uploading receipt */}
      {isModalOpen && (
        <div className="modal" style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header d-flex justify-content-between">
                <h5 className="modal-title">Upload Receipt</h5>
                <button type="button" className="btn close" onClick={() => setIsModalOpen(false)}>
                  <span>&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <input
                  type="file"
                  name="file"
                  onChange={(e) => setReceiptFile(e.target.files[0])}
                />
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setIsModalOpen(false)}
                >
                  Close
                </button>
                <button
                  type="button"
                  className="btn btn-outline-purple"
                  onClick={handleUploadReceipt}
                >
                  Upload
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <ToastContainer />
    </>
  );
};

export default CourseById;

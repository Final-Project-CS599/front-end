import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGetStudentCourses } from '../../api/student/courses';
import { Table } from 'react-bootstrap';
import { useGetExams } from '../../api/student/quiz';

const CourseDropDownExam = ({ title, type }) => {
  const [selectedOption, setSelectedOption] = useState('');

  const { data, isLoading, isError, error } = useGetExams(selectedOption);
  const {
    data: courses,
    error: coursesError,
    isLoading: isCoursesLoading,
  } = useGetStudentCourses();

  const handleSelectChange = (e) => {
    setSelectedOption(e.target.value);
  };

  const handleViewClick = (link) => {
    window.open(link, '_blank');
  };

  console.log('API Response:', data); // Debugging: Check what data contains

  return (
    <div>
      <h3 className="mb-3">{title}</h3>
      <select
        id="dropdown"
        className="form-select"
        onChange={handleSelectChange}
        value={selectedOption}
        style={{ maxWidth: '200px' }}
        disabled={isCoursesLoading || coursesError}
      >
        <option value="">Select Course</option>
        {courses?.data?.map((course) => (
          <option key={course?.c_id} value={course?.c_id}>
            {course?.c_name}
          </option>
        ))}
      </select>

      {!selectedOption && !isCoursesLoading && !coursesError && (
        <p className="mt-3">Please select a course to view {type}.</p>
      )}

      {isCoursesLoading && <p className="mt-3">Loading courses...</p>}

      {coursesError && (
        <p className="mt-3 text-danger">
          Error fetching courses: {coursesError}. Please try refreshing the page.
        </p>
      )}

      <div className="mt-5">
        {isLoading ? (
          <p>Loading {type}...</p>
        ) : isError ? (
          <p>
            {error?.response?.data?.message}. Please try refreshing the page or selecting a
            different course.
          </p>
        ) : selectedOption && data?.exams?.length > 0 ? ( // FIXED: Changed assignments to exams
          <Table striped bordered hover className="mt-3">
            <thead>
              <tr>
                <th>Course ID</th>
                <th>Title</th>
                <th>Description</th>
                <th>Degree</th>
                <th>Publish Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody className="table-group-divider">
              {data?.exams?.map((row, index) => (
                <tr key={row.e_id || index}>
                  <td>{row.e_courseId}</td>
                  <td>{row.e_title}</td>
                  <td>{row.e_description}</td>
                  <td>{row.e_degree}</td>
                  <td>{new Date(row.e_publish_date).toLocaleDateString()}</td>
                  <td>
                    <button
                      onClick={() => handleViewClick(row.e_link)} // FIXED: Removed row.a_link
                      className="btn btn-outline-primary w-50"
                    >
                      Visit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : selectedOption && data?.exams?.length === 0 ? ( // FIXED: Changed assignments to exams
          <p>No {type} found for the selected course.</p>
        ) : null}
      </div>
    </div>
  );
};

export default CourseDropDownExam;

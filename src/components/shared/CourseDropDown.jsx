import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGetStudentCourses } from '../../api/student/courses';
import { Table } from 'react-bootstrap';

const CourseDropDown = ({ title, type, fetchData }) => {
  const [selectedOption, setSelectedOption] = useState('');
  const navigate = useNavigate();

  const { data, isLoading, isError, error } = fetchData(selectedOption);
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

      {/* Display message if no course is selected */}
      {!selectedOption && !isCoursesLoading && !coursesError && (
        <p className="mt-3">Please select a course to view {type}.</p>
      )}

      {/* Display loading state for courses */}
      {isCoursesLoading && <p className="mt-3">Loading courses...</p>}

      {/* Display error state for courses */}
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
        ) : selectedOption && data?.assignments?.length > 0 ? (
          <Table striped bordered hover className="mt-3">
            <thead>
              <tr>
                <th>Course ID</th>
                <th>Title</th>
                <th>Description</th>
                <th>Degree</th>
                <th>Publish date</th>
                <th>Type</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody className="table-group-divider">
              {data?.assignments?.map((row, index) => (
                <tr key={row.a_id || index}>
                  <td>{row.a_courseId}</td>
                  <td>{row.a_title}</td>
                  <td>{row.a_description}</td>
                  <td>{row.a_degree || row.e_degree}</td>
                  <td>{new Date(row.a_publish_date || row.e_publish_date).toLocaleDateString()}</td>
                  <td>{row.a_type ? (row.a_type === 'extra' ? 'Extra' : 'Final Exam') : 'Exam'}</td>
                  <td>
                    <button
                      onClick={() => handleViewClick(row.a_link || row.e_link)}
                      className="btn btn-outline-primary w-50"
                    >
                      Visit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : selectedOption && data?.assignments?.length === 0 ? (
          <p>No {type} found for the selected course.</p>
        ) : null}
      </div>
    </div>
  );
};

export default CourseDropDown;

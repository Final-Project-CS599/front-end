import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGetStudentCourses } from '../../api/student/courses';

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

  const handleViewClick = (id) => {
    if (type === 'quizzes') {
      navigate(`/student/quizzes/${id}`);
    } else if (type === 'assignments') {
      navigate(`/student/assignments/${id}`);
    }
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
        {courses?.map((course) => (
          <option key={course.c_id} value={course.c_id}>
            {course.c_name}
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
        ) : selectedOption && data?.length > 0 ? (
          <table className="table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Start Date</th>
                <th>End Date</th>
                <th>Degree</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody className="table-group-divider">
              {data.map((row) => (
                <tr key={row.id}>
                  <td>{row.id}</td>
                  <td>{row.Name}</td>
                  <td>{row.StartDate}</td>
                  <td>{row.EndDate}</td>
                  <td>{row.Degree}</td>
                  <td>
                    <button
                      onClick={() => handleViewClick(row.id)}
                      className="btn btn-outline-purple w-50"
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : selectedOption && data?.length === 0 ? (
          <p>No {type} found for the selected course.</p>
        ) : null}
      </div>
    </div>
  );
};

export default CourseDropDown;

import React, { useEffect, useState } from 'react';
import { HelmetProvider, Helmet } from 'react-helmet-async';
import { useGetAllAcademicCourses } from '../../../../api/admin/courses/Academic';
import { Link, useLocation } from 'react-router-dom';
import { buttonStyle, handleMouseEnter, handleMouseLeave } from '../index';

function AllAcademic() {
  const [courses, setCourses] = useState([]);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const departmentId = queryParams.get('departmentId'); // Get department ID from query params

  const { data, isLoading, error } = useGetAllAcademicCourses();

  useEffect(() => {
    if (data && data.data) {
      if (departmentId) {
        const filteredCourses = data.data.filter(
          (course) => course.departmentId === parseInt(departmentId)
        );
        setCourses(filteredCourses);
      } else {
        setCourses(data.data);
      }
    }
  }, [data, departmentId]);

  if (isLoading) {
    return <p className="text-center mt-4">Loading...</p>;
  }

  if (error) {
    return <p className="text-center text-danger mt-4">Error: {error.message}</p>;
  }

  return (
    <HelmetProvider>
      <Helmet>
        <meta name="description" content="Browse all academic courses." />
        <title>All - Academic Courses</title>
      </Helmet>

      <div className="container">
        <div className="d-flex justify-content-between align-items-center">
          <h2 className="">All Courses</h2>

          {/* Button to add a new course */}
          <div className="d-flex justify-content-end gap-3">
            <Link
              to="/admin/addnewcourseacadmic"
              className="btn"
              style={buttonStyle}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              Add New Academic Course
            </Link>
            <Link
              to="/admin/deletecourse"
              className="btn"
              style={buttonStyle}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              Delete Course
            </Link>
          </div>
        </div>

        {/* Display courses */}
        <div className="row mt-4">
          {courses.length > 0 ? (
            courses.map((course) => (
              <div key={course.id} className="col-md-4 mb-4">
                <div
                  className="p-4 rounded shadow"
                  style={{
                    backgroundColor: '#f9f9f9',
                    border: '1px solid #ddd',
                    borderRadius: '10px',
                    cursor: 'pointer',
                    transition: 'transform 0.2s ease',
                  }}
                >
                  {/* Course Name */}
                  <h4 className="text-center mb-3" style={{ color: '#4a028a', fontWeight: 'bold' }}>
                    {course.name}
                  </h4>

                  {/* Course Details */}
                  <p>
                    <strong>Course Name:</strong> {course.courseName}
                  </p>
                  <p>
                    <strong>Course Code:</strong> {course.courseCode}
                  </p>
                  <p>
                    <strong>Instructor:</strong> {course.instructorName}
                  </p>
                  <p>
                    <strong>Department:</strong> {course.departmentName}
                  </p>
                  <p>
                    <strong>Category:</strong> {course.category}
                  </p>
                  <p>
                    <strong>Description:</strong> {course.description}
                  </p>
                  <p>
                    <strong>Start Date:</strong> {new Date(course.startDate).toLocaleDateString()}
                  </p>
                  <p>
                    <strong>End Date:</strong> {new Date(course.endDate).toLocaleDateString()}
                  </p>
                  <Link
                    to={`/admin/courses/academic/update/${course.id}`}
                    className="btn btn-primary"
                  >
                    Update
                  </Link>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center">No courses available.</p>
          )}
        </div>
      </div>
    </HelmetProvider>
  );
}

export default AllAcademic;

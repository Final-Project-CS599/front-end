import React, { useEffect, useState } from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { useGetAllExtraCourses } from '../../../../api/admin/courses/Extra';
import { Link, useLocation } from 'react-router-dom';
import { buttonStyle, handleMouseEnter, handleMouseLeave } from '../index';

function AllExtra() {
  const [courses, setCourses] = useState([]);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const section = queryParams.get('section'); // Get the section parameter from the URL
  const { data, isLoading, error } = useGetAllExtraCourses();

  useEffect(() => {
    if (data) {
      // Filter courses based on the section parameter if it exists
      const filteredCourses = section
        ? data.data.filter((course) => course.sections === section)
        : data.data;
      setCourses(filteredCourses);
    }
  }, [data, section]); // Re-run the effect when `data` or `section` changes

  if (isLoading) {
    return <div className="container mt-4 text-center">Loading courses...</div>;
  }

  if (error) {
    return <div className="container mt-4 text-center text-danger">Error: {error}</div>;
  }

  return (
    <HelmetProvider>
      <Helmet>
        <meta name="description" content="Browse all Extra courses." />
        <title>All - Extra Courses</title>
      </Helmet>

      <div className="container mt-4">
        <div className="d-flex justify-content-between align-items-center">
          <h3 className="">All Extra Courses</h3>

          {/* Button to add a new course */}
          <div className="d-flex justify-content-end gap-3">
            <Link
              to="/admin/addnewcourseextra"
              className="btn"
              style={buttonStyle}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              Add New Extra Course
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
          {courses?.length > 0 ? (
            courses?.map((course) => (
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
                    <strong>Course Code:</strong> {course.CourseCode}
                  </p>
                  <p>
                    <strong>Instructor:</strong> {course.instructorName}
                  </p>
                  <p>
                    <strong>Section:</strong> {course.sections}
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
                  <Link to={`/admin/courses/extra/update/${course.id}`} className="btn btn-primary">
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

export default AllExtra;

import React, { useEffect, useState } from 'react';
import { HelmetProvider, Helmet } from 'react-helmet-async';
import { useGetAllAcademicCourses } from '../../../api/admin/courses/Academic';

function AllAcademic() {
  const [courses, setCourses] = useState([]);

  // Fetch data using the custom hook
  const { data, isLoading, error } = useGetAllAcademicCourses();

  // Update the courses state when data changes
  useEffect(() => {
    if (data && data.data) {
      setCourses(data.data); // Assuming data.data contains the array of courses
    }
  }, [data]);

  // Handle loading and error states
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

      <div className="container mt-4">
        <h2
          className="text-center text-white p-3 rounded shadow"
          style={{ backgroundColor: '#4a028a', fontSize: '28px' }}
        >
          All Academic Courses
        </h2>

        {/* Button to add a new course */}
        <div className="d-flex justify-content-end mt-3">
          <a
            href="/admin/addnewcourseacadmic"
            className="btn"
            style={{
              backgroundColor: '#ffffff',
              color: '#7F55E0',
              border: '2px solid #7F55E0',
              borderRadius: '15px',
              padding: '10px 20px',
              fontSize: '20px',
              fontWeight: 'bold',
              textDecoration: 'none',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
            }}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = '#7F55E0';
              e.target.style.color = '#ffffff';
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = '#ffffff';
              e.target.style.color = '#7F55E0';
            }}
          >
            Add New Academic Course
          </a>
        </div>

        {/* Button to delete a course */}
        <div className="d-flex justify-content-end mt-3">
          <a
            href="/admin/deletecourse"
            className="btn"
            style={{
              backgroundColor: '#ffffff',
              color: '#7F55E0',
              border: '2px solid #7F55E0',
              borderRadius: '15px',
              padding: '10px 20px',
              fontSize: '20px',
              fontWeight: 'bold',
              textDecoration: 'none',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
            }}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = '#7F55E0';
              e.target.style.color = '#ffffff';
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = '#ffffff';
              e.target.style.color = '#7F55E0';
            }}
          >
            Delete Course
          </a>
        </div>

        {/* Display courses */}
        <div className="row mt-4">
          {courses.length > 0 ? (
            courses.map((course) => (
              <div key={course.id} className="col-md-4 mb-4">
                <a href={course.link || '#'} style={{ textDecoration: 'none', color: '#000000' }}>
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
                    <h4
                      className="text-center mb-3"
                      style={{ color: '#4a028a', fontWeight: 'bold' }}
                    >
                      {course.name}
                    </h4>

                    {/* Course Details */}
                    <p>
                      <strong>Course Code:</strong> {course.code}
                    </p>
                    <p>
                      <strong>Instructor:</strong> {course.instructor}
                    </p>
                    <p>
                      <strong>Department:</strong> {course.department}
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
                  </div>
                </a>
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

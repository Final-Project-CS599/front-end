import React, { useState, useEffect } from 'react';
import { HelmetProvider, Helmet } from 'react-helmet-async';
import { useGetAllCourses } from '../../../../api/admin/courses/courses';
import { Link } from 'react-router-dom';
import { buttonStyle, handleMouseEnter, handleMouseLeave } from '../index.js';

function AllCourses() {
  const [courses, setCourses] = useState([]);

  const { data, isLoading, error } = useGetAllCourses();

  useEffect(() => {
    if (data) {
      setCourses(data?.data);
    }
  }, [data]);

  if (isLoading) {
    return <div className="container mt-4 text-center">Loading courses...</div>;
  }

  if (error) {
    return <div className="container mt-4 text-center text-danger">Error: {error}</div>;
  }

  return (
    <HelmetProvider>
      <Helmet>
        <meta name="description" content="Browse all courses." />
        <title>All Courses</title>
      </Helmet>

      <div className="container mt-4">
        <div className="d-flex justify-content-between align-items-center">
          <h2 className="">All Courses</h2>
          <div className="d-flex justify-content-end gap-3">
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

        {courses.length === 0 ? (
          <p className="text-center mt-4">No courses available.</p>
        ) : (
          <div className="row mt-4">
            {courses?.map((course, index) => (
              <div key={index} className="col-md-4 mb-4">
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
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'scale(1.03)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'scale(1)';
                    }}
                  >
                    <h4
                      className="text-center mb-3"
                      style={{ color: '#4a028a', fontWeight: 'bold' }}
                    >
                      {course.courseName}
                    </h4>
                    <p>
                      <strong>Instructor:</strong> {course.instructorName || 'Unknown'}
                    </p>
                    <p>
                      <strong>Type:</strong> {course.courseType}
                    </p>
                    <p>
                      <strong>Category:</strong> {course.courseCategory}
                    </p>
                    <p>{course.courseDescription}</p>
                    <p>
                      <strong>Start Date:</strong> {course.courseStartDate}
                    </p>
                    <p>
                      <strong>End Date:</strong> {course.courseEndDate}
                    </p>
                  </div>
                </a>
              </div>
            ))}
          </div>
        )}
      </div>
    </HelmetProvider>
  );
}

export default AllCourses;

import React from 'react';
import { useParams } from 'react-router-dom';

const CourseById = () => {
  const { id } = useParams();

  // Fetch course data by ID (mock data for now)
  const courseData = {
    1: { name: 'CS500', description: 'Introduction to Computer Science' },
    2: { name: 'CS505', description: 'Advanced Computer Science' },
  };

  const course = courseData[id] || {};

  return (
    <div>
      <h3>Course Details</h3>
      {course.name ? (
        <div>
          <p>Name: {course.name}</p>
          <p>Description: {course.description}</p>
        </div>
      ) : (
        <p>Course not found.</p>
      )}
    </div>
  );
};

export default CourseById;

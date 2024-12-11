import React from 'react';
import { useParams } from 'react-router-dom';

const InstructorById = () => {
  const { id } = useParams();

  // Fetch instructor data by ID (mock data for now)
  const instructorData = {
    1: { name: 'John Doe', subject: 'Mathematics' },
    2: { name: 'Jane Smith', subject: 'Physics' },
  };

  const instructor = instructorData[id] || {};

  return (
    <div>
      <h3>Instructor Details</h3>
      {instructor.name ? (
        <div>
          <p>Name: {instructor.name}</p>
          <p>Subject: {instructor.subject}</p>
        </div>
      ) : (
        <p>Instructor not found.</p>
      )}
    </div>
  );
};

export default InstructorById;

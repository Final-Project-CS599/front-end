import React from 'react';
import { useParams } from 'react-router-dom';

const AssignmentById = () => {
  const { id } = useParams();

  // Fetch assignment data by ID (mock data for now)
  const assignmentData = {
    1: { title: 'Assignment 1', dueDate: '1-1-2024' },
    2: { title: 'Assignment 2', dueDate: '15-1-2024' },
  };

  const assignment = assignmentData[id] || {};

  return (
    <div>
      <h3>Assignment Details</h3>
      {assignment.title ? (
        <div>
          <p>Title: {assignment.title}</p>
          <p>Due Date: {assignment.dueDate}</p>
        </div>
      ) : (
        <p>Assignment not found.</p>
      )}
    </div>
  );
};

export default AssignmentById;

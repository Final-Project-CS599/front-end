import React from 'react';
import { useParams } from 'react-router-dom';
import { useGetInstructorById } from '../../api/student/instructor';

const InstructorById = () => {
  const { id } = useParams();
  const { data, isLoading, error } = useGetInstructorById(id);

  const instructor = data?.data || {};

  if (isLoading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mt-5">
        <div className="alert alert-danger" role="alert">
          <h4 className="alert-heading">Error Fetching Instructor Details</h4>
          <p>{error.message || 'An error occurred while fetching instructor details.'}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container ">
      <h3 className=" mb-4">Instructor Details</h3>
      {instructor.First_Name ? (
        <div className="">
          <h2 className="mb-4">
            {instructor.First_Name} {instructor.Last_Name}
          </h2>
          <h6 className=" mb-3 text-muted">
            Instructor ID: <span className="badge bg-secondary">{instructor.Instructor_ID}</span>
          </h6>
          <p className="">
            <strong>Courses Taught:</strong>
          </p>
          <p>{instructor.Courses}</p>
        </div>
      ) : (
        <div className="alert alert-warning text-center" role="alert">
          Instructor not found.
        </div>
      )}
    </div>
  );
};

export default InstructorById;

import React from "react";
import { useParams } from "react-router-dom";
import { useGetInstructorById } from "../../api/student/instructor";

const InstructorById = () => {
  const { id } = useParams();
  const { data, isLoading, error } = useGetInstructorById(id);

  if (isLoading) return <p>Loading instructor details...</p>;
  if (error) return <p>Error fetching instructor details.</p>;

  const instructor = data?.data || {};

  return (
    <div>
      <h3>Instructor Details</h3>
      {instructor.First_Name ? (
        <div>
          <p>
            Name: {instructor.First_Name} {instructor.Last_Name}
          </p>
          <p>Courses: {instructor.Courses}</p>
        </div>
      ) : (
        <p>Instructor not found.</p>
      )}
    </div>
  );
};

export default InstructorById;

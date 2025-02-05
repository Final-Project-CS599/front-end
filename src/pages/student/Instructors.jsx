import React from 'react';
import { useGetInstructors } from '../../api/student/instructor';
import InstructorCard from '../../components/shared/InstructorCard';

const Instructors = () => {
  const { data, isLoading, error } = useGetInstructors();

  if (isLoading) return <p>Loading instructors...</p>;
  if (error) return <p>Error fetching instructors.</p>;

  return (
    <div>
      <h3 className="mb-3">Instructors</h3>
      {data?.data?.length === 0 ? (
        <div className="text-center">
          <h4>No instructors found</h4>
          <p>You don't have any instructors yet.</p>
        </div>
      ) : (
        <div className="row row-cols-1 row-cols-md-3 g-4">
          {data?.data?.map((instructor) => (
            <div key={instructor.Instructor_ID} className="col">
              <InstructorCard
                id={instructor.Instructor_ID}
                name={`${instructor.First_Name} ${instructor.Last_Name}`}
                department={instructor.Department_Name}
                image={
                  'https://upload.wikimedia.org/wikipedia/commons/a/a2/Person_Image_Placeholder.png'
                }
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Instructors;

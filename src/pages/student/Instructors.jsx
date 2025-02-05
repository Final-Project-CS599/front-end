import React from 'react';
import InstructorCard from '../../components/shared/InstructorCard';
import Inst3 from '../../assets/images/Inst3.jpg';
import Inst1 from '../../assets/images/Inst1.jpg';
import Inst2 from '../../assets/images/Inst2.jpg';
import { useGetInstructors } from '../../api/student/instructor';

const Instructors = () => {
  const { data } = useGetInstructors();
  return (
    <div>
      <h3 className="mb-3">Instructors</h3>
      {data?.data?.length === 0 ? (
        <div className="d-flex flex-column align-items-center justify-content-center text-center ">
          <h4 className="mt-3">No instructors found</h4>
          <p>You don't have any instructors yet.</p>
        </div>
      ) : (
        data?.data?.map((instructor) => (
          <div key={instructor.Instructor_ID} className="row row-cols-1 row-cols-md-3 g-4">
            <div className="col ">
              <InstructorCard
                title={instructor.First_Name + ' ' + instructor.Last_Name}
                description={instructor.department}
                Image={Inst1}
                id={instructor.Instructor_ID}
              />
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default Instructors;

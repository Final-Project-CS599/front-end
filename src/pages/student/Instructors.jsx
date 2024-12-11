import React from 'react';
import InstructorCard from '../../components/shared/InstructorCard';
import Inst3 from '../../assets/images/Inst3.jpg';
import Inst1 from '../../assets/images/Inst1.jpg';
import Inst2 from '../../assets/images/Inst2.jpg';

const Instructors = () => {
  return (
    <div>
      <h3>Instructors</h3>
      <div className="row row-cols-1 row-cols-md-3 g-4">
        <div className="col ">
          <InstructorCard
            title={'Dr Nora'}
            description={'Department: Computer Science'}
            Image={Inst3}
            onclick={() => console.log('jfhsdjkfh')}
          />
        </div>
        <div className="col ">
          <InstructorCard
            title={'Dr Fathy'}
            description={'Department: IT'}
            Image={Inst1}
            onclick={() => console.log('jfhsdjkfh')}
          />
        </div>
        <div className="col ">
          <InstructorCard
            title={'Dr Ramy'}
            description={'Department: Mathimatics'}
            Image={Inst2}
            onclick={() => console.log('jfhsdjkfh')}
          />
        </div>
      </div>
    </div>
  );
};

export default Instructors;

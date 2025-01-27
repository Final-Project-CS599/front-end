import React from 'react';
import CourseDropDown from '../../components/shared/CourseDropDown';

const assignmentsData = {
  option1: [
    { id: 1, Name: 'Assignment 1', StartDate: '1-1-2024', EndDate: '5-1-2024', Degree: '5' },
    { id: 2, Name: 'Assignment 2', StartDate: '15-1-2024', EndDate: '20-1-2024', Degree: '4' },
  ],
  option2: [
    { id: 1, Name: 'Assignment 3', StartDate: '1-1-2024', EndDate: '5-1-2024', Degree: '5' },
    { id: 2, Name: 'Assignment 4', StartDate: '15-1-2024', EndDate: '20-1-2024', Degree: '4' },
  ],
  option3: [
    { id: 1, Name: 'Assignment 5', StartDate: '1-1-2024', EndDate: '5-1-2024', Degree: '5' },
    { id: 2, Name: 'Assignment 6', StartDate: '15-1-2024', EndDate: '20-1-2024', Degree: '4' },
  ],
};

const Assignments = () => {

c

  return (
    <div>
      <CourseDropDown title="Assignments"  type="assignments" />
    </div>
  );
};

export default Assignments;

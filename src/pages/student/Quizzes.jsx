import React from 'react';
import CourseDropDown from '../../components/shared/CourseDropDown';

const quizzesData = {
  option1: [
    { id: 1, Name: 'Quiz 1', StartDate: '1-1-2024', EndDate: '5-1-2024', Degree: '5' },
    { id: 2, Name: 'Quiz 2', StartDate: '15-1-2024', EndDate: '20-1-2024', Degree: '4' },
  ],
  option2: [
    { id: 1, Name: 'Quiz 3', StartDate: '1-1-2024', EndDate: '5-1-2024', Degree: '5' },
    { id: 2, Name: 'Quiz 4', StartDate: '15-1-2024', EndDate: '20-1-2024', Degree: '4' },
  ],
  option3: [
    { id: 1, Name: 'Quiz 5', StartDate: '1-1-2024', EndDate: '5-1-2024', Degree: '5' },
    { id: 2, Name: 'Quiz 6', StartDate: '15-1-2024', EndDate: '20-1-2024', Degree: '4' },
  ],
};

const Quizzes = () => {
  return (
    <div>
      <CourseDropDown title="Quizzes" data={quizzesData} type="quizzes" />
    </div>
  );
};

export default Quizzes;

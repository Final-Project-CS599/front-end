import React from 'react';
import CourseDropDown from '../../components/shared/CourseDropDown';
import { useGetExams } from '../../api/student/quiz';

const Quizzes = () => {
  return (
    <div>
      <CourseDropDown title="Quizzes" fetchData={useGetExams} type="quizzes" />
    </div>
  );
};

export default Quizzes;

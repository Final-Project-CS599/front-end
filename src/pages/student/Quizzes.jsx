import React from 'react';
import CourseDropDown from '../../components/shared/CourseDropDown';
import { useGetExams } from '../../api/student/quiz';
import CourseDropDownExam from '../../components/shared/CourseDropDownExam';

const Quizzes = () => {
  return (
    <div>
      <CourseDropDownExam title="Quizzes" type="quizzes" />
    </div>
  );
};

export default Quizzes;

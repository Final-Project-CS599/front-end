import React from 'react';
import { useParams } from 'react-router-dom';

const QuizById = () => {
  const { id } = useParams();

  // Fetch quiz data by ID (mock data for now)
  const quizData = {
    1: { title: 'Quiz 1', dueDate: '1-1-2024' },
    2: { title: 'Quiz 2', dueDate: '15-1-2024' },
  };

  const quiz = quizData[id] || {};

  return (
    <div>
      <h3>Quiz Details</h3>
      {quiz.title ? (
        <div>
          <p>Title: {quiz.title}</p>
          <p>Due Date: {quiz.dueDate}</p>
        </div>
      ) : (
        <p>Quiz not found.</p>
      )}
    </div>
  );
};

export default QuizById;

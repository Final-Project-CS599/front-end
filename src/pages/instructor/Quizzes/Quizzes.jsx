import { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Table, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useDeleteExam, useGetExam } from '../../../api/instructor/exam';

const QuizzesInstructor = () => {
  const [exams, setExams] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const { data, isLoading, isError, refetch } = useGetExam();
  const { mutate } = useDeleteExam();

  //
  // Handle loading state
  if (isLoading) {
    return <p>Loading exams...</p>;
  }

  // Handle error state
  if (isError) {
    return (
      <Alert variant="danger" className="mt-4">
        Error fetching exams. Please try again later.
      </Alert>
    );
  }

  // Handle empty data
  if (!data || data?.data?.length === 0) {
    return (
      <div className="container mt-4">
        <div className="d-flex justify-content-between">
          <h2>Exams List</h2>
          <Button
            className="mb-3 btn-outline-purple"
            onClick={() => navigate('/instructor/Quizzes/Quizzes-details')}
          >
            Add Exam
          </Button>
        </div>
        <Alert variant="info" className="mt-3">
          No exams found. Click "Add Exam" to create a new exam.
        </Alert>
      </div>
    );
  }

  const handleDelete = async (id) => {
    mutate(id, {
      onSuccess: () => {
        refetch();
      },
      onError: (error) => {
        setError(error);
      },
    });
  };

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between">
        <h2>Exams List</h2>
        <Button
          className="mb-3 btn-outline-purple"
          onClick={() => navigate('/instructor/Quizzes/Quizzes-details')}
        >
          Add Exam
        </Button>
      </div>

      {error && <Alert variant="danger">{error}</Alert>}

      <Table striped bordered hover className="mt-3">
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Degree</th>
            <th>Type</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data?.data?.map((exam) => (
            <tr key={exam.e_id}>
              <td>{exam.e_title}</td>
              <td>{exam.e_description}</td>
              <td>{exam.e_degree}</td>
              <td>{exam.e_type === 'mid-term' ? 'Mid-Term' : 'Final Exam'}</td>
              <td>
                <Button
                  variant="warning"
                  onClick={() => navigate(`/instructor/Quizzes/edit/${exam.e_id}`)}
                >
                  Edit
                </Button>
                <Button variant="danger" onClick={() => handleDelete(exam.e_id)} className="ms-2">
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default QuizzesInstructor;

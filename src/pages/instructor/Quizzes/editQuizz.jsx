import { useState, useEffect } from 'react';
import { Button, Form, Alert } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import { useEditExam, useGetExamById } from '../../../api/instructor/exam';

const EditExam = () => {
  const [examData, setExamData] = useState({
    e_title: '',
    e_description: '',
    e_degree: '',
    e_type: '',
    e_link: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const { id } = useParams();
  const navigate = useNavigate();

  const { data } = useGetExamById(Number(id));
  const { mutate, isLoading } = useEditExam();

  useEffect(() => {
    if (data) {
      setExamData(data?.exam);
    }
  }, [data]);

  const handleChange = (e) => {
    setExamData({
      ...examData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Prepare the body object
    const body = {
      title: examData.e_title,
      description: examData.e_description,
      degree: examData.e_degree,
      type: examData.e_type,
      link: examData.e_link,
    };

    // Call the mutation
    mutate(
      {
        examId: Number(id),
        title: examData.e_title,
        description: examData.e_description,
        degree: examData.e_degree,
        type: examData.e_type,
        link: examData.e_link,
      },
      {
        onSuccess: () => {
          setSuccess('Exam updated successfully!');
          setError('');
          // Navigate after a short delay
          setTimeout(() => {
            navigate('/instructor/Quizzes/quizzes');
          }, 2000); // Navigate after 2 seconds
        },
        onError: (error) => {
          setError(error.response?.data?.message || 'Failed to update exam');
          setSuccess('');
        },
      }
    );
  };

  return (
    <div className="container mt-4">
      <h2>Edit Exam</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      {success && <Alert variant="success">{success}</Alert>}
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="e_title">
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            name="e_title"
            value={examData.e_title}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="e_description">
          <Form.Label>Description</Form.Label>
          <Form.Control
            type="text"
            name="e_description"
            value={examData.e_description}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="e_degree">
          <Form.Label>Degree</Form.Label>
          <Form.Control
            type="number"
            name="e_degree"
            value={examData.e_degree}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="e_type">
          <Form.Label>Type</Form.Label>
          <Form.Control as="select" name="e_type" value={examData.e_type} onChange={handleChange}>
            <option value="mid-term">Mid-Term</option>
            <option value="final-exam">Final Exam</option>
          </Form.Control>
        </Form.Group>

        <Form.Group controlId="e_link">
          <Form.Label>Link</Form.Label>
          <Form.Control
            type="url"
            name="e_link"
            value={examData.e_link}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Button
          variant="primary"
          type="submit"
          className="mt-3"
          disabled={isLoading} // Disable button while loading
        >
          {isLoading ? 'Updating Exam...' : 'Update Exam'}
        </Button>
      </Form>
    </div>
  );
};

export default EditExam;

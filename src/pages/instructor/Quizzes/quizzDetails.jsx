import { useState } from 'react';
import { Button, Form, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useAddExam } from '../../../api/instructor/exam';

const QuizDetailsPage = () => {
  const [e_title, setETitle] = useState('');
  const [e_description, setEDescription] = useState('');
  const [e_degree, setEDegree] = useState('');
  const [e_link, setELink] = useState('');
  const [e_courseId, setECourseId] = useState('');
  const [e_type, setEType] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const { mutate, isLoading } = useAddExam();

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate form fields
    if (!e_title || !e_description || !e_degree || !e_link || !e_courseId || !e_type) {
      setError('All fields are required');
      return;
    }

    // Prepare exam data
    const examData = {
      title: e_title,
      description: e_description,
      degree: e_degree,
      type: e_type,
      link: e_link,
      courseId: e_courseId,
    };

    // Call the mutation
    mutate(examData, {
      onSuccess: () => {
        // Handle success
        setSuccess('Exam added successfully!');
        setError('');
        // Clear form fields
        setETitle('');
        setEDescription('');
        setEDegree('');
        setELink('');
        setECourseId('');
        setEType('');
        // Navigate after a short delay
        setTimeout(() => {
          navigate('/instructor/Quizzes/quizzes');
        }, 2000); // Navigate after 2 seconds
      },
      onError: (error) => {
        // Handle error
        setError(error.response?.data?.message || 'Failed to add exam');
        setSuccess('');
      },
    });
  };

  return (
    <div className="container mt-4">
      <h2>Add New Exam</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      {success && <Alert variant="success">{success}</Alert>}
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formExamTitle">
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter exam title"
            value={e_title}
            onChange={(e) => setETitle(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group controlId="formExamDescription" className="mt-3">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            placeholder="Enter exam description"
            value={e_description}
            onChange={(e) => setEDescription(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group controlId="formExamDegree" className="mt-3">
          <Form.Label>Degree</Form.Label>
          <Form.Control
            type="number"
            placeholder="Enter exam degree"
            value={e_degree}
            onChange={(e) => setEDegree(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group controlId="formExamLink" className="mt-3">
          <Form.Label>Link</Form.Label>
          <Form.Control
            type="url"
            placeholder="Enter exam link"
            value={e_link}
            onChange={(e) => setELink(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group controlId="formCourseId" className="mt-3">
          <Form.Label>Course ID</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter course ID"
            value={e_courseId}
            onChange={(e) => setECourseId(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group controlId="formExamType" className="mt-3">
          <Form.Label>Exam Type</Form.Label>
          <Form.Control
            as="select"
            value={e_type}
            onChange={(e) => setEType(e.target.value)}
            required
          >
            <option value="">Select Exam Type</option>
            <option value="mid-term">Mid-Term</option>
            <option value="final-exam">Final Exam</option>
          </Form.Control>
        </Form.Group>

        <Button
          type="submit"
          className="mt-3 btn-outline-purple"
          disabled={isLoading} // Disable button while loading
        >
          {isLoading ? 'Adding Exam...' : 'Add Exam'}
        </Button>
      </Form>
    </div>
  );
};

export default QuizDetailsPage;

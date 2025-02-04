import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Form, Container, Alert } from 'react-bootstrap';
import { useAddAssignment } from '../../../api/instructor/assignments';

const AssignmentDetails = () => {
  const [type, setAType] = useState('');
  const [description, setDescription] = useState('');
  const [publishDate, setPublishDate] = useState('');
  const [title, setTitle] = useState('');
  const [link, setLink] = useState('');
  const [degree, setDegree] = useState('');
  const [courseId, setCourseId] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const navigate = useNavigate();

  const { mutate } = useAddAssignment();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!type || !description || !publishDate || !title || !link || !degree || !courseId) {
      setError('All fields are required');
      return;
    }

    const urlPattern = /^(ftp|http|https):\/\/[^ "]+$/;
    if (!urlPattern.test(link)) {
      setError('Please enter a valid link');
      return;
    }

    if (degree <= 0 || isNaN(degree)) {
      setError('Degree must be a positive number');
      return;
    }

    const today = new Date().toISOString().split('T')[0];
    if (publishDate < today) {
      setError('Publish date cannot be in the past');
      return;
    }

    const assignmentData = {
      type,
      description,
      publish_date: publishDate,
      title,
      link,
      degree,
      courseId,
    };

    mutate(assignmentData, {
      onSuccess: () => {
        setSuccess('Assignment Added Successfully');
        setError('');
        setTimeout(() => navigate(`/instructor/Assignment/Assignment`), 2000);
      },
      onError: (error) => {
        console.error('Error adding assignment:', error);
        setError('Failed to add assignment');
      },
    });
  };

  return (
    <Container>
      <h2 className="mt-4">Add Assignment</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      {success && <Alert variant="success">{success}</Alert>}

      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formCourseId" className="mb-3">
          <Form.Label>Course ID</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Course ID"
            value={courseId}
            onChange={(e) => setCourseId(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="formExamType" className="mt-3">
          <Form.Label>Exam Type</Form.Label>
          <Form.Control
            as="select"
            value={type}
            onChange={(e) => setAType(e.target.value)}
            required
          >
            <option value="">Select Assignment Type</option>
            <option value="mid-term">Extra</option>
            <option value="final-exam">Academic</option>
          </Form.Control>
        </Form.Group>

        <Form.Group controlId="formDescription" className="mb-3">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            placeholder="Enter assignment description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="formPublishDate" className="mb-3">
          <Form.Label>Publish Date</Form.Label>
          <Form.Control
            type="date"
            value={publishDate}
            onChange={(e) => setPublishDate(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="formTitle" className="mb-3">
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter assignment title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="formLink" className="mb-3">
          <Form.Label>Link</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter assignment link"
            value={link}
            onChange={(e) => setLink(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="formDegree" className="mb-3">
          <Form.Label>Degree</Form.Label>
          <Form.Control
            type="number"
            placeholder="Enter assignment degree"
            value={degree}
            onChange={(e) => setDegree(e.target.value)}
          />
        </Form.Group>

        <Button className="mt-3 btn-outline-purple" type="submit">
          Add Assignment
        </Button>
      </Form>
    </Container>
  );
};

export default AssignmentDetails;

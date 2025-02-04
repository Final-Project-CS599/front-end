import { useState, useEffect } from 'react';
import { Button, Form, Container, Alert } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import { useEditAssignment, useGetAssignmentById } from '../../../api/instructor/assignments';

const EditAssignment = () => {
  const [assignmentData, setAssignmentData] = useState({
    a_type: '',
    a_description: '',
    a_publishDate: '',
    a_title: '',
    a_link: '',
    a_degree: '',
    a_instructorId: '',
    a_courseId: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const { id } = useParams();
  const navigate = useNavigate();

  const { data } = useGetAssignmentById(Number(id));

  const { mutate, isLoading } = useEditAssignment();

  useEffect(() => {
    if (data) {
      setAssignmentData(data?.assignment);
    }
  }, [data]);

  const handleChange = (e) => {
    setAssignmentData({
      ...assignmentData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    mutate(
      {
        assignmentId: Number(id),
        type: assignmentData.a_type,
        description: assignmentData.a_description,
        publishDate: assignmentData.a_publishDate,
        title: assignmentData.a_title,
        link: assignmentData.a_link,
        degree: assignmentData.a_degree,
        courseId: assignmentData.a_courseId,
      },
      {
        onSuccess: () => {
          setSuccess('Assignment updated successfully!');
          setError('');
          // Navigate after a short delay
          setTimeout(() => {
            navigate('/instructor/Assignment/Assignment');
          }, 2000); // Navigate after 2 seconds
        },
        onError: (error) => {
          setError(error.response?.data?.message || 'Failed to update Assignment');
          setSuccess('');
        },
      }
    );
  };

  return (
    <Container>
      <h2 className="mt-4">Edit Assignment</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      {success && <Alert variant="success">{success}</Alert>}
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formType" className="mb-3">
          <Form.Label>Type</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter assignment type (extra or academic)"
            name="a_type"
            value={assignmentData.a_type}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group controlId="formDescription" className="mb-3">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            placeholder="Enter assignment description"
            name="a_description"
            value={assignmentData.a_description}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group controlId="formPublishDate" className="mb-3">
          <Form.Label>Publish Date</Form.Label>
          <Form.Control
            type="date"
            name="a_publishDate"
            value={assignmentData.a_publishDate}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group controlId="formTitle" className="mb-3">
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter assignment title"
            name="a_title"
            value={assignmentData.a_title}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group controlId="formLink" className="mb-3">
          <Form.Label>Link</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter assignment link"
            name="a_link"
            value={assignmentData.a_link}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group controlId="formDegree" className="mb-3">
          <Form.Label>Degree</Form.Label>
          <Form.Control
            type="number"
            placeholder="Enter assignment degree"
            name="a_degree"
            value={assignmentData.a_degree}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group controlId="formCourseId" className="mb-3">
          <Form.Label>Course ID</Form.Label>
          <Form.Control
            type="number"
            placeholder="Enter course ID"
            name="a_courseId"
            value={assignmentData.a_courseId}
            onChange={handleChange}
          />
        </Form.Group>

        <Button className="btn-outline-purple" type="submit" disabled={isLoading}>
          {isLoading ? 'Updating Assignment...' : 'Update Assignment'}
        </Button>
      </Form>
    </Container>
  );
};

export default EditAssignment;

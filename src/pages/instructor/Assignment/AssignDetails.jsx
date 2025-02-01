import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Form, Container } from 'react-bootstrap';
import { useAddAssignment } from "../../../api/instructor/assignments";

const AssignmentDetails = () => {
  const [type, setType] = useState('');
  const [description, setDescription] = useState('');
  const [publishDate, setPublishDate] = useState('');
  const [title, setTitle] = useState('');
  const [link, setLink] = useState('');
  const [degree, setDegree] = useState('');
  const [courseId, setCourseId] = useState(''); 

  const navigate = useNavigate();
  const { mutate: addAssignment } = useAddAssignment();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!type || !description || !publishDate || !title || !link || !degree || !courseId) {
      alert('All fields are required');
      return;
    }

    const urlPattern = /^(ftp|http|https):\/\/[^ "]+$/;
    if (!urlPattern.test(link)) {
      alert('Please enter a valid link');
      return;
    }

    const assignmentData = { type, description, publish_date: publishDate, title, link, degree, courseId };

    addAssignment(assignmentData, {
      onSuccess: () => {
        alert('Assignment Added Successfully');
        navigate(`/course/${courseId}/assignments`);
      },
      onError: (error) => {
        console.error('Error adding assignment:', error);
        alert('Failed to add assignment');
      }
    });
  };

  return (
    <Container>
      <h2 className="mt-4">Add Assignment</h2>
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

        <Form.Group controlId="formType" className="mb-3">
          <Form.Label>Type</Form.Label>
          <Form.Control 
            type="text" 
            placeholder="Enter assignment type (extra or academic)" 
            value={type} 
            onChange={(e) => setType(e.target.value)} 
          />
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

        <Button variant="primary" type="submit">
          Add Assignment
        </Button>
      </Form>
    </Container>
  );
};

export default AssignmentDetails;

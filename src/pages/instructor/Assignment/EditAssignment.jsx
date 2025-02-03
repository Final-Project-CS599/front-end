import { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Form, Container } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';

const EditAssignment = () => {
  const { assignmentId } = useParams(); 
  const [type, setType] = useState('');
  const [description, setDescription] = useState('');
  const [publishDate, setPublishDate] = useState('');
  const [title, setTitle] = useState('');
  const [link, setLink] = useState('');
  const [degree, setDegree] = useState('');
  const [instructorId, setInstructorId] = useState('');
  const [courseId, setCourseId] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAssignmentData = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/v1/getAssignment/${assignmentId}`);
        const assignment = response.data.Assignment;
        setType(assignment.a_type);
        setDescription(assignment.a_description);
        setPublishDate(assignment.a_publish_date.split('T')[0]); 
        setTitle(assignment.a_title);
        setLink(assignment.a_link);
        setDegree(assignment.a_degree);
        setInstructorId(assignment.a_instructor_id);
        setCourseId(assignment.a_courseId);
      } catch (error) {
        console.error('Error fetching assignment data:', error);
        alert('Failed to load assignment data');
      }
    };

    fetchAssignmentData();
  }, [assignmentId]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!type || !description || !publishDate || !title || !link || !degree || !instructorId || !courseId) {
      alert('All fields are required');
      return;
    }

    if (type !== 'extra' && type !== 'academic') {
      alert('Assignment type must be either "extra" or "academic"');
      return;
    }

    const urlPattern = /^(ftp|http|https):\/\/[^ "]+$/;
    if (!urlPattern.test(link)) {
      alert('Please enter a valid link');
      return;
    }

    try {
      const response = await axios.put(`http://localhost:3000/api/v1/edit-assignment/${assignmentId}`, {
        type,
        description,
        publish_date: publishDate,
        title,
        link,
        degree,
        instructor_id: instructorId,
        courseId
      });
      alert('Assignment Updated');
      navigate('/assignments'); 
    } catch (error) {
      console.error('Error updating assignment:', error);
      alert('Failed to update assignment');
    }
  };

  return (
    <Container>
      <h2 className="mt-4">Edit Assignment</h2>
      <Form onSubmit={handleSubmit}>
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
          Update Assignment
        </Button>
      </Form>
    </Container>
  );
};

export default EditAssignment;

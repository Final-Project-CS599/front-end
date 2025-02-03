import { useState } from 'react';
import axios from 'axios';
import { Button, Form, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const AddMaterial = ({ instructorId }) => {
  const [formData, setFormData] = useState({
    mTitle: '',
    mDescription: '',
    mLink: '',
    mCourseId: '',
    file: null,
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'file') {
      setFormData({ ...formData, file: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (!formData.mTitle || !formData.mDescription || !formData.mLink || !formData.mCourseId) {
      setError('All fields are required.');
      return;
    }

    if (formData.mDescription.length < 20) {
      setError('Description must be at least 20 characters long.');
      return;
    }

    const urlPattern = /^(ftp|http|https):\/\/[^ "]+$/;
    if (!urlPattern.test(formData.mLink)) {
      setError('Invalid link. Please enter a valid URL.');
      return;
    }

    if (formData.file && formData.file.size > 1024 * 1024 * 1024) {
      setError('File size exceeds 1GB. Please upload a smaller file.');
      return;
    }

    // Prepare form data
    const data = new FormData();
    data.append('m_title', formData.mTitle);
    data.append('m_description', formData.mDescription);
    data.append('m_link', formData.mLink);
    data.append('m_instructor_id', instructorId);
    data.append('m_courseId', formData.mCourseId);
    if (formData.file) {
      data.append('file', formData.file);
    }

    try {
      const response = await axios.post('http://localhost:3000/api/v1/courseMaterial/add', data, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${localStorage.getItem('userToken')}`,
        },
      });

      if (response.status === 200) {
        setSuccess('Material added successfully!');
        setError('');
        setFormData({
          mTitle: '',
          mDescription: '',
          mLink: '',
          mCourseId: '',
          file: null,
        });
        setTimeout(() => navigate('/course-materials'), 2000); // Redirect after 2 seconds
      }
    } catch (error) {
      setError('Failed to add material. Please try again.');
      console.error('Error adding material', error);
    }
  };

  return (
    <div className="container mt-4">
      <h2>Add Course Material</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      {success && <Alert variant="success">{success}</Alert>}

      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formTitle">
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter material title"
            name="mTitle"
            value={formData.mTitle}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group controlId="formDescription" className="mt-3">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            placeholder="Enter material description"
            name="mDescription"
            value={formData.mDescription}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group controlId="formLink" className="mt-3">
          <Form.Label>Link</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter material link (e.g. video URL)"
            name="mLink"
            value={formData.mLink}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group controlId="formCourseId" className="mt-3">
          <Form.Label>Course ID</Form.Label>
          <Form.Control
            type="number"
            placeholder="Enter course ID"
            name="mCourseId"
            value={formData.mCourseId}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group controlId="formFile" className="mt-3">
          <Form.Label>Upload File (Optional)</Form.Label>
          <Form.Control type="file" name="file" onChange={handleChange} />
        </Form.Group>

        <Button type="submit" className="mt-3  btn-outline-purple">
          Add Material
        </Button>
      </Form>
    </div>
  );
};

export default AddMaterial;

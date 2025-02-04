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
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({ ...formData, [name]: files ? files[0] : value });
  };

  const validateForm = () => {
    let validationErrors = {};
    const urlPattern = /^(https?:\/\/)?([\w\d.-]+\.[\w]{2,})(\/[\w\d.-]*)*$/;

    if (!formData.mTitle.trim()) {
      validationErrors.mTitle = 'Title is required.';
    } else if (formData.mTitle.trim().length < 4) {
      validationErrors.mTitle = 'Title must be at least 4 characters.';
    }

    if (!formData.mDescription.trim()) {
      validationErrors.mDescription = 'Description is required.';
    } else if (formData.mDescription.trim().length < 10) {
      validationErrors.mDescription = 'Description must be at least 10 characters.';
    }

    if (!formData.mLink.trim()) {
      validationErrors.mLink = 'Material link is required.';
    } else if (!urlPattern.test(formData.mLink)) {
      validationErrors.mLink = 'Please enter a valid URL.';
    }

    if (!formData.mCourseId.trim()) {
      validationErrors.mCourseId = 'Course ID is required.';
    } else if (isNaN(formData.mCourseId)) {
      validationErrors.mCourseId = 'Course ID must be a valid number.';
    }

    if (formData.file) {
      const allowedTypes = ['application/pdf', 'image/png', 'image/jpeg'];
      if (!allowedTypes.includes(formData.file.type)) {
        validationErrors.file = 'Only PDF, PNG, and JPEG files are allowed.';
      }
      if (formData.file.size > 5 * 1024 * 1024) {
        validationErrors.file = 'File size must be less than 5MB.';
      }
    }

    setErrors(validationErrors);
    return Object.keys(validationErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const data = new FormData();
    data.append('m_title', formData.mTitle);
    data.append('m_description', formData.mDescription);
    data.append('m_link', formData.mLink);
    data.append('m_instructor_id', instructorId);
    data.append('m_courseId', formData.mCourseId);
    if (formData.file) data.append('file', formData.file);

    try {
      const response = await axios.post('http://localhost:3000/api/v1/courseMaterial/add', data, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${localStorage.getItem('userToken')}`,
        },
      });

      if (response.status === 200) {
        setSuccess('Material added successfully!');
        setErrors({});
        setTimeout(() => navigate('/course-materials'), 2000);
      }
    } catch (error) {
      setErrors({ apiError: 'Failed to add material. Please try again later.' });
    }
  };

  return (
    <div className="container mt-4">
      <h2>Add Course Material</h2>
      {errors.apiError && <Alert variant="danger">{errors.apiError}</Alert>}
      {success && <Alert variant="success">{success}</Alert>}

      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formTitle">
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            name="mTitle"
            value={formData.mTitle}
            onChange={handleChange}
            placeholder="Enter material title"
            isInvalid={!!errors.mTitle}
          />
          <Form.Control.Feedback type="invalid">{errors.mTitle}</Form.Control.Feedback>
        </Form.Group>

        <Form.Group controlId="formDescription" className="mt-3">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            name="mDescription"
            value={formData.mDescription}
            onChange={handleChange}
            placeholder="Enter material description"
            isInvalid={!!errors.mDescription}
          />
          <Form.Control.Feedback type="invalid">{errors.mDescription}</Form.Control.Feedback>
        </Form.Group>

        <Form.Group controlId="formLink" className="mt-3">
          <Form.Label>Link</Form.Label>
          <Form.Control
            type="text"
            name="mLink"
            value={formData.mLink}
            onChange={handleChange}
            placeholder="Enter material link"
            isInvalid={!!errors.mLink}
          />
          <Form.Control.Feedback type="invalid">{errors.mLink}</Form.Control.Feedback>
        </Form.Group>

        <Form.Group controlId="formCourseId" className="mt-3">
          <Form.Label>Course ID</Form.Label>
          <Form.Control
            type="text"
            name="mCourseId"
            value={formData.mCourseId}
            onChange={handleChange}
            placeholder="Enter course ID"
            isInvalid={!!errors.mCourseId}
          />
          <Form.Control.Feedback type="invalid">{errors.mCourseId}</Form.Control.Feedback>
        </Form.Group>

        <Form.Group controlId="formFile" className="mt-3">
          <Form.Label>Upload File (Optional)</Form.Label>
          <Form.Control
            type="file"
            name="file"
            onChange={handleChange}
            isInvalid={!!errors.file}
          />
          <Form.Control.Feedback type="invalid">{errors.file}</Form.Control.Feedback>
        </Form.Group>

        <Button type="submit" className="mt-3 btn-outline-purple">
          Add Material
        </Button>
      </Form>
    </div>
  );
};

export default AddMaterial;

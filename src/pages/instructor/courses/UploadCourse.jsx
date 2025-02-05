import { useState } from 'react';
import axios from 'axios';
import { Button, Form, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const AddMaterial = () => {
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const validationSchema = Yup.object({
    mTitle: Yup.string().required('Title is required'),
    mDescription: Yup.string().required('Description is required'),
    mCourseId: Yup.number()
      .typeError('Course ID must be a number')
      .required('Course ID is required')
      .positive('Course ID must be a positive number')
      .integer('Course ID must be an integer'),
    file: Yup.mixed()
      .required('File is required') // ✅ Make file mandatory
      .test('fileSize', 'File size exceeds 1GB', (value) => {
        if (value) {
          return value.size <= 1024 * 1024 * 1024;
        }
        return true;
      }),
  });

  const formik = useFormik({
    initialValues: {
      mTitle: '',
      mDescription: '',
      mCourseId: '',
      file: null,
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        const data = new FormData();
        data.append('m_title', values.mTitle);
        data.append('m_description', values.mDescription);
        data.append('m_courseId', values.mCourseId);
        if (values.file) {
          data.append('file', values.file);
        }

        const response = await axios.post('http://localhost:3000/api/v1/courseMaterial/add', data, {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${localStorage.getItem('userToken')}`,
          },
        });

        if (response.status === 200) {
          setSuccess('Material added successfully!');
          setError('');
          formik.resetForm();
          setTimeout(() => navigate('/instructor/courses/mycourses'), 2000);
        }
      } catch (error) {
        setError('Failed to add material. Please try again.');
        console.error('Error adding material', error);
      }
    },
  });

  return (
    <div className="container mt-4">
      <h2>Add Course Material</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      {success && <Alert variant="success">{success}</Alert>}

      <Form onSubmit={formik.handleSubmit}>
        <Form.Group controlId="formTitle">
          <Form.Label>
            Title <span style={{ color: 'red' }}>*</span>
          </Form.Label>
          <Form.Control
            type="text"
            name="mTitle"
            value={formik.values.mTitle}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            isInvalid={formik.touched.mTitle && !!formik.errors.mTitle}
          />
          <Form.Control.Feedback type="invalid">{formik.errors.mTitle}</Form.Control.Feedback>
        </Form.Group>

        <Form.Group controlId="formDescription" className="mt-3">
          <Form.Label>
            Description <span style={{ color: 'red' }}>*</span>
          </Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            name="mDescription"
            value={formik.values.mDescription}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            isInvalid={formik.touched.mDescription && !!formik.errors.mDescription}
          />
          <Form.Control.Feedback type="invalid">{formik.errors.mDescription}</Form.Control.Feedback>
        </Form.Group>

        <Form.Group controlId="formCourseId" className="mt-3">
          <Form.Label>
            Course ID <span style={{ color: 'red' }}>*</span>
          </Form.Label>
          <Form.Control
            type="text"
            name="mCourseId"
            value={formik.values.mCourseId}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            isInvalid={formik.touched.mCourseId && !!formik.errors.mCourseId}
          />
          <Form.Control.Feedback type="invalid">{formik.errors.mCourseId}</Form.Control.Feedback>
        </Form.Group>

        <Form.Group controlId="formFile" className="mt-3">
          <Form.Label>
            Upload File <span style={{ color: 'red' }}>*</span>
          </Form.Label>
          <Form.Control
            type="file"
            name="file"
            onChange={(event) => {
              formik.setFieldValue('file', event.currentTarget.files[0]);
            }}
            onBlur={formik.handleBlur}
            isInvalid={formik.touched.file && !!formik.errors.file}
          />
          {formik.touched.file && formik.errors.file ? (
            <div className="text-danger">{formik.errors.file}</div> // ✅ Display error message
          ) : null}
        </Form.Group>

        <Button type="submit" className="mt-3 btn-outline-purple">
          Add Material
        </Button>
      </Form>
    </div>
  );
};

export default AddMaterial;

import { useState, useEffect } from 'react';
import { Button, Form, Alert } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';


const EditCourseMaterial = () => {
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const { id } = useParams();
  const navigate = useNavigate();

  const [materialData, setMaterialData] = useState({
    mTitle: '',
    mDescription: '',
    mLink: '',
    mCourseId: '',
    file: null,
  });

  
  const validationSchema = Yup.object({
    mTitle: Yup.string().required('Title is required'),
    mDescription: Yup.string().required('Description is required'),
    mLink: Yup.string()
      .required('Link is required')
      .matches(/^(ftp|http|https):\/\/[^ "]+$/, 'Invalid link. Please enter a valid URL.'),
    mCourseId: Yup.number()
      .typeError('Course ID must be a number')
      .required('Course ID is required')
      .positive('Course ID must be a positive number')
      .integer('Course ID must be an integer'),
    file: Yup.mixed()
      .nullable()
      .test('fileSize', 'File size exceeds 1GB', (value) => {
        if (value) {
          return value.size <= 1024 * 1024 * 1024;
        }
        return true;
      }),
  });

  const formik = useFormik({
    initialValues: materialData,
    validationSchema,
    enableReinitialize: true, 
    onSubmit: async (values) => {
      try {
        const data = new FormData();
        data.append('m_title', values.mTitle);
        data.append('m_description', values.mDescription);
        data.append('m_link', values.mLink);
        data.append('m_courseId', values.mCourseId);
        if (values.file) {
          data.append('file', values.file);
        }

        const response = await axios.put(
          `http://localhost:3000/api/v1/courseMaterial/edit/${id}`,
          data,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
              Authorization: `Bearer ${localStorage.getItem('userToken')}`,
            },
          }
        );

        if (response.status === 200) {
          setSuccess('Material updated successfully!');
          setError('');
          setTimeout(() => navigate('/instructor/courses/mycourses'), 2000);
        }
      } catch (error) {
        setError('Failed to update material. Please try again.');
        console.error('Error updating material', error);
      }
    },
  });

  return (
    <div className="container mt-4">
      <h2>Edit Course Material</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      {success && <Alert variant="success">{success}</Alert>}

      <Form onSubmit={formik.handleSubmit}>
        <Form.Group controlId="formTitle">
          <Form.Label>Title</Form.Label>
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
          <Form.Label>Description</Form.Label>
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

        <Form.Group controlId="formLink" className="mt-3">
          <Form.Label>Link</Form.Label>
          <Form.Control
            type="text"
            name="mLink"
            value={formik.values.mLink}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            isInvalid={formik.touched.mLink && !!formik.errors.mLink}
          />
          <Form.Control.Feedback type="invalid">{formik.errors.mLink}</Form.Control.Feedback>
        </Form.Group>

        <Form.Group controlId="formCourseId" className="mt-3">
          <Form.Label>Course ID</Form.Label>
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
          <Form.Label>Upload File (Optional)</Form.Label>
          <Form.Control
            type="file"
            name="file"
            onChange={(event) => {
              formik.setFieldValue('file', event.currentTarget.files[0]);
            }}
            onBlur={formik.handleBlur}
            isInvalid={formik.touched.file && !!formik.errors.file}
          />
          <Form.Control.Feedback type="invalid">{formik.errors.file}</Form.Control.Feedback>
        </Form.Group>

        <Button type="submit" className="mt-3 btn-outline-purple">
          {formik.isSubmitting ? 'Updating Material...' : 'Update Material'}
        </Button>
      </Form>
    </div>
  );
};

export default EditCourseMaterial;

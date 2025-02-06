import { useState, useEffect } from 'react';
import { Button, Form, Alert } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useGetMaterial } from '../../../api/instructor/media';

const EditCourseMaterial = () => {
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const { id } = useParams();
  const navigate = useNavigate();
  const { data, isLoading, isError, refetch } = useGetMaterial();

  const [materialData, setMaterialData] = useState({
    m_title: '',
    m_description: '',
    m_link: '',
    m_courseId: '',
    file: null,
  });

  useEffect(() => {
    if (data && id) {
      const filteredMaterial = data.find((material) => material.m_id === parseInt(id));

      if (filteredMaterial) {
        setMaterialData({
          m_title: filteredMaterial.m_title,
          m_description: filteredMaterial.m_description,
          m_link: filteredMaterial.m_link,
          m_courseId: filteredMaterial.m_courseId,
          file: null, // Assuming you don't have the file in the initial data
        });
      }
    }
  }, [data, id]);

  const validationSchema = Yup.object({
    m_title: Yup.string().required('Title is required'),
    m_description: Yup.string().required('Description is required'),
    m_link: Yup.string()
      .required('Link is required')
      .matches(/^(ftp|http|https):\/\/[^ "]+$/, 'Invalid link. Please enter a valid URL.'),
    m_courseId: Yup.number()
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

  console.log(`http://localhost:3000${materialData.m_link}`, 'materialData.m_link');

  const formik = useFormik({
    initialValues: materialData,
    validationSchema,
    enableReinitialize: true,
    onSubmit: async (values) => {
      try {
        const data = new FormData();
        data.append('m_title', values.m_title);
        data.append('m_description', values.m_description);
        data.append('m_link', values.m_link);
        data.append('m_courseId', values.m_courseId);
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

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error fetching material data</div>;

  return (
    <div className="container ">
      <h2>Edit Course Material</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      {success && <Alert variant="success">{success}</Alert>}

      <Form onSubmit={formik.handleSubmit}>
        <Form.Group controlId="form_title">
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            name="m_title"
            value={formik.values.m_title}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            isInvalid={formik.touched.m_title && !!formik.errors.m_title}
          />
          <Form.Control.Feedback type="invalid">{formik.errors.m_title}</Form.Control.Feedback>
        </Form.Group>

        <Form.Group controlId="form_description" className="mt-3">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            name="m_description"
            value={formik.values.m_description}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            isInvalid={formik.touched.m_description && !!formik.errors.m_description}
          />
          <Form.Control.Feedback type="invalid">
            {formik.errors.m_description}
          </Form.Control.Feedback>
        </Form.Group>

        {/* <Form.Group controlId="form_link" className="mt-3">
          <Form.Label>Link</Form.Label>
          <Form.Control
            type="text"
            name="m_link"
            value={formik.values.m_link}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            isInvalid={formik.touched.m_link && !!formik.errors.m_link}
          />
          <Form.Control.Feedback type="invalid">{formik.errors.m_link}</Form.Control.Feedback>
        </Form.Group> */}

        <img src={`http://localhost:3000${materialData.m_link}`} alt="" width={200} />

        <Form.Group controlId="form_courseId" className="mt-3">
          <Form.Label>Course ID</Form.Label>
          <Form.Control
            type="text"
            name="m_courseId"
            value={formik.values.m_courseId}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            isInvalid={formik.touched.m_courseId && !!formik.errors.m_courseId}
          />
          <Form.Control.Feedback type="invalid">{formik.errors.m_courseId}</Form.Control.Feedback>
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

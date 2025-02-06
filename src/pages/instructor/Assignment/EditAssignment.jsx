import { useState, useEffect } from 'react';
import { Button, Form, Container, Alert } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import { useEditAssignment, useGetAssignmentById } from '../../../api/instructor/assignments';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const EditAssignment = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data } = useGetAssignmentById(Number(id));
  const { mutate, isLoading } = useEditAssignment();
  
  const validationSchema = Yup.object({
    a_type: Yup.string()
      .required('Type is required')
      .oneOf(['extra', 'academic'], 'Type must be either "extra" or "academic"'),
    a_description: Yup.string()
      .required('Description is required')
      .min(10, 'Description must be at least 10 characters long'),
    a_publishDate: Yup.date().required('Publish Date is required'),
    a_title: Yup.string()
      .required('Title is required')
      .min(5, 'Title must be at least 5 characters long'),
    a_link: Yup.string()
      .required('Link is required')
      .matches(/^(ftp|http|https):\/\/[^ "]+$/, 'Invalid link. Please enter a valid URL.'),
    a_degree: Yup.number()
      .typeError('Degree must be a number')
      .required('Degree is required')
      .positive('Degree must be a positive number'),
    a_courseId: Yup.number()
      .typeError('Course ID must be a number')
      .required('Course ID is required'),
  });

  const formik = useFormik({
    initialValues: {
      a_type: '',
      a_description: '',
      a_publishDate: '',
      a_title: '',
      a_link: '',
      a_degree: '',
      a_courseId: '',
    },
    validationSchema,
    onSubmit: (values) => {
      mutate(
        {
          assignmentId: Number(id),
          type: values.a_type,
          description: values.a_description,
          publishDate: values.a_publishDate,
          title: values.a_title,
          link: values.a_link,
          degree: values.a_degree,
          courseId: values.a_courseId,
        },
        {
          onSuccess: () => {
            alert('Assignment updated successfully!');
            navigate('/instructor/Assignment/Assignment');
          },
          onError: (error) => {
            alert(error.response?.data?.message || 'Failed to update Assignment');
          },
        }
      );
    },
  });

  useEffect(() => {
    if (data) {
      formik.setValues(data?.assignment);
    }
  }, [data]);

  return (
    <Container>
      <h2 className="mt-4">Edit Assignment</h2>
      <Form onSubmit={formik.handleSubmit}>
        {/* Type */}
        <Form.Group controlId="formType" className="mb-3">
          <Form.Label>Type</Form.Label>
          <Form.Control
            type="text"
            name="a_type"
            value={formik.values.a_type}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            isInvalid={formik.touched.a_type && !!formik.errors.a_type}
          />
          <Form.Control.Feedback type="invalid">
            {formik.errors.a_type}
          </Form.Control.Feedback>
        </Form.Group>

        {/* Description */}
        <Form.Group controlId="formDescription" className="mb-3">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            name="a_description"
            value={formik.values.a_description}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            isInvalid={formik.touched.a_description && !!formik.errors.a_description}
          />
          <Form.Control.Feedback type="invalid">
            {formik.errors.a_description}
          </Form.Control.Feedback>
        </Form.Group>

        {/* Publish Date */}
        <Form.Group controlId="formPublishDate" className="mb-3">
          <Form.Label>Publish Date</Form.Label>
          <Form.Control
            type="date"
            name="a_publishDate"
            value={formik.values.a_publishDate}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            isInvalid={formik.touched.a_publishDate && !!formik.errors.a_publishDate}
          />
          <Form.Control.Feedback type="invalid">
            {formik.errors.a_publishDate}
          </Form.Control.Feedback>
        </Form.Group>

        {/* Title */}
        <Form.Group controlId="formTitle" className="mb-3">
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            name="a_title"
            value={formik.values.a_title}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            isInvalid={formik.touched.a_title && !!formik.errors.a_title}
          />
          <Form.Control.Feedback type="invalid">
            {formik.errors.a_title}
          </Form.Control.Feedback>
        </Form.Group>

        {/* Link */}
        <Form.Group controlId="formLink" className="mb-3">
          <Form.Label>Link</Form.Label>
          <Form.Control
            type="text"
            name="a_link"
            value={formik.values.a_link}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            isInvalid={formik.touched.a_link && !!formik.errors.a_link}
          />
          <Form.Control.Feedback type="invalid">
            {formik.errors.a_link}
          </Form.Control.Feedback>
        </Form.Group>

        {/* Degree */}
        <Form.Group controlId="formDegree" className="mb-3">
          <Form.Label>Degree</Form.Label>
          <Form.Control
            type="number"
            name="a_degree"
            value={formik.values.a_degree}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            isInvalid={formik.touched.a_degree && !!formik.errors.a_degree}
          />
          <Form.Control.Feedback type="invalid">
            {formik.errors.a_degree}
          </Form.Control.Feedback>
        </Form.Group>

        {/* Course ID */}
        <Form.Group controlId="formCourseId" className="mb-3">
          <Form.Label>Course ID</Form.Label>
          <Form.Control
            type="number"
            name="a_courseId"
            value={formik.values.a_courseId}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            isInvalid={formik.touched.a_courseId && !!formik.errors.a_courseId}
          />
          <Form.Control.Feedback type="invalid">
            {formik.errors.a_courseId}
          </Form.Control.Feedback>
        </Form.Group>

        {/* Submit Button */}
        <Button className="btn-outline-purple" type="submit" disabled={isLoading}>
          {isLoading ? 'Updating Assignment...' : 'Update Assignment'}
        </Button>
      </Form>
    </Container>
  );
};

export default EditAssignment;

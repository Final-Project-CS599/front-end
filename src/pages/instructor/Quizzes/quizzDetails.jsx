import { useState } from 'react';
import { Button, Form, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useAddExam } from '../../../api/instructor/exam';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const QuizDetailsPage = () => {
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();
  const { mutate, isLoading } = useAddExam();

  const validationSchema = Yup.object({
    e_title: Yup.string().required('Title is required'),
    e_description: Yup.string().required('Description is required'),
    e_degree: Yup.number()
      .required('Degree is required')
      .positive('Degree must be a positive number'),
    e_link: Yup.string()
      .required('Link is required')
      .matches(/^(ftp|http|https):\/\/[^ "]+$/, 'Invalid link. Please enter a valid URL.'),
    e_courseId: Yup.string().required('Course ID is required'),
    e_type: Yup.string().required('Exam type is required'),
  });

  const formik = useFormik({
    initialValues: {
      e_title: '',
      e_description: '',
      e_degree: '',
      e_link: '',
      e_courseId: '',
      e_type: '',
    },
    validationSchema,
    onSubmit: (values) => {
      const examData = {
        title: values.e_title,
        description: values.e_description,
        degree: values.e_degree,
        type: values.e_type,
        link: values.e_link,
        courseId: values.e_courseId,
      };

      mutate(examData, {
        onSuccess: () => {
          setSuccess('Exam added successfully!');
          setError('');
          formik.resetForm();
          setTimeout(() => {
            navigate('/instructor/Quizzes/quizzes');
          }, 1000);
        },
        onError: (error) => {
          // Handle error
          setError(error.response?.data?.message || 'Failed to add exam');
          setSuccess('');
        },
      });
    },
  });

  return (
    <div className="container mt-4">
      <h2>Add New Exam</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      {success && <Alert variant="success">{success}</Alert>}
      <Form onSubmit={formik.handleSubmit}>
        <Form.Group controlId="formExamTitle">
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter exam title"
            name="e_title"
            value={formik.values.e_title}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            isInvalid={formik.touched.e_title && !!formik.errors.e_title}
          />
          <Form.Control.Feedback type="invalid">{formik.errors.e_title}</Form.Control.Feedback>
        </Form.Group>

        <Form.Group controlId="formExamDescription" className="mt-3">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            placeholder="Enter exam description"
            name="e_description"
            value={formik.values.e_description}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            isInvalid={formik.touched.e_description && !!formik.errors.e_description}
          />
          <Form.Control.Feedback type="invalid">
            {formik.errors.e_description}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group controlId="formExamDegree" className="mt-3">
          <Form.Label>Degree</Form.Label>
          <Form.Control
            type="number"
            placeholder="Enter exam degree"
            name="e_degree"
            value={formik.values.e_degree}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            isInvalid={formik.touched.e_degree && !!formik.errors.e_degree}
          />
          <Form.Control.Feedback type="invalid">{formik.errors.e_degree}</Form.Control.Feedback>
        </Form.Group>

        <Form.Group controlId="formExamLink" className="mt-3">
          <Form.Label>Link</Form.Label>
          <Form.Control
            type="url"
            placeholder="Enter exam link"
            name="e_link"
            value={formik.values.e_link}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            isInvalid={formik.touched.e_link && !!formik.errors.e_link}
          />
          <Form.Control.Feedback type="invalid">{formik.errors.e_link}</Form.Control.Feedback>
        </Form.Group>

        <Form.Group controlId="formCourseId" className="mt-3">
          <Form.Label>Course ID</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter course ID"
            name="e_courseId"
            value={formik.values.e_courseId}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            isInvalid={formik.touched.e_courseId && !!formik.errors.e_courseId}
          />
          <Form.Control.Feedback type="invalid">{formik.errors.e_courseId}</Form.Control.Feedback>
        </Form.Group>

        <Form.Group controlId="formExamType" className="mt-3">
          <Form.Label>Exam Type</Form.Label>
          <Form.Control
            as="select"
            name="e_type"
            value={formik.values.e_type}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            isInvalid={formik.touched.e_type && !!formik.errors.e_type}
          >
            <option value="">Select Exam Type</option>
            <option value="mid-term">Mid-Term</option>
            <option value="final-exam">Final Exam</option>
          </Form.Control>
          <Form.Control.Feedback type="invalid">{formik.errors.e_type}</Form.Control.Feedback>
        </Form.Group>

        <Button
          type="submit"
          className="mt-3 btn-outline-purple"
          disabled={isLoading} // Disable button while loading
        >
          {isLoading ? 'Adding Exam...' : 'Add Exam'}
        </Button>
      </Form>
    </div>
  );
};

export default QuizDetailsPage;

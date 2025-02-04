import { useNavigate } from 'react-router-dom';
import { Button, Form, Container, Alert } from 'react-bootstrap';
import { useAddAssignment } from '../../../api/instructor/assignments';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const AssignmentDetails = () => {
  const navigate = useNavigate();
  const { mutate } = useAddAssignment();

  // Define validation schema using Yup
  const validationSchema = Yup.object({
    courseId: Yup.string().required('Course ID is required'),
    type: Yup.string()
      .required('Type is required')
      .oneOf(['extra', 'academic'], 'Type must be either "extra" or "academic"'),
    description: Yup.string().required('Description is required'),
    publishDate: Yup.date().required('Publish Date is required'),
    title: Yup.string().required('Title is required'),
    link: Yup.string()
      .required('Link is required')
      .matches(/^(ftp|http|https):\/\/[^ "]+$/, 'Invalid link. Please enter a valid URL.'),
    degree: Yup.number()
      .required('Degree is required')
      .positive('Degree must be a positive number'),
  });

  const formik = useFormik({
    initialValues: {
      courseId: '',
      type: '',
      description: '',
      publishDate: '',
      title: '',
      link: '',
      degree: '',
    },
    validationSchema,
    onSubmit: (values) => {
      const assignmentData = {
        type: values.type,
        description: values.description,
        publish_date: values.publishDate,
        title: values.title,
        link: values.link,
        degree: values.degree,
        courseId: values.courseId,
      };

      mutate(assignmentData, {
        onSuccess: () => {
          alert('Assignment Added Successfully');
          formik.resetForm();
          navigate(`/instructor/Assignment/Assignment`);
        },
        onError: (error) => {
          console.error('Error adding assignment:', error);
          alert('Failed to add assignment');
        },
      });
    },
  });

  return (
    <Container>
      <h2 className="mt-4">Add Assignment</h2>
      <Form onSubmit={formik.handleSubmit}>
        <Form.Group controlId="formCourseId" className="mb-3">
          <Form.Label>Course ID</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Course ID"
            name="courseId"
            value={formik.values.courseId}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            isInvalid={formik.touched.courseId && !!formik.errors.courseId}
          />
          <Form.Control.Feedback type="invalid">{formik.errors.courseId}</Form.Control.Feedback>
        </Form.Group>

        <Form.Group controlId="formExamType" className="mt-3">
          <Form.Label>Exam Type</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter assignment type (extra or academic)"
            name="type"
            value={formik.values.type}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            isInvalid={formik.touched.type && !!formik.errors.type}
          />
          <Form.Control.Feedback type="invalid">{formik.errors.type}</Form.Control.Feedback>
        </Form.Group>

        <Form.Group controlId="formDescription" className="mb-3">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            placeholder="Enter assignment description"
            name="description"
            value={formik.values.description}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            isInvalid={formik.touched.description && !!formik.errors.description}
          />
          <Form.Control.Feedback type="invalid">{formik.errors.description}</Form.Control.Feedback>
        </Form.Group>

        <Form.Group controlId="formPublishDate" className="mb-3">
          <Form.Label>Publish Date</Form.Label>
          <Form.Control
            type="date"
            name="publishDate"
            value={formik.values.publishDate}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            isInvalid={formik.touched.publishDate && !!formik.errors.publishDate}
          />
          <Form.Control.Feedback type="invalid">{formik.errors.publishDate}</Form.Control.Feedback>
        </Form.Group>

        <Form.Group controlId="formTitle" className="mb-3">
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter assignment title"
            name="title"
            value={formik.values.title}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            isInvalid={formik.touched.title && !!formik.errors.title}
          />
          <Form.Control.Feedback type="invalid">{formik.errors.title}</Form.Control.Feedback>
        </Form.Group>

        <Form.Group controlId="formLink" className="mb-3">
          <Form.Label>Link</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter assignment link"
            name="link"
            value={formik.values.link}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            isInvalid={formik.touched.link && !!formik.errors.link}
          />
          <Form.Control.Feedback type="invalid">{formik.errors.link}</Form.Control.Feedback>
        </Form.Group>

        <Form.Group controlId="formDegree" className="mb-3">
          <Form.Label>Degree</Form.Label>
          <Form.Control
            type="number"
            placeholder="Enter assignment degree"
            name="degree"
            value={formik.values.degree}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            isInvalid={formik.touched.degree && !!formik.errors.degree}
          />
          <Form.Control.Feedback type="invalid">{formik.errors.degree}</Form.Control.Feedback>
        </Form.Group>

        <Button className="mt-3 btn-outline-purple" type="submit">
          Add Assignment
        </Button>
      </Form>
    </Container>
  );
};

export default AssignmentDetails;

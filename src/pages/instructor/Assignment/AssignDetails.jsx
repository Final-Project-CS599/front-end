import { useNavigate } from 'react-router-dom';
import { Button, Form, Container } from 'react-bootstrap';
import { useAddAssignment } from '../../../api/instructor/assignments';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const AssignmentDetails = () => {
  const navigate = useNavigate();
  const { mutate } = useAddAssignment();

  const validationSchema = Yup.object({
    courseId: Yup.number()
      .typeError('Course ID must be a number')
      .required('Course ID is required'),
    type: Yup.string()
      .required('Type is required')
      .oneOf(['extra', 'academic'], 'Type must be either "extra" or "academic"'),
    description: Yup.string().required('Description is required')
      .min(10, 'Description must be at least 10 characters long'), 
    publishDate: Yup.date().required('Publish Date is required'),
    title: Yup.string().required('Title is required').min(5, 'Title must be at least 5 characters long'),
    link: Yup.string()
      .required('Link is required')
      .matches(/^(ftp|http|https):\/\/[^ "]+$/, 'Invalid link. Please enter a valid URL.'),
    degree: Yup.number()
      .typeError('Degree must be a number') 
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
        {/* Course ID */}
        <Form.Group controlId="formCourseId" className="mb-3">
          <Form.Label>Course ID <span style={{ color: 'red' }}>*</span></Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Course ID"
            name="courseId"
            value={formik.values.courseId}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            isInvalid={formik.touched.courseId && !!formik.errors.courseId}
          />
          <Form.Control.Feedback type="invalid">
            {formik.errors.courseId}
          </Form.Control.Feedback>
        </Form.Group>

        {/* Exam Type */}
        <Form.Group controlId="formExamType" className="mb-3">
          <Form.Label>Exam Type <span style={{ color: 'red' }}>*</span></Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter assignment type (extra or academic)"
            name="type"
            value={formik.values.type}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            isInvalid={formik.touched.type && !!formik.errors.type}
          />
          <Form.Control.Feedback type="invalid">
            {formik.errors.type}
          </Form.Control.Feedback>
        </Form.Group>

        {/* Description */}
        <Form.Group controlId="formDescription" className="mb-3">
          <Form.Label>Description <span style={{ color: 'red' }}>*</span></Form.Label>
          <Form.Control
            as="textarea"
            placeholder="Enter assignment description"
            name="description"
            value={formik.values.description}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            isInvalid={formik.touched.description && !!formik.errors.description}
          />
          <Form.Control.Feedback type="invalid">
            {formik.errors.description}
          </Form.Control.Feedback>
        </Form.Group>

        {/* Publish Date */}
        <Form.Group controlId="formPublishDate" className="mb-3">
          <Form.Label>Publish Date <span style={{ color: 'red' }}>*</span></Form.Label>
          <Form.Control
            type="date"
            name="publishDate"
            value={formik.values.publishDate}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            isInvalid={formik.touched.publishDate && !!formik.errors.publishDate}
          />
          <Form.Control.Feedback type="invalid">
            {formik.errors.publishDate}
          </Form.Control.Feedback>
        </Form.Group>

        {/* Title */}
        <Form.Group controlId="formTitle" className="mb-3">
          <Form.Label>Title <span style={{ color: 'red' }}>*</span></Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter assignment title"
            name="title"
            value={formik.values.title}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            isInvalid={formik.touched.title && !!formik.errors.title}
          />
          <Form.Control.Feedback type="invalid">
            {formik.errors.title}
          </Form.Control.Feedback>
        </Form.Group>

        {/* Link */}
        <Form.Group controlId="formLink" className="mb-3">
          <Form.Label>Link <span style={{ color: 'red' }}>*</span></Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter assignment link"
            name="link"
            value={formik.values.link}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            isInvalid={formik.touched.link && !!formik.errors.link}
          />
          <Form.Control.Feedback type="invalid">
            {formik.errors.link}
          </Form.Control.Feedback>
        </Form.Group>

        {/* Degree */}
        <Form.Group controlId="formDegree" className="mb-3">
          <Form.Label>Degree <span style={{ color: 'red' }}>*</span></Form.Label>
          <Form.Control
            type="number"
            placeholder="Enter assignment degree"
            name="degree"
            value={formik.values.degree}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            isInvalid={formik.touched.degree && !!formik.errors.degree}
          />
          <Form.Control.Feedback type="invalid">
            {formik.errors.degree}
          </Form.Control.Feedback>
        </Form.Group>

        <Button className="mt-3 btn-outline-purple" type="submit">
          Add Assignment
        </Button>
      </Form>
    </Container>
  );
};

export default AssignmentDetails;

import { ErrorMessage, Field, Form, Formik } from 'formik';
import React, { useEffect, useState } from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { useNavigate, useParams } from 'react-router-dom';
import * as Yup from 'yup';
import { useGetExtraCourseById, useUpdateExtraCourse } from '../../../../api/admin/courses/Extra';

const validationSchema = Yup.object().shape({
  instructorName: Yup.string()
    .min(2, 'Instructor Name must be at least 2 characters')
    .max(100, 'Instructor Name must be at most 100 characters')
    .required('Instructor Name is required'),
  courseName: Yup.string()
    .min(2, 'Course Name must be at least 2 characters')
    .max(100, 'Course Name must be at most 100 characters')
    .required('Course Name is required'),
  description: Yup.string()
    .min(20, 'Description must be at least 20 characters')
    .max(500, 'Description must be at most 500 characters')
    .required('Description is required'),
  courseStartDate: Yup.date().required('Start Date is required'),
  courseEndDate: Yup.date()
    .min(Yup.ref('courseStartDate'), 'End Date must be after Start Date')
    .required('End Date is required'),
  courseCode: Yup.string()
    .matches(
      /^[a-zA-Z0-9]{5,10}$/,
      'Course Code must be alphanumeric and between 5 to 10 characters'
    )
    .required('Course Code is required'),
  sections: Yup.string().required('Sections is required'),
  category: Yup.string()
    .min(5, 'Category must be at least 5 characters')
    .max(50, 'Category must be at most 50 characters')
    .required('Category is required'),
  price: Yup.number()
    .min(3, 'Price must be at least 3')
    .max(99999, 'Price must be at most 99999')
    .required('Price is required'),
});

const UpdateExtraCourse = () => {
  const { id } = useParams();
  const { data: course, isLoading, error } = useGetExtraCourseById(id);
  const { mutate } = useUpdateExtraCourse();
  const navigate = useNavigate();

  const [initialValues, setInitialValues] = useState({
    instructorName: '',
    courseName: '',
    description: '',
    courseStartDate: '',
    courseEndDate: '',
    courseCode: '',
    sections: '',
    category: '',
    price: '',
  });

  // Update form fields when data is available
  useEffect(() => {
    if (course?.data) {
      setInitialValues({
        instructorName: course.data.instructorName || '',
        courseName: course.data.courseName || '',
        description: course.data.description || '',
        courseStartDate: course.data.courseStartDate || '',
        courseEndDate: course.data.courseEndDate || '',
        courseCode: course.data.courseCode || '',
        sections: course.data.sections || '',
        category: course.data.category || '',
        price: course.data.price || '',
      });
    }
  }, [course]);

  const handleSubmit = (values, { setSubmitting }) => {
    mutate(
      { id, courseData: values },
      {
        onSuccess: () => {
          setSubmitting(false);
          alert('Course updated successfully!');
          navigate('/admin/courses/extra');
        },
        onError: (error) => {
          console.error('Error updating course:', error);
          setSubmitting(false);
        },
      }
    );
  };

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading course details.</p>;

  return (
    <HelmetProvider>
      <Helmet>
        <meta name="description" content="Update course" />
        <title>Update Course</title>
      </Helmet>

      <div className="container mt-2">
        <h2 className="mb-4">Update Extra Course</h2>

        <Formik
          enableReinitialize
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form>
              <div className="form-group mb-3">
                <label htmlFor="courseName">Course Name:</label>
                <Field type="text" className="form-control" id="courseName" name="courseName" />
                <ErrorMessage name="courseName" component="div" className="text-danger" />
              </div>

              <div className="form-group mb-3">
                <label htmlFor="courseCode">Course Code:</label>
                <Field type="text" className="form-control" id="courseCode" name="courseCode" />
                <ErrorMessage name="courseCode" component="div" className="text-danger" />
              </div>

              <div className="form-group mb-3">
                <label htmlFor="instructorName">Instructor Name:</label>
                <Field
                  type="text"
                  className="form-control"
                  id="instructorName"
                  name="instructorName"
                />
                <ErrorMessage name="instructorName" component="div" className="text-danger" />
              </div>

              <div className="form-group mb-3">
                <label htmlFor="sections">Sections:</label>
                <Field as="select" className="form-control" id="sections" name="sections">
                  <option value="">Select sections</option>
                  <option value="Back end">Back-end</option>
                  <option value="Front end">Front-end</option>
                  <option value="languages">Languages</option>
                  <option value="programming">Programming</option>
                  <option value="Digital marketing">Digital Marketing</option>
                </Field>
                <ErrorMessage name="sections" component="div" className="text-danger" />
              </div>

              <div className="form-group mb-3">
                <label htmlFor="category">Category:</label>
                <Field type="text" className="form-control" id="category" name="category" />
                <ErrorMessage name="category" component="div" className="text-danger" />
              </div>

              <div className="form-group mb-3">
                <label htmlFor="price">Price:</label>
                <Field type="number" className="form-control" id="price" name="price" />
                <ErrorMessage name="price" component="div" className="text-danger" />
              </div>

              <div className="form-group mb-3">
                <label htmlFor="description">Description:</label>
                <Field as="textarea" className="form-control" id="description" name="description" />
                <ErrorMessage name="description" component="div" className="text-danger" />
              </div>

              <div className="form-group mb-3">
                <label htmlFor="courseStartDate">Start Date:</label>
                <Field
                  type="datetime-local"
                  className="form-control"
                  id="courseStartDate"
                  name="courseStartDate"
                />
                <ErrorMessage name="courseStartDate" component="div" className="text-danger" />
              </div>

              <div className="form-group mb-3">
                <label htmlFor="courseEndDate">End Date:</label>
                <Field
                  type="datetime-local"
                  className="form-control"
                  id="courseEndDate"
                  name="courseEndDate"
                />
                <ErrorMessage name="courseEndDate" component="div" className="text-danger" />
              </div>

              <div className="d-flex justify-content-between">
                <button type="submit" className="btn btn-outline-purple" disabled={isSubmitting}>
                  Update Course
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </HelmetProvider>
  );
};

export default UpdateExtraCourse;

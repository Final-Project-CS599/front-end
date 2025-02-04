import React from 'react';
import { HelmetProvider, Helmet } from 'react-helmet-async';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useAddExtraCourse } from '../../../../api/admin/courses/Extra';
import { useNavigate } from 'react-router-dom';
import { showToast } from '../../../../utils/toast';
import { ToastContainer } from 'react-toastify';

// Validation Schema (remains the same)
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
  sections: Yup.string().required('sections is required'),
  category: Yup.string()
    .min(5, 'Category must be at least 5 characters')
    .max(50, 'Category must be at most 50 characters')
    .required('Category is required'),
  price: Yup.number()
    .min(3, 'Price must be at least 3')
    .max(99999, 'Price must be at most 99999')
    .required('Price is required'),
});

function AddNewCourseExtra() {
  const { mutate } = useAddExtraCourse();
  const navigate = useNavigate();

  const initialValues = {
    courseName: '',
    courseCode: '',
    instructorName: '',
    sections: '',
    category: '',
    price: 0,
    description: '',
    courseStartDate: '',
    courseEndDate: '',
  };

  const handleSubmit = (values, { setSubmitting, resetForm }) => {
    mutate(values, {
      onSuccess: () => {
        setSubmitting(false);
        resetForm();
        alert('Course added successfully!');
        navigate('/admin/courses/extra');
      },
      onError: (error) => {
        showToast(error.response.data.message, 'error');
        setSubmitting(false);
      },
    });
  };

  return (
    <HelmetProvider>
      <Helmet>
        <meta name="description" content="Add a new course to your learning platform." />
        <title>Add New Course</title>
      </Helmet>

      <div className="container mt-2">
        <h2 className="mb-4">Add New Course</h2>

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting, errors, touched }) => (
            <Form>
              {/* Course Name */}
              <div className="form-group mb-3">
                <label htmlFor="courseName">Course Name:</label>
                <Field
                  type="text"
                  className={`form-control form-control-md shadow-sm ${
                    touched.courseName && errors.courseName ? 'is-invalid' : ''
                  }`}
                  id="courseName"
                  name="courseName"
                />
                <ErrorMessage name="courseName" component="div" className="invalid-feedback" />
              </div>

              {/* Course Code */}
              <div className="form-group mb-3">
                <label htmlFor="courseCode">Course Code:</label>
                <Field
                  type="text"
                  className={`form-control form-control-md shadow-sm ${
                    touched.courseCode && errors.courseCode ? 'is-invalid' : ''
                  }`}
                  id="courseCode"
                  name="courseCode"
                />
                <ErrorMessage name="courseCode" component="div" className="invalid-feedback" />
              </div>

              {/* Instructor Name */}
              <div className="form-group mb-3">
                <label htmlFor="instructorName">Instructor Name:</label>
                <Field
                  type="text"
                  className={`form-control form-control-md shadow-sm ${
                    touched.instructorName && errors.instructorName ? 'is-invalid' : ''
                  }`}
                  id="instructorName"
                  name="instructorName"
                />
                <ErrorMessage name="instructorName" component="div" className="invalid-feedback" />
              </div>

              {/* sections */}
              <div className="form-group mb-3">
                <label htmlFor="sections">Select sections:</label>
                <Field
                  as="select"
                  className={`form-control form-control-md shadow-sm ${
                    touched.sections && errors.sections ? 'is-invalid' : ''
                  }`}
                  id="sections"
                  name="sections"
                >
                  <option value="">Select sections</option>
                  <option value="Back end">Back-end</option>
                  <option value="Front end">Front End</option>
                  <option value="languages">Languages</option>
                  <option value="programming">Programming</option>
                  <option value="Digital marketing">Digital Marketing</option>
                </Field>
                <ErrorMessage name="sections" component="div" className="invalid-feedback" />
              </div>

              {/* Category */}
              <div className="form-group mb-3">
                <label htmlFor="category">Category:</label>
                <Field
                  type="text"
                  className={`form-control form-control-md shadow-sm ${
                    touched.category && errors.category ? 'is-invalid' : ''
                  }`}
                  id="category"
                  name="category"
                />
                <ErrorMessage name="category" component="div" className="invalid-feedback" />
              </div>

              {/* Price */}
              <div className="form-group mb-3">
                <label htmlFor="price">Price:</label>
                <Field
                  type="number"
                  className={`form-control form-control-md shadow-sm ${
                    touched.price && errors.price ? 'is-invalid' : ''
                  }`}
                  id="price"
                  name="price"
                />
                <ErrorMessage name="price" component="div" className="invalid-feedback" />
              </div>

              {/* Description */}
              <div className="form-group mb-3">
                <label htmlFor="description">Description:</label>
                <Field
                  as="textarea"
                  className={`form-control form-control-md shadow-sm ${
                    touched.description && errors.description ? 'is-invalid' : ''
                  }`}
                  id="description"
                  name="description"
                />
                <ErrorMessage name="description" component="div" className="invalid-feedback" />
              </div>

              {/* Start Date */}
              <div className="form-group mb-3">
                <label htmlFor="courseStartDate">Start Date:</label>
                <Field
                  type="datetime-local"
                  className={`form-control form-control-md shadow-sm ${
                    touched.courseStartDate && errors.courseStartDate ? 'is-invalid' : ''
                  }`}
                  id="courseStartDate"
                  name="courseStartDate"
                />
                <ErrorMessage name="courseStartDate" component="div" className="invalid-feedback" />
              </div>

              {/* End Date */}
              <div className="form-group mb-3">
                <label htmlFor="courseEndDate">End Date:</label>
                <Field
                  type="datetime-local"
                  className={`form-control form-control-md shadow-sm ${
                    touched.courseEndDate && errors.courseEndDate ? 'is-invalid' : ''
                  }`}
                  id="courseEndDate"
                  name="courseEndDate"
                />
                <ErrorMessage name="courseEndDate" component="div" className="invalid-feedback" />
              </div>

              <div className="row">
                <div className="col-md-12">
                  <div className="d-flex justify-content-between">
                    <div>
                      <button
                        type="submit"
                        className="btn btn-md w-40 mt-3"
                        style={{
                          backgroundColor: '#7F55E0',
                          borderColor: '#7F55E0',
                          color: 'white',
                        }}
                        disabled={isSubmitting}
                      >
                        Add Course
                      </button>
                    </div>
                    <div>
                      {/* Reset Button */}
                      <button type="reset" className="btn btn-secondary btn-md w-40 mt-3">
                        Reset
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </Form>
          )}
        </Formik>
      </div>
      <ToastContainer />
    </HelmetProvider>
  );
}

export default AddNewCourseExtra;

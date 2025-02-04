import { ErrorMessage, Field, Form, Formik } from 'formik';
import React, { useEffect, useState } from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { useNavigate, useParams } from 'react-router-dom';
import * as Yup from 'yup';
import {
  useGetAcademicCourseById,
  useUpdateAcademic,
} from '../../../../api/admin/courses/Academic';
import { useGetDepartmentsData } from '../../../../api/admin/GetDepartments';

const UpdateAcademicCourse = () => {
  const { id } = useParams();
  const { data: departmentData } = useGetDepartmentsData();
  const { mutate } = useUpdateAcademic();

  const { data } = useGetAcademicCourseById(id);

  const [initialValues, setInitialValues] = useState({
    courseName: '',
    courseCode: '',
    instructorName: '',
    department: '',
    description: '',
    courseStartDate: '',
    courseEndDate: '',
    courseType: 'Academic',
    category: '',
  });
  const navigate = useNavigate();

  useEffect(() => {
    if (data?.data) {
      setInitialValues({
        courseName: data.data.courseName,
        courseCode: data.data.courseCode,
        instructorName: data.data.instructorName,
        department: data.data.department,
        description: data.data.description,
        courseStartDate: data.data.courseStartDate,
        courseEndDate: data.data.courseEndDate,
        courseType: data.data.courseType,
        category: data.data.category,
      });
    }
  }, [data]);

  const validationSchema = Yup.object({
    instructorName: Yup.string()
      .required('Instructor Name is required')
      .min(2, 'Instructor Name must be at least 2 characters')
      .max(100, 'Instructor Name must be at most 100 characters'),
    courseName: Yup.string()
      .required('Course Name is required')
      .min(2, 'Course Name must be at least 2 characters')
      .max(100, 'Course Name must be at most 100 characters'),
    description: Yup.string()
      .required('Description is required')
      .min(20, 'Description must be at least 20 characters')
      .max(500, 'Description must be at most 500 characters'),
    courseStartDate: Yup.date().required('Start Date is required'),
    courseEndDate: Yup.date()
      .required('End Date is required')
      .min(Yup.ref('courseStartDate'), 'End Date must be after Start Date'),
    courseCode: Yup.string()
      .required('Course Code is required')
      .matches(
        /^[a-zA-Z0-9]{5,10}$/,
        'Course Code must be alphanumeric and between 5 to 10 characters'
      ),
    department: Yup.string().required('Department is required'),
    category: Yup.string()
      .required('Category is required')
      .min(5, 'Category must be at least 5 characters')
      .max(50, 'Category must be at most 50 characters'),
  });

  const handleSubmit = (values, { setSubmitting, resetForm }) => {
    mutate(values, {
      onSuccess: () => {
        setSubmitting(false);
        resetForm();
        alert('Course updated successfully!');
        navigate('/admin/courses/academic');
      },
      onError: (error) => {
        console.error('Error adding course:', error);
        setSubmitting(false);
      },
    });
  };

  if (!data?.data) {
    return <div>Loading...</div>;
  }

  return (
    <HelmetProvider>
      <Helmet>
        <meta name="description" content="Add a new course to your learning platform." />
        <title>Update Course</title>
      </Helmet>

      <div className="container mt-2">
        <h2 className="mb-4">Update Course</h2>

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
          enableReinitialize
        >
          {({ isSubmitting, errors, touched, resetForm }) => (
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

              {/* Department */}
              <div className="form-group mb-3">
                <label htmlFor="department">Select Department:</label>
                <Field
                  as="select"
                  className={`form-control form-control-md shadow-sm ${
                    touched.department && errors.department ? 'is-invalid' : ''
                  }`}
                  id="department"
                  name="department"
                >
                  <option value="">Choose A department</option>
                  {departmentData?.departments?.map((department) => (
                    <option key={department.id} value={department.department_name}>
                      {department.department_name}
                    </option>
                  ))}
                </Field>
                <ErrorMessage name="department" component="div" className="invalid-feedback" />
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
                        Update Course
                      </button>
                    </div>
                    <div>
                      {/* Reset Button */}
                      <button
                        type="button"
                        className="btn btn-secondary btn-md w-40 mt-3"
                        onClick={() => handleReset(resetForm)}
                      >
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
    </HelmetProvider>
  );
};

export default UpdateAcademicCourse;

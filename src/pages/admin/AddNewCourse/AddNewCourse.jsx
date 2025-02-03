import React, { useState } from 'react';
import { HelmetProvider, Helmet } from 'react-helmet-async';

function AddNewCourseacadmic() {
  const [courseData, setCourseData] = useState({
    AdminNID: '',
    courseName: '',
    instructorName: '',
    department: '',
    description: '',
    startDate: '',
    endDate: '',
    courseType: '', // القيمة الافتراضية فارغة
    category: '', // إضافة حقل Category
  });

  const [validationErrors, setValidationErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState(''); // حالة لإظهار رسالة النجاح

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCourseData({
      ...courseData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let errors = {};

    // التحقق من AdminNID
    if (!courseData.AdminNID || courseData.AdminNID.length !== 14 || !/^\d{14}$/.test(courseData.AdminNID)) {
      errors.AdminNID = 'Admin NID must be exactly 14 digits.';
    }

    // التحقق من Course Type
    if (!courseData.courseType) {
      errors.courseType = 'Course type is required.';
    }

    // التحقق من Category
    if (!courseData.category) {
      errors.category = 'Category is required.';
    }

    // التحقق من الحقول الأخرى
    if (!courseData.courseName) errors.courseName = 'Course name is required.';
    if (!courseData.instructorName) errors.instructorName = 'Instructor name is required.';
    if (new Date(courseData.startDate) >= new Date(courseData.endDate)) {
      errors.endDate = 'End date must be later than the start date.';
    }

    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      setSuccessMessage(''); // إخفاء رسالة النجاح إذا كانت هناك أخطاء
      return;
    }

    console.log('Course Added:', courseData);

    // عند إضافة الكورس بنجاح
    setSuccessMessage('Course added successfully!'); // عرض رسالة النجاح

    // إعادة تعيين الحقول بعد الإرسال
    setCourseData({
      AdminNID: '',
      courseName: '',
      instructorName: '',
      department: '',
      description: '',
      startDate: '',
      endDate: '',
      courseType: '', // إعادة تعيين القيمة الافتراضية
      category: '', // إعادة تعيين القيمة الافتراضية
    });
    setValidationErrors({});
  };

  const handleReset = () => {
    if (window.confirm('Are you sure you want to reset the form?')) {
      setCourseData({
        AdminNID: '',
        courseName: '',
        instructorName: '',
        department: '',
        description: '',
        startDate: '',
        endDate: '',
        courseType: '', // إعادة تعيين القيمة الافتراضية
        category: '', // إعادة تعيين القيمة الافتراضية
      });
      setValidationErrors({});
      setSuccessMessage(''); // إخفاء رسالة النجاح عند إعادة التعيين
    }
  };

  return (
    <HelmetProvider>
      <Helmet>
        <meta name="description" content="Add a new course to your learning platform." />
        <title>Add New Course</title>
      </Helmet>

      <div className="container mt-4">
        <h2 className="text-center text-white p-3 rounded shadow" style={{ backgroundColor: '#7F55E0', fontSize: '28px' }}>
          Add New Course
        </h2>

        {successMessage && <div className="alert alert-success">{successMessage}</div>} {/* عرض رسالة النجاح */}

        <form onSubmit={handleSubmit}>
          {/* Admin NID */}
          <div className="form-group mb-3">
            <label htmlFor="AdminNID">Admin NID (14 Digits):</label>
            <input
              type="text"
              className={`form-control form-control-lg shadow-sm ${validationErrors.AdminNID ? 'is-invalid' : ''}`}
              id="AdminNID"
              name="AdminNID"
              value={courseData.AdminNID}
              onChange={handleChange}
              required
            />
            {validationErrors.AdminNID && <div className="invalid-feedback">{validationErrors.AdminNID}</div>}
          </div>

          {/* Course Name */}
          <div className="form-group mb-3">
            <label htmlFor="courseName">Course Name:</label>
            <input
              type="text"
              className="form-control form-control-lg shadow-sm"
              id="courseName"
              name="courseName"
              value={courseData.courseName}
              onChange={handleChange}
              required
            />
            {validationErrors.courseName && <div className="invalid-feedback">{validationErrors.courseName}</div>}
          </div>

          {/* Instructor Name */}
          <div className="form-group mb-3">
            <label htmlFor="instructorName">Instructor Name:</label>
            <input
              type="text"
              className="form-control form-control-lg shadow-sm"
              id="instructorName"
              name="instructorName"
              value={courseData.instructorName}
              onChange={handleChange}
              required
            />
            {validationErrors.instructorName && <div className="invalid-feedback">{validationErrors.instructorName}</div>}
          </div>

          {/* Course Type */}
          <div className="form-group mb-3">
            <label htmlFor="courseType">Course Type:</label>
            <select
              className="form-control form-control-lg shadow-sm"
              id="courseType"
              name="courseType"
              value={courseData.courseType}
              onChange={handleChange}
              required
            >
              <option value="">Select Course Type</option>
              <option value="Academic">Academic</option>
              <option value="Extra">Extra</option>
            </select>
            {validationErrors.courseType && <div className="invalid-feedback">{validationErrors.courseType}</div>}
          </div>

          {/* Category */}
          <div className="form-group mb-3">
            <label htmlFor="category">Category:</label>
            <input
              type="text"
              className={`form-control form-control-lg shadow-sm ${validationErrors.category ? 'is-invalid' : ''}`}
              id="category"
              name="category"
              value={courseData.category}
              onChange={handleChange}
              required
            />
            {validationErrors.category && <div className="invalid-feedback">{validationErrors.category}</div>}
          </div>

          {/* Description */}
          <div className="form-group mb-3">
            <label htmlFor="description">Description:</label>
            <textarea
              className="form-control form-control-lg shadow-sm"
              id="description"
              name="description"
              value={courseData.description}
              onChange={handleChange}
              required
            />
            {validationErrors.description && <div className="invalid-feedback">{validationErrors.description}</div>}
          </div>

          {/* Start Date */}
          <div className="form-group mb-3">
            <label htmlFor="startDate">Start Date:</label>
            <input
              type="datetime-local"
              className="form-control form-control-lg shadow-sm"
              id="startDate"
              name="startDate"
              value={courseData.startDate}
              onChange={handleChange}
              required
            />
            {validationErrors.startDate && <div className="invalid-feedback">{validationErrors.startDate}</div>}
          </div>

          {/* End Date */}
          <div className="form-group mb-3">
            <label htmlFor="endDate">End Date:</label>
            <input
              type="datetime-local"
              className="form-control form-control-lg shadow-sm"
              id="endDate"
              name="endDate"
              value={courseData.endDate}
              onChange={handleChange}
              required
            />
            {validationErrors.endDate && <div className="invalid-feedback">{validationErrors.endDate}</div>}
          </div>

          <div className="d-flex justify-content-between">
            <button type="submit" className="btn btn-lg w-40 mt-3" style={{ backgroundColor: '#7F55E0', borderColor: '#7F55E0', color: 'white' }}>
              Add Course
            </button>
            <button type="button" className="btn btn-secondary btn-lg w-40 mt-3" onClick={handleReset}>
              Reset
            </button>
          </div>
        </form>
      </div>
    </HelmetProvider>
  );
}

export default AddNewCourseacadmic;

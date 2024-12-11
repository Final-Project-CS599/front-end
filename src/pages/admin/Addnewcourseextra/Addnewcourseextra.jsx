import React, { useState } from 'react';
import { HelmetProvider, Helmet } from 'react-helmet-async';

function AddNewCourseextra() {
  const [courseData, setCourseData] = useState({
    courseName: '',
    courseId: '',
    instructorName: '',
    instructorId: '',
    department: '',
    description: '',
    startDate: '',
    endDate: '',
    courseType: 'Extra', 
  });

  const [validationErrors, setValidationErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCourseData({
      ...courseData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    //  validation for Instructor ID
    if (!courseData.instructorId) {
      setValidationErrors({ instructorId: 'Instructor ID is required' });
      return;
    }

    console.log('Course Added:', courseData);
    setCourseData({
      courseName: '',
      courseId: '',
      instructorName: '',
      instructorId: '', 
      department: '',
      description: '',
      startDate: '',
      endDate: '',
      courseType: 'Extra',
    });
    setValidationErrors({});
  };

  const handleReset = () => {
    if (window.confirm('Are you sure you want to reset the form?')) {
      setCourseData({
        courseName: '',
        courseId: '',
        instructorName: '',
        instructorId: '',
        department: '',
        description: '',
        startDate: '',
        endDate: '',
        courseType: 'Extra', 
      });
      setValidationErrors({});
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

        <form onSubmit={handleSubmit}>
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
          </div>

          {/* Course ID */}
          <div className="form-group mb-3">
            <label htmlFor="courseId">Course ID:</label>
            <input
              type="text"
              className="form-control form-control-lg shadow-sm"
              id="courseId"
              name="courseId"
              value={courseData.courseId}
              onChange={handleChange}
              required
            />
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
          </div>

          {/* Instructor ID */}
          <div className="form-group mb-3">
            <label htmlFor="instructorId">Instructor ID:</label>
            <input
              type="text"
              className={`form-control form-control-lg shadow-sm ${validationErrors.instructorId ? 'is-invalid' : ''}`}
              id="instructorId"
              name="instructorId"
              placeholder="Enter the unique Instructor ID"
              value={courseData.instructorId}
              onChange={handleChange}
              required
            />
            {validationErrors.instructorId && <div className="invalid-feedback">{validationErrors.instructorId}</div>}
          </div>

          {/* Category */}
          <div className="form-group mb-3">
            <label htmlFor="category">Select Category:</label>
            <select
              className="form-control form-control-lg shadow-sm"
              id="category"
              name="category"
              value={courseData.category}
              onChange={handleChange}
              required
            >
              <option value="">Select Category</option>
              <option value="Languages">Languages</option>
              <option value="Programing"> Programing</option>
              <option value="Front-end"> Front-end</option>
              <option value="Back-end">Back-end</option>
              <option value="other"> other</option>
            </select>
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
              <option value="Extra">Extra</option>
            </select>
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
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="btn btn-lg w-40 mt-3"
            style={{ backgroundColor: '#7F55E0', borderColor: '#7F55E0', color: 'white', margin: '50px' }}
          >
            Add Course
          </button>

          {/* Reset Button */}
          <button
            type="button"
            className="btn btn-secondary btn-lg w-40 mt-3"
            onClick={handleReset}
            style={{ margin: '50px' }}
          >
            Reset
          </button>
        </form>
      </div>
    </HelmetProvider>
  );
}

export default AddNewCourseextra;

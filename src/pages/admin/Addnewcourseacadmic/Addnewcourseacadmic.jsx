import React, { useState } from 'react';
import { HelmetProvider, Helmet } from 'react-helmet-async';

function AddNewCourseacadmic() {
  const [courseData, setCourseData] = useState({
    courseName: '',
    courseCode: '',
    instructorName: '',
    instructorId: '',
    department: '',
    description: '',
    startDate: '',
    endDate: '',
    courseType: 'Academic',
  });

  const [validationErrors, setValidationErrors] = useState({});
  // new value
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCourseData({
      ...courseData,
      [name]: value,
    });
  };
  // data enter
  const handleSubmit = (e) => {
    e.preventDefault();

    //  validation for Instructor ID cheeck
    if (!courseData.instructorId) {
      setValidationErrors({ instructorId: 'Instructor ID is required' });
      return;
    }

    console.log('Course Added:', courseData);
    setCourseData({
      courseName: '',
      courseCode: '',
      instructorName: '',
      instructorId: '',
      department: '',
      description: '',
      startDate: '',
      endDate: '',
      courseType: 'Academic',
    });
    setValidationErrors({});
  };

  const handleReset = () => {
    if (window.confirm('Are you sure you want to reset the form?')) {
      setCourseData({
        courseName: '',
        courseCode: '',
        instructorName: '',
        instructorId: '',
        department: '',
        description: '',
        startDate: '',
        endDate: '',
        courseType: 'Academic',
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
        <h2 className="mb-4">Add New Course</h2>

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

          {/* Course Code */}
          <div className="form-group mb-3">
            <label htmlFor="courseCode">Course Code:</label>
            <input
              type="text"
              className="form-control form-control-lg shadow-sm"
              id="courseCode"
              name="courseCode"
              value={courseData.courseCode}
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
            {validationErrors.instructorId && (
              <div className="invalid-feedback">{validationErrors.instructorId}</div>
            )}
          </div>

          {/* Department */}
          <div className="form-group mb-3">
            <label htmlFor="department">Select Department:</label>
            <select
              className="form-control form-control-lg shadow-sm"
              id="department"
              name="department"
              value={courseData.department}
              onChange={handleChange}
              required
            >
              <option value="">Select Department</option>
              <option value="Statistical Methods">Statistical Methods (AS)</option>
              <option value="Computer Science">Computer Science (CS)</option>
              <option value="Information systems">Information Systems (IS)</option>
              <option value="Mathematical Methods">Mathematical Methods (MS)</option>
              <option value="Operation research">Operation Research (OR)</option>
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
              <option value="Academic">Academic</option>
            </select>
          </div>

          {/* category */}
          <div className="form-group mb-3">
            <label htmlFor="category">Select category:</label>
            <select
              className="form-control form-control-lg shadow-sm"
              id="category"
              name="category"
              value={courseData.category}
              onChange={handleChange}
              required
            >
              <option value="">Select category</option>
              <option value="introduction">introduction</option>
              <option value="number system">number system</option>
              <option value="operating">operating</option>
              <option value="c++"> c++</option>
              <option value="project"> project</option>
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

          <div className="row">
            <div className="col-md-12">
              <div className="d-flex justify-content-between">
                <div>
                  <button
                    type="submit"
                    className="btn btn-lg w-40 mt-3"
                    style={{ backgroundColor: '#7F55E0', borderColor: '#7F55E0', color: 'white' }}
                  >
                    Add Course
                  </button>
                </div>
                <div>
                  {/* Reset Button */}
                  <button
                    type="button"
                    className="btn btn-secondary btn-lg w-40 mt-3"
                    onClick={handleReset}
                  >
                    Reset
                  </button>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </HelmetProvider>
  );
}

export default AddNewCourseacadmic;

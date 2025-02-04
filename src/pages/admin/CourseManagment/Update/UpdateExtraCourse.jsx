import React, { useState } from 'react';
import { HelmetProvider, Helmet } from 'react-helmet-async';
const UpdateExtraCourse = () => {
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
    price: 0,
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
      price: 0,
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
        price: 0,
      });
      setValidationErrors({});
    }
  };

  return (
    <HelmetProvider>
      <Helmet>
        <meta name="description" content="Update course" />
        <title>Update Course</title>
      </Helmet>

      <div className="container mt-2">
        <h2 className="mb-4">Update Extra course</h2>

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

          {/* Department */}
          <div className="form-group mb-3">
            <label htmlFor="department">Select Sections:</label>
            <select
              className="form-control form-control-lg shadow-sm"
              id="department"
              name="department"
              value={courseData.department}
              onChange={handleChange}
              required
            >
              <option value="">Select Section</option>
              <option value="Statistical Methods">Back-end</option>
              <option value="Computer Science">Front End</option>
              <option value="Information systems">Languages</option>
              <option value="Mathematical Methods">Programming</option>
              <option value="Operation research">Digital Marketing</option>
            </select>
          </div>

          {/* category */}
          <div className="form-group mb-3">
            <label htmlFor="category">Category:</label>
            <input
              type="text"
              className="form-control form-control-lg shadow-sm"
              id="category"
              name="category"
              value={courseData.category}
              onChange={handleChange}
              required
            />
          </div>
          {/* price */}
          <div className="form-group mb-3">
            <label htmlFor="price">Price:</label>
            <input
              type="number"
              className="form-control form-control-lg shadow-sm"
              id="price"
              name="price"
              value={courseData.price}
              onChange={handleChange}
              required
            />
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
                    Update
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
};

export default UpdateExtraCourse;

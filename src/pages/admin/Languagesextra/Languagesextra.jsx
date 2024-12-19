import React, { useState } from 'react';
import { HelmetProvider, Helmet } from 'react-helmet-async';



function AddNewCourse() {
  // State for form data
  const [courseData, setCourseData] = useState({
    courseName: '',
    price: '',
    startDate: '',
    endDate: '',
    category: '',
    description: '',
    instructorName: ''  
  });

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCourseData({
      ...courseData,
      [name]: value
    });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Course Added:', courseData);
    // Optionally, reset 
    setCourseData({
      courseName: '',
      instructorName: '' ,
      category: '',
      description: '',
      price: '',
      startDate: '',
      endDate: ''
    });
  };

  // Handle form reset
  const handleReset = () => {
    setCourseData({
      courseName: '',
      instructorName: '',
      category: '',
      description: '',
      price: '',
      startDate: '',
      endDate: ''
        
    });
  };

  return (
    <HelmetProvider>
      <Helmet>
        <meta name="description" content="Add a new extra course to your learning platform." />
        <title>Add New Extra Course</title>
      </Helmet>
      
      <div className="container mt-4">
        <h2
          className="text-center text-white p-3 rounded shadow"
          style={{ backgroundColor: '#7F55E0', fontSize: '28px' }}>
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

          {/* Category */}
          <div className="form-group mb-3">
            <label htmlFor="category">Category:</label>
            <select
              className="form-control form-control-lg shadow-sm"
              id="category"
              name="category"
              value={courseData.category}
              onChange={handleChange}
              required
            >
              <option value="">Select Category</option>
              <option value="Back-end">Back-end</option>
              <option value="Front-end">Front-end</option>
              <option value="Languages">Languages</option>
              <option value="Programming">Programming</option>
              <option value="Other">Other</option>
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

                    
            {/* Price */}
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
              min="0"
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
                    <button  type="submit"  className="btn btn-lg w-40 mt-3" style={{ backgroundColor: '#7F55E0', borderColor: '#7F55E0', color: 'white'}} >
                        Add Course
                    </button>
                </div>
                <div>
                  {/* Reset Button */}
                  <button  type="button"  className="btn btn-secondary btn-lg w-40 mt-3"  onClick={handleReset}>
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

export default AddNewCourse;

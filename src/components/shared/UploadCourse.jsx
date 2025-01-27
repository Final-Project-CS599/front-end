import { useState } from 'react';
import './UploadCourses.css';
function UploadCourse() {
  const [courseDetails, setCourseDetails] = useState({
    title: '',
    description: '',
    courseCode: '',
    uploadDate: '',
    instructor: '',
    courseLink: '', 
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCourseDetails({
      ...courseDetails,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!courseDetails.courseLink) {
      alert('Please enter a quiz link before submitting.');
      return;
    }
    console.log('Submitting form:', courseDetails);
    alert('Course material uploaded successfully!');
  };

  return (
    <div className="container-upload my-3">
      <h1 className="mb-4" style={{ color: '#6f42c1' }}>
        Upload Course Material
      </h1>
      <form onSubmit={handleSubmit}>
        {/* Title Input */}
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            Title
          </label>
          <input
            type="text"
            className="form-control"
            id="title"
            name="title"
            value={courseDetails.title}
            onChange={handleInputChange}
            required
          />
        </div>

        {/* Description Input */}
        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Description
          </label>
          <textarea
            className="form-control"
            id="description"
            name="description"
            value={courseDetails.description}
            onChange={handleInputChange}
            rows="5"
            required
          ></textarea>
        </div>

        {/* Course Code Input */}
        <div className="mb-3">
          <label htmlFor="courseCode" className="form-label">
            Code
          </label>
          <input
            type="text"
            className="form-control"
            id="courseCode"
            name="courseCode"
            value={courseDetails.courseCode}
            onChange={handleInputChange}
            required
          />
        </div>

        {/* Upload Date Input */}
        <div className="mb-3">
          <label htmlFor="uploadDate" className="form-label">
            Upload Date
          </label>
          <input
            type="date"
            className="form-control"
            id="uploadDate"
            name="uploadDate"
            value={courseDetails.uploadDate}
            onChange={handleInputChange}
            required
          />
        </div>

        {/* Instructor Input */}
        <div className="mb-3">
          <label htmlFor="instructor" className="form-label">
            Instructor Name
          </label>
          <input
            type="text"
            className="form-control"
            id="instructor"
            name="instructor"
            value={courseDetails.instructor}
            onChange={handleInputChange}
            required
          />
        </div>

        {/* Quiz Link Input */}
        <div className="mb-3">
          <label htmlFor="courseLink" className="form-label">
            Quiz Link
          </label>
          <input
            type="url"
            className="form-control"
            id="courseLink"
            name="courseLink"
            value={courseDetails.courseLink}
            onChange={handleInputChange}
            placeholder="Enter link to quiz"
            required
          />
        </div>

        {/* Display Quiz Link */}
        {courseDetails.courseLink && (
          <div className="mb-3">
            <p className="text-success">
              Entered link: <strong>{courseDetails.courseLink}</strong>
            </p>
          </div>
        )}

        {/* Submit Button */}
        <button type="submit" className="btn btn-success">
          Upload Material
        </button>
      </form>
    </div>
  );
}

export default UploadCourse;

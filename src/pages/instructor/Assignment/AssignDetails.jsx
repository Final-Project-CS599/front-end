import { useState } from 'react';

const AssignmentDetails = () => {
  const [assignLink, setassignLink] = useState('');

  const handleLinkChange = (event) => {
    setassignLink(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!assignLink) {
      alert('Please enter a link before submitting.');
      return;
    }
    // Perform logic here (e.g., send link and other details to server)
    console.log('Submitting form with link:', assignLink);
    alert(`Quiz details saved with link: ${assignLink}`);
  };

  return (
    <div className="container mt-4">
      <h2 style={{ color: "#6f42c1" }}>Assignment Details</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label mt-3">Assignment Title</label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter quiz title"
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Category</label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter quiz category"
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Assignment Degree</label>
          <input
            type="number"
            className="form-control"
            placeholder="Enter Total Degree"
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Publish Date</label>
          <input
            type="date"
            className="form-control"
            placeholder="Enter publish date"
            required
          />
          <label className="form-label mt-3">Instructor Name</label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter Instructor Name"
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label mt-3">Assignment Link</label>
          <input
            type="url"
            className="form-control"
            placeholder="Enter link to quiz"
            value={assignLink}
            onChange={handleLinkChange}
            required
          />
        </div>
        {assignLink && (
          <div className="mb-3">
            <p className="text-success">
              Entered link: <strong>{assignLink}</strong>
            </p>
          </div>
        )}
        <button type="submit" className="btn btn-success">
          Save Assignment
        </button>
      </form>
    </div>
  );
};

export default AssignmentDetails;

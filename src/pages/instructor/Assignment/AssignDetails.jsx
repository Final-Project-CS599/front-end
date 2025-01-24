import  { useState } from 'react';

const AssignDetails = () => {
  const [assignFile, setAssignFile] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setAssignFile(file);
    console.log('Selected file:', file);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!assignFile) {
      alert('Please upload a file before submitting.');
      return;
    }
    // Perform upload logic here (e.g., send file to server)
    console.log('Submitting form with file:', assignFile);
    alert(`Assignment details saved with file: ${assignFile.name}`);
  };

  return (
    <div className="container mt-4">
      <h2  style={{ color: "#6f42c1" }}>Assignment Details</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label mt-3" required>Assignment Title</label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter Assignment title"
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Number of Questions</label>
          <input
            type="number"
            className="form-control"
            placeholder="Enter number of questions"
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label" required>Assignment Degree</label>
          <input
            type="number"
            className="form-control"
            placeholder="Enter Total Degree"
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label" required>Upload Assignment File</label>
          <input
            type="file"
            className="form-control"
            accept=".pdf,.doc,.docx,.xlsx"
            onChange={handleFileChange}
            required
          />
        </div>
        {assignFile && (
          <div className="mb-3">
            <p className="text-success">
              Selected file: <strong>{assignFile.name}</strong>
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

export default AssignDetails;

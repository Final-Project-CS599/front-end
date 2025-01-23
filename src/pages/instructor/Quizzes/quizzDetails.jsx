import  { useState } from 'react';

const QuizDetailsPage = () => {
  const [quizFile, setQuizFile] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setQuizFile(file);
    console.log('Selected file:', file);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!quizFile) {
      alert('Please upload a file before submitting.');
      return;
    }
    // Perform upload logic here (e.g., send file to server)
    console.log('Submitting form with file:', quizFile);
    alert(`Quiz details saved with file: ${quizFile.name}`);
  };

  return (
    <div className="container mt-4">
      <h2  style={{ color: "#6f42c1" }}>Quiz Details</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label mt-3" required>Quiz Title</label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter quiz title"
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
          <label className="form-label" required>Quizz Degree</label>
          <input
            type="number"
            className="form-control"
            placeholder="Enter Total Degree"
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label" required>Upload Quiz File</label>
          <input
            type="file"
            className="form-control"
            accept=".pdf,.doc,.docx,.xlsx"
            onChange={handleFileChange}
            required
          />
        </div>
        {quizFile && (
          <div className="mb-3">
            <p className="text-success">
              Selected file: <strong>{quizFile.name}</strong>
            </p>
          </div>
        )}
        <button type="submit" className="btn btn-success">
          Save Quiz
        </button>
      </form>
    </div>
  );
};

export default QuizDetailsPage;

import { useState } from 'react';

const QuizDetailsPage = () => {
  const [quizLink, setQuizLink] = useState('');

  const handleLinkChange = (event) => {
    setQuizLink(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!quizLink) {
      alert('Please enter a link before submitting.');
      return;
    }
    // Perform logic here (e.g., send link and other details to server)
    console.log('Submitting form with link:', quizLink);
    alert(`Quiz details saved with link: ${quizLink}`);
  };

  return (
    <div className="container mt-4">
      <h2 style={{ color: "#6f42c1" }}>Quiz Details</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label mt-3">Quiz Title</label>
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
          <label className="form-label">Quiz Degree</label>
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
          <label className="form-label mt-3">Quiz Link</label>
          <input
            type="url"
            className="form-control"
            placeholder="Enter link to quiz"
            value={quizLink}
            onChange={handleLinkChange}
            required
          />
        </div>
        {quizLink && (
          <div className="mb-3">
            <p className="text-success">
              Entered link: <strong>{quizLink}</strong>
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

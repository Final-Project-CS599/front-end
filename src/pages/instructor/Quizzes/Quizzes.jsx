import { useNavigate } from 'react-router-dom';
const Quizzes = () => {
  const navigate = useNavigate();

  // const handleAddQuiz = (quizType) => {
  //   navigate(`/quiz-details?type=${quizType}`);
  // };

  return (
    <div className="container mt-4">
      <h2  style={{ color: "#6f42c1" }}>Quizzes</h2>
      <div className="row">
        {/* Final Quiz Box */}
        <div className="col-md-12">
          <div className="card shadow-sm">
            <div className="card-body">
              <h5 className="card-title">Final Quiz</h5>
              <p className="card-text">
                Manage and add final quizzes for your course.
              </p>
              <button
                className="btn btn-primary ms-4"
                onClick={() => navigate('/quizzes-details')}
              >
                Add Quiz
              </button>
              <button
                className="btn btn-primary ms-4"
                onClick={() => navigate('/quizzes-details')}
              >
                View Quizzes
              </button>
            </div>
          </div>
        </div>

        {/* Mid-Term Quiz Box */}
        <div className="col-md-12 mt-4">
          <div className="card shadow-sm">
            <div className="card-body">
              <h5 className="card-title">Mid-Term Quiz</h5>
              <p className="card-text">
                Manage and add mid-term quizzes for your course.
              </p>
              <button
                className="btn btn-primary"
                onClick={() => navigate('/quizzes-details')}
              >
                Add Quiz
              </button>
              <button
                className="btn btn-primary ms-4"
                onClick={() => navigate('/quizzes-details')}
              >
                View Quizzes
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Quizzes;

import { Link } from 'react-router-dom';
import './quizz.css';

const QuizzesInstructor = () => {
  return (
    <div className="container mt-4">
      <h2 style={{ color: "#6f42c1" }}>Quizzes</h2>
      <div className="row">
        {/* Final Quiz Box */}
        <div className="col-md-12 mt-2">
          <div className="card-card1 shadow-sm">
            <div className="card-card1-body">
              <h5 className="card-card1-title ms-3 mb-4"style={{ color: "#6f42c1" }} >Final Quiz</h5>
              <p className="card-card1-text ms-3">
                Manage and add final quizzes for your course.
              </p>
              <Link to={'/quizzes-details'} className="btn btn-success ms-4">       
                Add Quiz
              </Link>
              <Link
                className="btn btn-primary ms-4"
                to={'/view-quiz'}
              >
                View Quizzes
              </Link>
            </div>
          </div>
        </div>

        {/* Mid-Term Quiz Box */}
        <div className="col-md-12 mt-5">
          <div className="card-card1 shadow-sm">
            <div className="card-card1-body">
              <h5 className="card-card1-title ms-3 mb-3" style={{ color: "#6f42c1" }}>Mid-Term Quiz</h5>
              <p className="card-card1-text ms-3">
                Manage and add mid-term quizzes for your course.
              </p>
              <Link
                className="btn btn-success ms-4"
                to={'/quizzes-details'}
              >
                Add Quiz
              </Link>
              <Link
                className="btn btn-primary ms-4"
                to={'/view-quiz'}
              >
                View Quizzes
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuizzesInstructor;

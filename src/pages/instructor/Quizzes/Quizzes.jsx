import  { useState, useEffect } from "react";
import axios from "axios";
import { Button, Table, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const QuizzesInstructor = () => {
  const [exams, setExams] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchExams();
  }, []);

  const fetchExams = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/v1/exams");
      setExams(response.data);
    } catch (error) {
      setError("Error fetching exams");
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/api/v1/exams/${id}`);
      setExams(exams.filter((exam) => exam.e_id !== id));
    } catch (error) {
      setError("Error deleting exam");
    }
  };

  return (
    <div className="container mt-4">
      <h2>Exams List</h2>
      
      <Button variant="success" className="mb-3" onClick={() => navigate("/add-exam")}>
        Add Exam
      </Button>
      
      {error && <Alert variant="danger">{error}</Alert>}
      
      <Table striped bordered hover className="mt-3">
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Degree</th>
            <th>Type</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {exams.map((exam) => (
            <tr key={exam.e_id}>
              <td>{exam.e_title}</td>
              <td>{exam.e_description}</td>
              <td>{exam.e_degree}</td>
              <td>{exam.e_type === "mid-term" ? "Mid-Term" : "Final Exam"}</td>
              <td>
                <Button variant="warning" onClick={() => navigate(`/edit-exam/${exam.e_id}`)}>
                  Edit
                </Button>
                <Button variant="danger" onClick={() => handleDelete(exam.e_id)} className="ms-2">
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};


export default QuizzesInstructor;

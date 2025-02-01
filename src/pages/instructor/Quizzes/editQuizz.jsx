import{ useState, useEffect } from "react";
import axios from "axios";
import { Button, Form, Alert } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";

const EditExam = () => {
  const [examData, setExamData] = useState({
    e_title: "",
    e_description: "",
    e_degree: "",
    e_type: "mid-term", 
    e_link: ""
  });
  const [error, setError] = useState("");
  const { examId } = useParams(); // الحصول على المعرف من الـ URL
  const navigate = useNavigate();

  useEffect(() => {
    fetchExamDetails();
  }, []);

  const fetchExamDetails = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/exams/${examId}`);
      setExamData(response.data);
    } catch (error) {
      setError("Error fetching exam details");
    }
  };

  const handleChange = (e) => {
    setExamData({
      ...examData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5000/exams/${examId}`, examData);
      navigate("/exams");
    } catch (error) {
      setError("Error updating exam");
    }
  };

  return (
    <div className="container mt-4">
      <h2>Edit Exam</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="e_title">
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            name="e_title"
            value={examData.e_title}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="e_description">
          <Form.Label>Description</Form.Label>
          <Form.Control
            type="text"
            name="e_description"
            value={examData.e_description}
            onChange={handleChange}
            required
            minLength={20}
          />
        </Form.Group>

        <Form.Group controlId="e_degree">
          <Form.Label>Degree</Form.Label>
          <Form.Control
            type="number"
            name="e_degree"
            value={examData.e_degree}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="e_type">
          <Form.Label>Type</Form.Label>
          <Form.Control
            as="select"
            name="e_type"
            value={examData.e_type}
            onChange={handleChange}
          >
            <option value="mid-term">Mid-Term</option>
            <option value="final-exam">Final Exam</option>
          </Form.Control>
        </Form.Group>

        <Form.Group controlId="e_link">
          <Form.Label>Link</Form.Label>
          <Form.Control
            type="url"
            name="e_link"
            value={examData.e_link}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Button variant="primary" type="submit" className="mt-3">
          Update Exam
        </Button>
      </Form>
    </div>
  );
};

export default EditExam;

import  { useState } from "react";
import axios from "axios";
import { Button, Form, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const QuizDetailsPage = () => {
  const [e_title, setETitle] = useState("");
  const [e_description, setEDescription] = useState("");
  const [e_degree, setEDegree] = useState("");
  const [e_link, setELink] = useState("");
  const [e_courseId, setECourseId] = useState("");
  const [e_instructorId, setEInstructorId] = useState("");
  const [e_type, setEType] = useState(""); // النوع الجديد
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!e_title || !e_description || !e_degree || !e_link || !e_courseId || !e_instructorId || !e_type) {
      setError("All fields are required");
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/exams", {
        e_title,
        e_description,
        e_degree,
        e_link,
        e_courseId,
        e_instructorId,
        e_type  // إرسال النوع للمقابلة في الـ backend
      });

      setSuccess("Exam added successfully!");
      setError("");
      navigate("/exams");
    } catch (error) {
      setError("Failed to add exam");
    }
  };

  return (
    <div className="container mt-4">
      <h2>Add New Exam</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      {success && <Alert variant="success">{success}</Alert>}
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formExamTitle">
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter exam title"
            value={e_title}
            onChange={(e) => setETitle(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="formExamDescription" className="mt-3">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            placeholder="Enter exam description"
            value={e_description}
            onChange={(e) => setEDescription(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="formExamDegree" className="mt-3">
          <Form.Label>Degree</Form.Label>
          <Form.Control
            type="number"
            placeholder="Enter exam degree"
            value={e_degree}
            onChange={(e) => setEDegree(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="formExamLink" className="mt-3">
          <Form.Label>Link</Form.Label>
          <Form.Control
            type="url"
            placeholder="Enter exam link"
            value={e_link}
            onChange={(e) => setELink(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="formCourseId" className="mt-3">
          <Form.Label>Course ID</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter course ID"
            value={e_courseId}
            onChange={(e) => setECourseId(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="formInstructorId" className="mt-3">
          <Form.Label>Instructor ID</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter instructor ID"
            value={e_instructorId}
            onChange={(e) => setEInstructorId(e.target.value)}
          />
        </Form.Group>

        {/* إضافة قائمة منسدلة لاختيار نوع الاختبار */}
        <Form.Group controlId="formExamType" className="mt-3">
          <Form.Label>Exam Type</Form.Label>
          <Form.Control
            as="select"
            value={e_type}
            onChange={(e) => setEType(e.target.value)}
          >
            <option value="">Select Exam Type</option>
            <option value="mid-term">Mid-Term</option>
            <option value="final-exam">Final Exam</option>
          </Form.Control>
        </Form.Group>

        <Button variant="primary" type="submit" className="mt-3">Add Exam</Button>
      </Form>
    </div>
  );
};



export default QuizDetailsPage;

import { useState } from "react";
import axios from "axios";
import { Button, Form, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const AddMaterial = ({ instructorId }) => {
  const [mTitle, setMTitle] = useState("");
  const [mDescription, setMDescription] = useState("");
  const [mLink, setMLink] = useState("");
  const [mCourseId, setMCourseId] = useState("");
  const [file, setFile] = useState(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!mTitle || !mDescription || !mLink || !mCourseId) {
      setError("All fields are required.");
      return;
    }

    if (mDescription.length < 20) {
      setError("Description must be at least 20 characters long.");
      return;
    }

    const urlPattern = /^(ftp|http|https):\/\/[^ "]+$/;
    if (!urlPattern.test(mLink)) {
      setError("Invalid link. Please enter a valid URL.");
      return;
    }

    if (file && file.size > 1024 * 1024 * 1024) {  
      setError("File size exceeds 1GB. Please upload a smaller file.");
      return;
    }

    const formData = new FormData();
    formData.append("m_title", mTitle);
    formData.append("m_description", mDescription);
    formData.append("m_link", mLink);
    formData.append("m_instructor_id", instructorId);
    formData.append("m_courseId", mCourseId);

    if (file) {
      formData.append("file", file);
    }

    try {
      const response = await axios.post("http://localhost:3000/api/v1/courseMaterial/add", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      
      if (response.status === 200) {
        setSuccess("Material added successfully!");
        navigate("/course-materials"); 
      }
    } catch (error) {
      setError("Failed to add material. Please try again.");
      console.error("Error adding material", error);
    }
  };

  return (
    <div className="container mt-4">
      <h2>Add Course Material</h2>

      {error && <Alert variant="danger">{error}</Alert>}

      {success && <Alert variant="success">{success}</Alert>}

      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formTitle">
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter material title"
            value={mTitle}
            onChange={(e) => setMTitle(e.target.value)}
          />
        </Form.Group>
        
        <Form.Group controlId="formDescription" className="mt-3">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            placeholder="Enter material description"
            value={mDescription}
            onChange={(e) => setMDescription(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="formLink" className="mt-3">
          <Form.Label>Link</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter material link (e.g. video URL)"
            value={mLink}
            onChange={(e) => setMLink(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="formCourseId" className="mt-3">
          <Form.Label>Course ID</Form.Label>
          <Form.Control
            type="number"
            placeholder="Enter course ID"
            value={mCourseId}
            onChange={(e) => setMCourseId(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="formFile" className="mt-3">
          <Form.Label>Upload File (Optional)</Form.Label>
          <Form.Control
            type="file"
            onChange={(e) => setFile(e.target.files[0])}
          />
        </Form.Group>

        <Button variant="primary" type="submit" className="mt-3">
          Add Material
        </Button>
      </Form>
    </div>
  );
};

export default AddMaterial;

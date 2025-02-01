import React, { useState } from "react";
import axios from "axios";
import { Container, Form, Button, Alert, Modal } from "react-bootstrap";

function DeleteCourse() {
  const [courseName, setCourseName] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState(null);

  const handleDelete = async () => {
    try {
      const response = await axios.post("http://localhost:3000/courses/deletedCourse", {
        courseName,  // إرسال اسم الكورس فقط
      });

      setShowAlert(true);
      setError(null);
    } catch (err) {
      setError("An error occurred while deleting the course, try again!");
    }

    setShowModal(false);
    setCourseName("");
  };

  return (
    <Container className="mt-5" style={{ maxWidth: "400px" }}>
      <h3 className="text-center mb-4"> Delete course</h3>

      {showAlert && (
        <Alert variant="success" onClose={() => setShowAlert(false)} dismissible>
          The course has been successfully deleted.
        </Alert>
      )}

      {error && <Alert variant="danger">{error}</Alert>}

      <Form>
        <Form.Group className="mb-3">
          <Form.Label>Course name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter the course name "
            value={courseName}
            onChange={(e) => setCourseName(e.target.value)}
          />
        </Form.Group>

        <Button variant="danger" onClick={() => setShowModal(true)} disabled={!courseName}>
          Delete Course
        </Button>
      </Form>

      {/* نافذة تأكيد الحذف */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title> Confirm deletion </Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete the course?"{courseName}"؟</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
          cancel
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            Yes, Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

export default DeleteCourse;

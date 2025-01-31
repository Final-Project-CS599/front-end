import React, { useState } from "react";
import { Container, Form, Button, Alert, Modal } from "react-bootstrap";

function DeleteCourse() {
  const [courseName, setCourseName] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const handleDelete = () => {
    // هنا يمكنك إضافة منطق الحذف عبر API
    console.log(`تم حذف الكورس: ${courseName}`);
    setShowAlert(true);
    setShowModal(false);
    setCourseName(""); // إعادة تعيين الحقل بعد الحذف
  };

  return (
    <Container className="mt-5" style={{ maxWidth: "400px" }}>
      <h3 className="text-center mb-4">حذف الكورس</h3>

      {showAlert && (
        <Alert variant="success" onClose={() => setShowAlert(false)} dismissible>
          تم حذف الكورس بنجاح!
        </Alert>
      )}

      <Form>
        <Form.Group className="mb-3">
          <Form.Label>اسم الكورس</Form.Label>
          <Form.Control
            type="text"
            placeholder="أدخل اسم الكورس"
            value={courseName}
            onChange={(e) => setCourseName(e.target.value)}
          />
        </Form.Group>

        <Button variant="danger" onClick={() => setShowModal(true)} disabled={!courseName}>
          حذف الكورس
        </Button>
      </Form>

      {/* نافذة تأكيد الحذف */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>تأكيد الحذف</Modal.Title>
        </Modal.Header>
        <Modal.Body>هل أنت متأكد من أنك تريد حذف الكورس "{courseName}"؟</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            إلغاء
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            نعم، احذف
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

export default DeleteCourse;

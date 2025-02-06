import React, { useState } from 'react';
import axios from 'axios';
import { Container, Form, Button, Alert, Modal } from 'react-bootstrap';
import { useDeleteCourse } from '../../../../api/admin/courses/courses';

function DeleteCourse() {
  const [courseName, setCourseName] = useState('');
  const [courseCode, setCourseCode] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState(null);

  const { mutate } = useDeleteCourse();

  const handleDelete = async () => {
    mutate(
      {
        courseName,
        courseCode,
      },
      {
        onSuccess: () => {
          setShowAlert(true);
          setError(null);
          setShowModal(false);
          setCourseName('');
          setCourseCode('');
        },
        onError: (error) => {
          setError('An error occurred while deleting the course, try again!');
        },
      }
    );
  };

  return (
    <Container className="mt-5" style={{ maxWidth: '400px' }}>
      <h3 className="text-center mb-4">Delete course</h3>

      {showAlert && (
        <Alert variant="success" onClose={() => setShowAlert(false)} dismissible>
          The course has been successfully deleted!
        </Alert>
      )}

      {error && <Alert variant="danger">{error}</Alert>}

      <Form>
        <Form.Group className="mb-3">
          <Form.Label>Course name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter the course name"
            value={courseName}
            onChange={(e) => setCourseName(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label> Course code</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter the course code"
            value={courseCode}
            onChange={(e) => setCourseCode(e.target.value)}
          />
        </Form.Group>

        <Button
          variant="danger"
          onClick={() => setShowModal(true)}
          disabled={!courseName || !courseCode}
        >
          Delete course
        </Button>
      </Form>

      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title> Confirm deletion </Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete the course? "{courseName}"؟</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancel{' '}
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            Yes, delete
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

export default DeleteCourse;

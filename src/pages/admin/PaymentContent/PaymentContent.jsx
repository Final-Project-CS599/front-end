import React, { useState } from 'react';
import { Button, Container, Row, Col, Form, Alert } from 'react-bootstrap';

const Payment = () => {
  const [showForm, setShowForm] = useState(false); 
  const [studentName, setStudentName] = useState('');
  const [courseName, setCourseName] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [messageDeleted, setMessageDeleted] = useState(false); 

  const handleApprove = () => {
    setShowForm(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!studentName || !courseName) {
      setErrorMessage('Please enter student name and course name'); 
    } else if (!/^[A-Za-z]+$/.test(studentName) || !/^[A-Za-z]+$/.test(courseName)) {
      setErrorMessage('Please enter only letters in the student name and course name'); 
    } else {
      setErrorMessage(''); 
      alert(`Student name: ${studentName}\nCourse name: ${courseName}`);
    }
  };

  const handleCancel = () => {
    fetch('/api/deleteMessage', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ studentName, courseName }),
    })
      .then((response) => {
        if (response.ok) {
          setMessageDeleted(true); 
          setShowForm(false);
          setStudentName(''); 
          setCourseName('');
        } else {
          alert('Deletion failed');
        }
      })
      .catch(() => {
        alert('An error occurred while deleting');
      });
  };

  return (
    <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '20vh' }}>
      <Row className="chat-box p-4 bg-white shadow rounded" style={{ maxWidth: '800px' }}>
        <Col className="text-center">
          <div className="message mb-4">
            <img
              src="https://zaetoon.hsoubcdn.com/helpdesk/3/images/72e2b3f3-8daf-466f-859c-aa87d8116237.png"
              alt="Message Image"
              className="img-fluid rounded mb-4"
              style={{ maxWidth: '100%' }}
            />
          </div>
          <div className="buttons">
            <Button variant="danger" className="mx-2" style={{ fontSize: '18px', padding: '12px 30px' }} onClick={handleCancel}>
              Cancel
            </Button>
            <Button variant="success" className="mx-2" style={{ fontSize: '18px', padding: '12px 30px' }} onClick={handleApprove}>
              Approve
            </Button>  
          </div>

          {showForm && (
            <Form onSubmit={handleSubmit} className="mt-4">
              {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
              
              <Form.Group controlId="formStudentName">
                <Form.Label>Student Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter the student name"
                  value={studentName}
                  onChange={(e) => setStudentName(e.target.value)}
                  required
                />
              </Form.Group>

              <Form.Group controlId="formCourseName">
                <Form.Label>Course Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter the course name"
                  value={courseName}
                  onChange={(e) => setCourseName(e.target.value)}
                  required 
                />
              </Form.Group>

              <Button variant="primary" type="submit" className="mt-3">
                Submit
              </Button>
            </Form>
          )}

          {messageDeleted && (
            <Alert variant="success" className="mt-4">
              The message was successfully removed from the database.
            </Alert>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default Payment;
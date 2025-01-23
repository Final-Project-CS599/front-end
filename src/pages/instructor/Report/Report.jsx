import  { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import axios from 'axios';

const HelpdeskPage = () => {
  const [issueDescription, setIssueDescription] = useState('');
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!issueDescription || !email) {
      setErrorMessage('Please provide both an email and issue description.');
      return;
    }

    setLoading(true);  

    try {
      const response = await axios.post('http://localhost:5000/api/support', {
        description: issueDescription,
        email: email,
      });

      if (response.status === 200) {
        setIsSubmitted(true);
        setIssueDescription('');
        setEmail('');
        setErrorMessage('');
      }
    } catch (error) {
      setErrorMessage('There was an error submitting your issue. Please try again later.');
    }

    setLoading(false);  
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4 p-2 text-white rounded-pill" style={{backgroundColor:'#bd5de2'}}>Instructor HelpDesk</h2>

      {isSubmitted && (
        <Alert variant="success">
          <h4>Issue Submitted Successfully!</h4>
          <p>Your issue has been sent to the admin and an email confirmation has been sent.</p>
        </Alert>
      )}

      {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}

      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Your Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicDescription">
          <Form.Label>Your Issue</Form.Label>
          <Form.Control
            as="textarea"
            rows={5}
            placeholder="Describe the issue you are facing"
            value={issueDescription}
            onChange={(e) => setIssueDescription(e.target.value)}
          />
        </Form.Group>

        <Button variant="primary" type="submit" disabled={loading}>
          {loading ? 'Submitting...' : 'Submit'}
        </Button>
      </Form>
    </div>
  );
};

export default HelpdeskPage;

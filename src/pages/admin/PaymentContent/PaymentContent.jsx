import React, { useEffect, useState } from 'react';
import { Button, Container, Row, Col, Form, Alert } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import {
  useApprovePayment,
  useGetPayments,
  useRejectPayment,
} from '../../../api/admin/courses/courses';

const Payment = () => {
  const [payment, setPayment] = useState();
  const [messageDeleted, setMessageDeleted] = useState(false);
  const { id } = useParams();
  const { data } = useGetPayments();
  const { mutate } = useApprovePayment();
  const { mutate: deletePayment } = useRejectPayment();
  const navigate = useNavigate();

  useEffect(() => {
    if (data && data?.data) {
      if (id) {
        const filteredPayment = data.data.filter((payment) => payment.id === parseInt(id));
        setPayment(filteredPayment[0]);
      } else {
        setPayment(data.data);
      }
    }
  }, [data, id]);

  const handleApprove = () => {
    mutate(payment?.student_id, {
      onSuccess: () => {
        alert('Payment approved successfully!');
        navigate('/admin/payment');
      },
      onError: () => {
        alert('Failed to approve payment');
      },
    });
  };

  const handleCancel = () => {
    deletePayment(payment?.id, {
      onSuccess: () => {
        setMessageDeleted(true);
        navigate('/admin/payment');
      },
      onError: () => {
        alert('Failed to delete payment');
      },
    });
  };

  return (
    <Container
      className="d-flex justify-content-center align-items-center"
      style={{ minHeight: '20vh' }}
    >
      <Row className="chat-box p-4 bg-white shadow rounded" style={{ maxWidth: '800px' }}>
        <Col className="text-center">
          <div className="message mb-4">
            <img
              src={`http://localhost:3000/${payment?.img}`}
              alt="Message Image"
              className="img-fluid rounded mb-4"
              style={{ maxWidth: '50%' }}
            />
          </div>
          <div className="buttons">
            <Button
              variant="danger"
              className="mx-2"
              style={{ fontSize: '18px', padding: '12px 30px' }}
              onClick={handleCancel}
            >
              Cancel
            </Button>
            <Button
              variant="success"
              className="mx-2"
              style={{ fontSize: '18px', padding: '12px 30px' }}
              onClick={handleApprove}
            >
              Approve
            </Button>
          </div>

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

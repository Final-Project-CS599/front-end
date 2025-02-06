import React from 'react';
import { Link } from 'react-router-dom'; // إذا كنت تستخدم React Router
import { useGetPayments } from '../../../api/admin/courses/courses';

function PaymentMessages() {
  const { data } = useGetPayments();

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Payment Messages</h2>
      <div className="list-group">
        {data?.data?.map((msg) => (
          <Link key={msg.id} to={`/admin/payment/${msg.id}`} className="text-decoration-none">
            <div className="list-group-item mb-3 shadow-sm">
              <div className="d-flex align-items-center">
                <img
                  src={`http://localhost:3000/${msg.img}`}
                  alt="Payment Proof"
                  className="img-fluid rounded mr-3"
                  style={{ maxWidth: '150px' }}
                />
                <div>
                  <h6 className="mb-1">{msg.email}</h6>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default PaymentMessages;

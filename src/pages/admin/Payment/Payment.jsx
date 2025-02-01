import React from 'react';
import Style from './Payment.module.css';
import { Link } from 'react-router-dom'; // إذا كنت تستخدم React Router

function PaymentMessages() {
  const messages = [
    {
      id: 1,
      email: "john.doe@example.com",
      imageUrl: "https://via.placeholder.com/150",
      // link: "/admin/paymentcontent" // إضافة الرابط لكل رسالة
    },
    {
      id: 2,
      email: "jane.smith@example.com",
      imageUrl: "https://via.placeholder.com/150",
      // link: "/admin/paymentcontent"
    },
    {
      id: 3,
      email: "mike.johnson@example.com",
      imageUrl: "https://via.placeholder.com/150",
      // link: "/admin/paymentcontent"
    }
  ];

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Payment Messages</h2>
      <Link  to='/admin/paymentcontent' className="list-group">
        {messages.map((msg) => (
          <Link key={msg.id} to={msg.link} className="text-decoration-none">
            <div className="list-group-item mb-3 shadow-sm">
              <div className="d-flex align-items-center">
                <img src={msg.imageUrl} alt="Payment Proof" className="img-fluid rounded mr-3" style={{ maxWidth: "100px" }} />
                <div>
                  <h6 className="mb-1">{msg.email}</h6>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </Link>
    </div>
  );
};

export default PaymentMessages;

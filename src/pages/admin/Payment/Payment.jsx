import React from 'react';
import { Link } from 'react-router-dom'; // إذا كنت تستخدم React Router
import { useGetPayments } from '../../../api/admin/courses/courses';

function PaymentMessages() {
  const { data } = useGetPayments();

  return (
    <div className="container ">
      <h2 className=" mb-4">Payment Messages</h2>
      {data?.data?.length === 0 ? (
        <p className="text-center">No messages found.</p>
      ) : (
        <div className="list-group">
          {data?.data?.map((msg) => (
            <Link key={msg.id} to={`/admin/payment/${msg.id}`} className="text-decoration-none">
              <div className="list-group-item mb-3 shadow-sm">
                <div className="d-flex align-items-center justify-content-around">
                  <img
                    src={`http://localhost:3000/${msg.img}`}
                    alt="Payment Proof"
                    className="img-fluid rounded mr-3"
                    style={{ maxWidth: '150px' }}
                  />
                  <h6 className="mb-1">
                    Initiation Date :{new Date(msg.initiation_date).toLocaleDateString()}
                  </h6>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export default PaymentMessages;

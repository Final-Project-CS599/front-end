import React from 'react';
import { Link } from 'react-router-dom';
import { useGetHelpDeskMessages } from '../../../api/student/HelpDesk';

const ViewMessages = () => {
  const { data, isLoading } = useGetHelpDeskMessages();

  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3>HelpDesk Messages</h3>
        <Link to="/student/helpDesk/send" className="btn btn-outline-purple">
          Send Message
        </Link>
      </div>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div className="list-group">
          {data?.data?.messages?.length > 0 ? (
            data.data.messages.map((msg) => (
              <div key={msg.hd_id} className="list-group-item mb-3">
                <div className="d-flex justify-content-between">
                  <h6>{msg.hd_title}</h6>
                  <h6>{msg.hd_status}</h6>
                </div>
                <p>{msg.hd_description}</p>
              </div>
            ))
          ) : (
            <p>No messages found.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default ViewMessages;

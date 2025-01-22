import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const ViewMessages = () => {
  const [messages, setMessages] = useState([]);

  // Fetch helpdesk messages (replace with your API call)
  useEffect(() => {
    // Example static data (replace with an API call)
    const fetchMessages = async () => {
      const data = [
        { id: 1, email: 'user1@example.com', message: 'I need help with my account.' },
        { id: 2, email: 'user2@example.com', message: 'How do I reset my password?' },
      ];
      setMessages(data);
    };

    fetchMessages();
  }, []);
  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3>HelpDesk Messages</h3>
        <Link to="/student/helpDesk/send" className="btn buttoncolor">
          Send Message
        </Link>
      </div>

      {/* Display Helpdesk Messages */}
      <div className="list-group">
        {messages.map((msg) => (
          <div key={msg.id} className="list-group-item mb-3">
            <h6>{msg.email}</h6>
            <p>{msg.message}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ViewMessages;

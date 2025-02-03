import React, { useEffect, useState } from 'react';
import { useGetStudentMessages } from '../../api/message';
import SendMessage from '../instructor/Chat/SendMessage';

const Messages = () => {
  const { data, isLoading, isError, refetch } = useGetStudentMessages();
  const [messages, setMessages] = useState([]);
  const [showComposeModal, setShowComposeModal] = useState(false);

  useEffect(() => {
    if (data?.data?.messages) {
      setMessages(data.data.messages);
    }
  }, [data]);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error fetching messages</div>;

  const formatDate = (dateString) => {
    const options = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    };
    return new Date(dateString).toLocaleString('en-US', options);
  };

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center">
        <h3 className="text-left mb-4">Messages</h3>
        <button className="btn btn-outline-purple mb-4" onClick={() => setShowComposeModal(true)}>
          Compose New Message
        </button>
      </div>

      {/* Messages List */}
      {messages.length === 0 ? (
        <div className="text-center py-5">
          <h4>No messages found.</h4>
          <p className="text-muted">You don't have any messages yet.</p>
        </div>
      ) : (
        <div className="list-group">
          {messages.map((message, index) => (
            <div key={index} className="list-group-item">
              <div className="d-flex justify-content-between align-items-center mb-2">
                <strong className="sender">
                  {message?.i_firstName} {message?.i_lastName}
                </strong>
                <small className="text-muted">{formatDate(message.m_updated_at)}</small>
              </div>
              <h6 className="mb-1 text-muted">{message.i_email}</h6>
              <div className="d-flex justify-content-between">
                <p className="mb-1 text-muted">Message: {message.m_message}</p>
                <p className="mb-1 text-muted"> {message.type}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Compose Modal */}
      {showComposeModal && (
        <div className="modal" style={{ display: 'block', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <SendMessage
                onClose={() => setShowComposeModal(false)}
                role="student"
                onMessageSent={() => refetch()}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Messages;

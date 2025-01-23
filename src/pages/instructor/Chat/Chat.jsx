import { useState } from 'react';

const ChatWindow = () => {
  const [messages, setMessages] = useState([
    { text: 'Hello, how can I help you today?', sender: 'Instructor' },
    { text: 'I have a question about the assignment.', sender: 'Student' },
  ]);

  const [newMessage, setNewMessage] = useState('');

  const handleSendMessage = () => {
    if (newMessage.trim() !== '') {
      setMessages([...messages, { text: newMessage, sender: 'Instructor' }]);
      setNewMessage('');
    }
  };
  const handleDeleteMessage = (index) => {
    const updatedMessages = messages.filter((_, i) => i !== index);
    setMessages(updatedMessages);
  };
  return (
    <div className="container mt-4">
      <div className="cardchat shadow">
        <div className="card-header  text-white" style={{backgroundColor:'#bd5de2'}}>
          <h4>Instructor Chat</h4>
        </div>
        <div className="card-body" style={{ height: '400px', overflowY: 'scroll' }}>
          <div className="chat-box">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`message ${msg.sender === 'Instructor' ? 'text-white' : 'bg-light'}`}
                style={{ marginBottom: '10px', borderRadius: '10px', padding: '10px' ,backgroundColor:"#bd5de2"}}
              >
                <strong>{msg.sender}: </strong>{msg.text}

                <button
                  className="btn btn-danger btn-sm ms-2"
                  onClick={() => handleDeleteMessage(index)}
                  style={{ float: 'right' }}
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        </div>
        <div className="card-footer">
          <div className="input-group">
            <input
              type="text"
              className="form-control"
              placeholder="Type your message..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
            />
            <button className="btn btn-primary" onClick={handleSendMessage}>Send</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatWindow;

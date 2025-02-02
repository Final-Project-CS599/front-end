import React, { useState, useEffect } from 'react';
import { useSearchByName, useSendMessage } from '../../../api/message'; // Assuming you have a hook for sending messages

const SendMessage = ({ onClose, role, onMessageSent }) => {
  const [receiver, setReceiver] = useState(''); // Stores the receiver's name
  const [receiverId, setReceiverId] = useState(''); // Stores the receiver's ID
  const [content, setContent] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  const { mutate: sendMessage, isLoading: isSending, isError, error } = useSendMessage();
  const { mutate: searchByName, isLoading: isSearchLoading } = useSearchByName();

  // Handle search by name and role
  const handleSearch = () => {
    if (!receiver.trim()) {
      setSearchResults([]); // Clear results if the search term is empty
      return;
    }

    setIsSearching(true);
    searchByName(
      { role, name: receiver },
      {
        onSuccess: (data) => {
          setSearchResults(data.data); // Assuming `data` is an array of results
          setIsSearching(false);
        },
        onError: () => {
          setIsSearching(false);
        },
      }
    );
  };

  // Debounce search to avoid excessive API calls
  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      handleSearch();
    }, 500); // Adjust the delay as needed

    return () => clearTimeout(debounceTimer);
  }, [receiver]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newMessage = {
      m_message: content,
      role,
      reciever: receiverId, // Send the receiver's ID instead of the name
    };

    sendMessage(newMessage, {
      onSuccess: () => {
        setReceiver('');
        setReceiverId('');
        setContent('');
        onMessageSent();
        onClose(); // Close the compose modal or form
      },
    });
  };

  return (
    <div className="card shadow">
      <div className="card-header bg-primary text-white">
        <h5 className="card-title mb-0">Compose New Message</h5>
      </div>
      <div className="card-body">
        <form onSubmit={handleSubmit}>
          {/* Receiver Field */}
          <div className="mb-3">
            <label htmlFor="receiver" className="form-label">
              Receiver
            </label>
            <input
              type="text"
              className="form-control"
              id="receiver"
              placeholder="Enter receiver's name"
              value={receiver}
              onChange={(e) => setReceiver(e.target.value)}
              required
            />
            {/* Display search results */}
            {isSearching && <p>Searching...</p>}
            {!isSearching && searchResults.length > 0 && (
              <ul className="list-group mt-2">
                {searchResults.map((result) => (
                  <li
                    key={result.s_id || result.i_id} // Use appropriate ID based on role
                    className="list-group-item list-group-item-action"
                    onClick={() => {
                      setReceiver(result.s_first_name || result.i_first_name); // Set the receiver's name
                      setReceiverId(result.s_id || result.i_id); // Set the receiver's ID
                    }}
                    style={{ cursor: 'pointer' }}
                  >
                    {result.s_first_name || result.i_first_name} {/* Display the receiver's name */}
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Message Content Field */}
          <div className="mb-3">
            <label htmlFor="content" className="form-label">
              Message
            </label>
            <textarea
              className="form-control"
              id="content"
              rows="5"
              placeholder="Type your message here..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
            />
          </div>

          {/* Error Message */}
          {isError && (
            <div className="alert alert-danger" role="alert">
              {error?.message || 'Failed to send message. Please try again.'}
            </div>
          )}

          {/* Buttons */}
          <div className="d-flex justify-content-end gap-2">
            <button type="button" className="btn btn-secondary" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn btn-outline-purple" disabled={isSending}>
              {isSending ? 'Sending...' : 'Send Message'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SendMessage;

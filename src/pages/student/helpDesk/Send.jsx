import React, { useState } from 'react';
import { useSendHelpDeskMessage } from '../../../api/student/HelpDesk';
import { IoChevronBackSharp } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';

const Send = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const { mutate: sendMessage, isPending } = useSendHelpDeskMessage();

  const handleSubmit = (e) => {
    e.preventDefault();
    sendMessage({ title, description, email });
  };

  return (
    <div>
      <div className="d-flex gap-5 align-items-center mb-4">
        <IoChevronBackSharp cursor={'pointer'} onClick={() => navigate(-1)} />
        <h3>Send Help Desk Message</h3>
      </div>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Title"
          className="form-control w-50 mt-4"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          className="form-control w-50 mt-4"
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <div className="form-floating">
          <textarea
            className="form-control w-50 mt-4"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            id="floatingTextarea"
            style={{ height: '200px' }}
          />
          <label htmlFor="floatingTextarea">Your Message</label>
        </div>

        <button type="submit" className="btn btn-outline-purple mt-4 w-25" disabled={isPending}>
          {isPending ? 'Sending...' : 'Send'}
        </button>
      </form>
    </div>
  );
};

export default Send;

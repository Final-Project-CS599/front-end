import React from 'react';

const Chat = () => {
  return (
    <div>
      <h3>Chat with Instructor</h3>
      <select className="form-select w-50 mt-4" aria-label="Default select example">
        <option defaultValue>Select Instructor</option>
        <option value="1">One</option>
        <option value="2">Two</option>
        <option value="3">Three</option>
      </select>
      <div className="form-floating">
        <textarea
          className="form-control w-50 mt-4"
          placeholder="Leave a comment here"
          id="floatingTextarea"
          style={{ height: '200px' }}
        ></textarea>
        <label htmlFor="floatingTextarea">Detailed Message</label>
      </div>
      <button className="btn btn-outline-purple mt-4 w-25"> Send</button>
    </div>
  );
};

export default Chat;

import React from 'react';

const Report = () => {
  return (
    <div>
      <h3>Report</h3>
      <input type="text" placeholder="Enter your Email" className="form-control w-50 mt-4" />
      <div className="form-floating">
        <textarea
          className="form-control w-50 mt-4"
          placeholder="Leave a comment here"
          id="floatingTextarea"
          style={{ height: '200px' }}
        ></textarea>
        <label htmlFor="floatingTextarea">Your Message</label>
      </div>
      <button className="btn btn-outline-purple mt-4 w-25">Submit</button>
    </div>
  );
};

export default Report;

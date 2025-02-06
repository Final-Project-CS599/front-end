import React from 'react';
import { useNavigate } from 'react-router-dom';

const InstructorCard = ({ id, name, department, image }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/student/instructors/${id}`);
  };

  return (
    <div
      className="card border-purple mb-3"
      style={{ width: '15rem', boxShadow: '0px 5px 13px rgba(0, 0, 0, 0.4)' }}
    >
      <img
        width={'150px'}
        height={'150px'}
        src={image}
        className="card-img-top"
        alt="Instructor"
        style={{ objectFit: 'contain' }}
      />
      <div className="card-body">
        <h5 className="card-title">{name}</h5>
        <p className="card-text" style={{ fontSize: '12px' }}>
          {department}
        </p>
        <button onClick={handleClick} className="btn btn-outline-purple">
          View profile
        </button>
      </div>
    </div>
  );
};

export default InstructorCard;

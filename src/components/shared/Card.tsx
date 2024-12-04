import React from 'react';
const Card = ({ title, description, img }) => {
  return (
    <div className="card" style={{ width: '15rem' }}>
      <img
        src={img}
        className="card-img-top"
        alt="img"
        style={{ objectFit: 'contain' }}
        width={'100px'}
        height={'150px'}
      />
      <div className="card-body">
        <h5 className="card-title">{title}</h5>
        <p className="card-text">{description}</p>
        <button className="btn btn-outline-purple w-50 ">View</button>
      </div>
    </div>
  );
};

export default Card;

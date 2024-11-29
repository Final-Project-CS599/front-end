import React from 'react';
import { Link } from 'react-router-dom';

const NavButton = ({ text, icon, to }) => {
  return (
    <div className="d-flex align-items-center gap-2  w-100">
      <Link className="text-decoration-none w-100" to={to}>
        <button type="button" className="btn my-1 w-100  d-flex">
          <span className="me-3">{icon}</span>
          <span>{text}</span>
        </button>
      </Link>
    </div>
  );
};

export default NavButton;

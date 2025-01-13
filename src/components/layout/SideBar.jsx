import React from 'react';
import { IoMdSettings } from 'react-icons/io';
import { NavLink } from 'react-router-dom';
import { getNavButtonsByRole } from './NavButtons';
import NavButton from '../shared/NavButton';

const SideBar = () => {
  const userRole = localStorage.getItem('userRole'); // Or your auth logic
  const navButtons = getNavButtonsByRole(userRole);

  return (
    <div
      className="d-none d-lg-flex flex-column px-3 mt-2 border-3 border-end border-light"
      style={{ height: '82vh' }}
    >
      {navButtons.map((button) => (
        <NavButton key={button.to} text={button.text} icon={button.icon} to={button.to} />
      ))}
      <div className="mt-auto w-100">
        <div className="d-flex align-items-center gap-3 mb-3 w-100">
          <img src="https://via.placeholder.com/50" alt="Profile" className="rounded-circle" />
          <div className="w-100">
            <p className="mb-0">User Name</p>
            <small className="text-muted">{userRole}</small>
          </div>
          <NavLink to={`/${userRole}/profile`}>
            <IoMdSettings color="#5f6774" />
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default SideBar;

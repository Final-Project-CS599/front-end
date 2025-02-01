import React, { useContext, useEffect } from 'react';
import { IoMdSettings } from 'react-icons/io';
import { NavLink, useNavigate } from 'react-router-dom';
import { getNavButtonsByRole } from './NavButtons';
import NavButton from '../shared/NavButton';
import { FaUser, FaUserPlus } from 'react-icons/fa';
import { UserContext } from '../../Context/UserContext.jsx';

const SideBar = () => {
  const userData = JSON.parse(localStorage.getItem('userData'));
  const navButtons = getNavButtonsByRole(userData.role);
  const navigate = useNavigate();

  const handleClick = () => {
    if (userData?.role === 'admin' || userData?.role === 'sAdmin') {
      navigate('/admin/addAdmin');
    } else {
      return;
    }
  };

  return (
    <div
      className="d-none d-lg-flex flex-column px-3 mt-2 border-3 border-end border-light"
      style={{ height: '82vh' }}
    >
      {navButtons.map((button) => (
        <NavButton key={button.to} text={button.text} icon={button.icon} to={button.to} />
      ))}
      <div className="mt-auto w-100">
        <div className="d-flex align-items-center gap-2 mb-3 w-100">
          <div onClick={handleClick}>
            {userData?.role === 'admin' || userData?.role === 'sAdmin' ? (
              <FaUserPlus color="#5f6774" size={50}  style={{ cursor: 'pointer' }}/>
            ) : (
              <FaUser color="#5f6774" size={50}  />
            )}
          </div>

          <div className="w-100">
            <p className="mb-0">{userData?.fullName}</p>
            <small className="text-muted">{userData?.role}</small>
          </div>
          <NavLink to={`/${userData?.role === 'sAdmin' ? 'admin' : userData?.role}/profile`}>
            <IoMdSettings color="#5f6774" />
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default SideBar;

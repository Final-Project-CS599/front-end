import React from 'react';
import { Link } from 'react-router-dom';
import HomeLogo from '../../assets/images/imgAdmin/HomeLogo.jpg';
import { FaUserCircle } from 'react-icons/fa';
import NavButton from '../shared/NavButton';
import { getNavButtonsByRole } from './NavButtons';

const MobileNav = () => {
  const userRole = localStorage.getItem('userRole'); // Or your auth logic

  console.log(userRole);
  const navButtons = getNavButtonsByRole(userRole);

  return (
    <>
      <nav className="navbar d-lg-none navbar-expand-lg navbar-light bg-light position-relative">
        <button
          className="btn d-lg-none position-absolute start-0 m-2"
          type="button"
          data-bs-toggle="offcanvas"
          data-bs-target="#leftOffcanvas"
          aria-controls="leftOffcanvas"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <Link className="navbar-brand mx-auto text-decoration-none" to={`/${userRole}/home`}>
          <img src={HomeLogo} alt="logo" width={'60px'} height={'60px'} />
        </Link>
        <button
          className="btn d-lg-none position-absolute end-0 m-2"
          type="button"
          data-bs-toggle="offcanvas"
          data-bs-target="#rightOffcanvas"
          aria-controls="rightOffcanvas"
        >
          <FaUserCircle className="fs-3" />
        </button>
      </nav>

      <div className="offcanvas offcanvas-start" tabIndex="-1" id="leftOffcanvas">
        <div className="offcanvas-header">
          <h5 className="offcanvas-title">{`${userRole.charAt(0).toUpperCase() + userRole.slice(1)} Menu`}</h5>
          <button type="button" className="btn-close" data-bs-dismiss="offcanvas"></button>
        </div>
        <div className="offcanvas-body">
          {navButtons.map((button) => (
            <NavButton key={button.to} text={button.text} icon={button.icon} to={button.to} />
          ))}
        </div>
      </div>

      <div className="offcanvas offcanvas-end" tabIndex="-1" id="rightOffcanvas">
        <div className="offcanvas-header">
          <h5 className="offcanvas-title">Profile Menu</h5>
          <button type="button" className="btn-close" data-bs-dismiss="offcanvas"></button>
        </div>
        <div className="offcanvas-body d-flex flex-column align-items-start">
          <Link to={`/${userRole}/profile`} className="btn">
            Profile
          </Link>
          <button
            onClick={() => {
              /* Add logout logic */
            }}
            className="btn"
          >
            Logout
          </button>
        </div>
      </div>
    </>
  );
};

export default MobileNav;

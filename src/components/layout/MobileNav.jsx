import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import HomeLogo from '../../assets/images/imgAdmin/HomeLogo.jpg';
import { FaUserCircle } from 'react-icons/fa';
import NavButton from '../shared/NavButton';
import { getNavButtonsByRole } from './NavButtons';
import { FaUser, FaUserPlus } from 'react-icons/fa';


const MobileNav = () => {
  
  const navigate = useNavigate();
  const userData = JSON.parse(localStorage.getItem('userData'));
  const navButtons = getNavButtonsByRole(userData.role);

  const handleClick = () => {
    if (userData?.role === 'admin' || userData?.role === 'sAdmin') {
      navigate('/admin/addAdmin');
    } else {
      return;
    }
  };

  function logOut() {
    localStorage.removeItem('userToken');
    localStorage.removeItem('userData');
    navigate('/login');
  }

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

        <Link className="navbar-brand mx-auto text-decoration-none" to={`/${userData.role}/home`}>
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
          <h5 className="offcanvas-title">
            {userData?.role
              ? `${userData.role.charAt(0).toUpperCase() + userData.role.slice(1)} Menu`
              : 'Menu'}
          </h5>
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
        <div className="offcanvas-body d-flex flex-column align-items-start ">
          <div onClick={handleClick} >
            {userData?.role === 'admin' || userData?.role === 'sAdmin' ? (
              <FaUserPlus color="#5f6774" size={30}  style={{ cursor: 'pointer' }}/>
            ) : (
              <FaUser color="#5f6774" size={30} />
            )}
          </div>

          <div className="w-100 pt-4">
            <p className="mb-0">{userData?.fullName}</p>
            <small className="text-muted">{userData?.role}</small>
          </div>

          <Link to={`/${userData.role}/profile`} className="btn pb-4 pt-3 ">
            Profile
          </Link>

          <button className="btn buttoncolor pb-2 me-4">
            <span onClick={() => logOut()} className="cursor-pointer">
              Logout
            </span>
          </button>
        </div>
      </div>
    </>
  );
};

export default MobileNav;

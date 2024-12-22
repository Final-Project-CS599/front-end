import React from 'react';
import { Link } from 'react-router-dom';
import HomeLogo from '../../assets/images/imgAdmin/HomeLogo.jpg';
import { BiSearchAlt,} from 'react-icons/bi';
import { FaBookOpen, FaUser, FaUserCircle } from 'react-icons/fa';
import {MdHelpOutline} from 'react-icons/md';
import NavButton from './../shared/NavButton';


const MobileNav = () => {
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

        <Link className="navbar-brand mx-auto text-decoration-none" to="/">
          <img src={HomeLogo} alt="logo" width={'60px'} height={'60px'} />
        </Link>
        <button className="btn d-lg-none position-absolute end-0 m-2" 
          type="button" 
          data-bs-toggle="offcanvas"
          data-bs-target="#rightOffcanvas" 
          aria-controls="rightOffcanvas"
        >
          <FaUserCircle  className='fs-3'/>
        </button>
      </nav>

      <div className="offcanvas offcanvas-start" 
        tabIndex="-1" 
        id="leftOffcanvas" 
        aria-labelledby="leftOffcanvasLabel" >
        <div className="offcanvas-header">
          <h5 className="offcanvas-title" id="leftOffcanvasLabel">
            Menu
          </h5>
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>
        </div>
        <div className="offcanvas-body ">
        <NavButton text={'Courses'} icon={<FaBookOpen />} to={'/admin/courses'} />
        <NavButton text={'Department'} icon={<FaBookOpen />} to={'/admin/AddDepartment'} />
        <NavButton text={'Instructors'} icon={<FaUser />} to={'/admin/instructors'} />
        <NavButton text={'Student'} icon={<FaUser />} to={'/admin/student'} />
        <NavButton text={'HelpDesk'} icon={<MdHelpOutline className='fs-4'/>} to={'/admin/helpdesk'} />
        <NavButton text={'About'} icon={<i className="fa-solid fa-address-card fs-5"></i>} to={'/admin/about'}/>
        <NavButton text={'Add Admin'} icon={<i className="fa-solid fa-address-card fs-0"></i>} to={'/admin/addAdmin'}/>
        </div>
      </div>

      <div className="offcanvas offcanvas-end" tabIndex="-1" id="rightOffcanvas" aria-labelledby="rightOffcanvasLabel" >
        <div className="offcanvas-header">
          <h5 className="offcanvas-title" id="rightOffcanvasLabel">
            Right Menu
          </h5>
          <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close" ></button>
        </div>
        <div className="offcanvas-body d-flex flex-column align-items-start">
          <Link to="/admin/profile" className="btn">Profile</Link>
          
        </div>
      </div>
    </>
  );
};

export default MobileNav;

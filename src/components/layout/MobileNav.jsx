import React from 'react';
import { Link } from 'react-router-dom';
import HomeLogo from '../../assets/images/imgAdmin/HomeLogo.jpg';
import NavButton from './../shared/NavButton';
import { BiSearchAlt,} from 'react-icons/bi';
import { FaBookOpen, FaUser, FaUserCircle } from 'react-icons/fa';
import {MdHelpOutline} from 'react-icons/md';

const MobileNav = () => {
  return (
    <>
      <nav className="navbar d-lg-none navbar-expand-lg navbar-light bg-light position-relative">
        <button
          className="btn  d-lg-none position-absolute start-0 m-2" 
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
        <button className="btn  d-lg-none position-absolute end-0 m-2" 
          type="button" 
          data-bs-toggle="offcanvas"
          data-bs-target="#rightOffcanvas" 
          aria-controls="rightOffcanvas"
        >
          <FaUserCircle />
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
        <NavButton text={'Courses'} icon={<FaBookOpen />} to={'/courses'} />
        <NavButton text={'Instructors'} icon={<FaUser />} to={'/instructors'} />
        <NavButton text={'Student'} icon={<FaUser />} to={'/student'} />
        <NavButton text={'HelpDesk'} icon={<MdHelpOutline className='fs-4'/>} to={'/helpdesk'} />
        <NavButton text={'About'} icon={<i class="fa-solid fa-address-card fs-5"></i>} to={'/about'}/>
        <NavButton text={'Add Admin'} icon={<i class="fa-solid fa-address-card fs-0"></i>} to={'/addAdmin'}/>
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
          <h3 className="btn">Messages</h3>
          <h3 className="btn">About</h3>
          <h3 className="btn">Settings</h3>
          <div className="input-group flex-nowrap ms-2">
            <span className="input-group-text" id="addon-wrapping">
              <BiSearchAlt />
            </span>
            <input className="form-control" type="search" placeholder="Search" aria-label="Search"/>
          </div>
        </div>
      </div>
    </>
  );
};

export default MobileNav;
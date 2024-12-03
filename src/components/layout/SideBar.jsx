import React from 'react';
import NavButton from '../shared/NavButton.jsx';
import { FaBookOpen, FaUser } from 'react-icons/fa';
import { FaUserPlus } from "react-icons/fa6";
import { NavLink } from 'react-router-dom';

const SideBar = () => {
  return (
    <div className="d-none d-lg-flex flex-column px-3 mt-1 border-3 border-end border-light" style={{ height: '82vh' }} >

      <NavButton text={'Home'} icon={<i class="fa-solid fa-house-user fs-4"></i>} to={'/'} />
      <NavButton text={'Courses'} icon={<FaBookOpen className='fs-4 '/>} to={'/courses'} />
      <NavButton text={'Instructors'} icon={<FaUser className='fs-4 '/>} to={'/instructors'} />
      <NavButton text={'Student'} icon={<FaUser  className='fs-4 '/>} to={'/student'} />
      <NavButton text={'HelpDesk'} icon={<i class="fa-solid fa-circle-question fs-4"></i>} to={'/helpdesk'} />
      <NavButton text={'About'} icon={<i class="fa-solid fa-address-card fs-5"></i>} to={'/about'}/>


      <div className="mt-auto w-100">
        <div className="d-flex align-items-center gap-3 mb-3 w-100">
          <img src="https://via.placeholder.com/50" alt="Profile" className="rounded-circle" />
          
          <NavLink to="/profile" style={{ textDecoration: 'none' }} className="w-100">
            <p className="mb-0">John</p>
            <small className="text-muted">Admin</small>
          </NavLink>
          <NavLink to="/addAdmin">
            <FaUserPlus  color="#5f6774" className="fs-4 " />
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default SideBar;

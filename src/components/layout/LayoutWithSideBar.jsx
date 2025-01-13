import React from 'react';
import { Outlet } from 'react-router-dom';
import NavBar from '../layout/NavBar';
import MobileNav from '../layout/MobileNav';
import SideBar from '../layout/SideBar';

const LayoutWithSideBar = () => {
  localStorage.setItem('userRole', 'student');
  return (
    <div className="">
      <NavBar />
      <MobileNav />
      <div className="d-flex gap-3">
        <SideBar />
        <div className="container w-100 my-3">
          <div className=" row">
            <div className=" col-md-12">
              <Outlet />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LayoutWithSideBar;

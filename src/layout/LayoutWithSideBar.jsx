import React from 'react';
import SideBar from './SideBar';
import NavBar from './NavBar';
import { Outlet } from 'react-router-dom';
import MobileNav from './MobileNav';

const LayoutWithSideBar = () => {
  return (
    <div className="">
      <NavBar />
      <MobileNav />
      <div className="d-flex gap-3">
        <SideBar />
        <div className="w-100 my-3">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default LayoutWithSideBar;

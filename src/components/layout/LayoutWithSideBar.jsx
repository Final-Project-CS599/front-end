import React from 'react';
import { Outlet } from 'react-router-dom';
import NavBar from '../layout/NavBar.jsx';
import MobileNav from '../layout/MobileNav.jsx';
import SideBar from '../layout/SideBar.jsx';

const LayoutWithSideBar = () => {
  return (
    <div className="">
      <NavBar />
      <MobileNav />
      <div className="d-flex gap-3">
        <SideBar />
        <div className="w-100 my-3">
            <Outlet></Outlet>
        </div>
      </div>
    </div>
  );
};

export default LayoutWithSideBar;

import React from 'react';
import { Outlet } from 'react-router-dom';
import NavBar from '../layout/NavBar';
import MobileNav from '../layout/MobileNav';
import SideBar from '../layout/SideBar';

const LayoutWithSideBar = () => {
  return (
    <div className="">
      <NavBar />
      <MobileNav />
      <div className="d-flex gap-3">
        <SideBar />
        <div className="w-100 h-100 my-3">
            <Outlet/>
        </div>
      </div>
    </div>
  );
};

export default LayoutWithSideBar;

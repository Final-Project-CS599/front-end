import React from 'react';
import SideBar from './SideBar';
import NavBar from './NavBar';
import { Outlet } from 'react-router-dom';

const LayoutWithSideBar = () => {
  return (
    <div className="">
      <NavBar />
      <div className="d-flex gap-3">
        <SideBar />
        <Outlet />
      </div>
    </div>
  );
};

export default LayoutWithSideBar;

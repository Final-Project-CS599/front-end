import React, { useEffect } from 'react';
import { Navigate, Outlet, useLocation, useNavigate } from 'react-router-dom';
import NavBar from '../layout/NavBar';
import MobileNav from '../layout/MobileNav';
import SideBar from '../layout/SideBar';
import { getHomePath } from './NavButtons.jsx';


const LayoutWithSideBar = () => {
  const location = useLocation();
  const userData = JSON.parse(localStorage.getItem("userData"));

  const noSidebarPaths = ["/login", "/confirmEmail", "/forgetPassword", "/ResetPassword"];
  const isHidden = !userData || noSidebarPaths.includes(location.pathname); 
  
  if (!userData) {
    return <Navigate to="/login" />;
  }


  return (
    <div className="">
      {!isHidden && <NavBar />}
      {!isHidden && <MobileNav />}
      <div className="d-flex gap-3">
        {!isHidden && <SideBar userData={userData} />}
        <div className="container w-100 my-3">
          <div className="row">
            <div className="col-md-12">
              <Outlet />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LayoutWithSideBar;


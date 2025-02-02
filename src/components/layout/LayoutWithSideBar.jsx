import { Navigate, Outlet } from 'react-router-dom';
import MobileNav from '../layout/MobileNav';
import NavBar from '../layout/NavBar';
import SideBar from '../layout/SideBar';


const LayoutWithSideBar = () => {
  const userData = JSON.parse(localStorage.getItem('userData'));

  if (!userData) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="">
      <NavBar />
      <MobileNav />
      <div className="d-flex gap-3">
        <SideBar />
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

import React from 'react';
import HomeLogo from '../../assets/images/imgAdmin/HomeLogo.jpg';
import { BiSearchAlt } from 'react-icons/bi';
import { Link, NavLink, useNavigate } from 'react-router-dom';

const NavBar = () => {
  let navigate = useNavigate();
    function logOut(){
        // localStorage.setItem('userToken' , null);
        localStorage.removeItem('userToken');
        // serUserToken(null);
        navigate('/login')
    }
  return (
    <nav className="navbar pb-0 d-none d-lg-flex navbar-expand-lg navbar-light bg-light w-100 ">
      <div className="container-fluid">
        <Link className="navbar-brand text-decoration-none ms-3" to="/">
          <img src={HomeLogo} alt="logo" width={'60px'} height={'60px'} />
        </Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0"></ul>
          <form
            className="d-flex flex-sm-column flex-lg-row gap-sm-3 gap-lg-5 align-items-sm-start align-items-lg-center "
            style={{ width: '35%' }}
          > 
            {/* <NavLink className="text-decoration-none text-purple " to="/about" >
              About
            </NavLink> */}
            
            <div className="input-group flex-nowrap w-75">
              <span className="input-group-text" id="addon-wrapping">
                <BiSearchAlt />
              </span>
              <input className="form-control me-2 input" type="search" placeholder="Search" aria-label="Search" />
            </div>
            <button className="btn buttoncolor pb-2 me-4">
                <span onClick={()=>logOut()} className="cursor-pointer"> Logout</span>
            </button>
          </form>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;

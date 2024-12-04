import React from 'react';
import Logo from '../assets/images/LogoSVG.svg';
import { BiSearchAlt } from 'react-icons/bi';
import { FaEnvelope, FaRegEnvelope } from 'react-icons/fa';
import { Link, NavLink } from 'react-router-dom';
const NavBar = () => {
  return (
    <nav className="navbar pb-0 d-none d-lg-flex navbar-expand-lg navbar-light bg-white w-100 border-bottom">
      <div className="container-fluid">
        <Link className="navbar-brand text-decoration-none ms-3" to="/">
          <img src={Logo} alt="logo" width={'60px'} height={'60px'} />
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0"></ul>
          <form
            className="d-flex flex-sm-column flex-lg-row gap-sm-3 gap-lg-5 align-items-sm-start align-items-lg-center "
            style={{ width: '35%' }}
          >
            <NavLink className="text-decoration-none" to="/student/messages">
              <FaEnvelope color="#9095a0" />
            </NavLink>
            <NavLink className="text-decoration-none" to="/about" style={{ color: '#9095a0' }}>
              About
            </NavLink>
            <div className="input-group flex-nowrap w-75">
              <span className="input-group-text" id="addon-wrapping">
                <BiSearchAlt />
              </span>
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
              />
            </div>
          </form>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;

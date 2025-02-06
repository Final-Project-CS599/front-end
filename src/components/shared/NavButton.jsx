import React from 'react';
import { NavLink } from 'react-router-dom';

const NavButton = ({ text, icon, to }) => {
  return (
    <div className="d-flex align-items-center gap-2 w-100">
      <NavLink
        className={({ isActive }) => {
          const currentPath = window.location.pathname;
          const basePath = to.replace(/\/$/, '');
          const isRouteActive = currentPath.startsWith(basePath);

          return `text-decoration-none w-100 ${isRouteActive ? 'active' : ''}`;
        }}
        to={to}
      >
        {({ isActive }) => {
          const currentPath = window.location.pathname;
          const basePath = to.replace(/\/$/, '');
          const isRouteActive = currentPath.startsWith(basePath);

          return (
            <button
              type="button"
              className={`btn btn-purple my-1 w-100 d-flex ${
                isRouteActive ? 'btn-purple-active' : ''
              }`}
            >
              <span className="me-3">{icon}</span>
              <span>{text}</span>
            </button>
          );
        }}
      </NavLink>
    </div>
  );
};

export default NavButton;

import { FaUser } from 'react-icons/fa';
import { IoMdSettings } from 'react-icons/io';
import { NavLink } from 'react-router-dom';
import NavButton from '../shared/NavButton';
import { getNavButtonsByRole } from './NavButtons';

const SideBar = () => {
  const userRole = localStorage.getItem('userRole'); // Or your auth logic
  const navButtons = getNavButtonsByRole(userRole);

  return (
    <div
      className="d-none d-lg-flex flex-column px-3 mt-2 border-3 border-end border-light"
      style={{ height: '82vh' }}
    >
      {navButtons.map((button) => (
        <NavButton key={button.to} text={button.text} icon={button.icon} to={button.to} />
      ))}
      <div className="mt-auto w-100">
        <div className="d-flex align-items-center gap-2 mb-3 w-100">
          <FaUser size={50} />
          <div className="w-100">
            <p className="mb-0">User Name</p>
            <small className="text-muted">{userRole}</small>
          </div>
          <NavLink to={`/${userRole}/profile`}>
            <IoMdSettings color="#5f6774" />
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default SideBar;

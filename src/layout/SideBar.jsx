import React from 'react';
import NavButton from '../components/shared/NavButton';
import { FaBookOpen, FaUser } from 'react-icons/fa';
import { MdAssignment, MdQuiz, MdReport } from 'react-icons/md';
import { BiSolidChat } from 'react-icons/bi';
import { IoMdSettings } from 'react-icons/io';
import { NavLink } from 'react-router-dom';

const SideBar = () => {
  return (
    <div
      className="d-none d-lg-flex flex-column px-3 mt-2 border-3 border-end border-light"
      style={{ height: '82vh' }}
    >
      <NavButton text={'My Courses'} icon={<FaBookOpen />} to={'/student/courses'} />
      <NavButton text={'Instructors'} icon={<FaUser />} to={'/student/instructors'} />
      <NavButton text={'Assignments'} icon={<MdAssignment />} to={'/student/assignments'} />
      <NavButton text={'Quizzes'} icon={<MdQuiz />} to={'/student/quizzes'} />
      <NavButton text={'Chat with'} icon={<BiSolidChat />} to={'/student/chat'} />
      <NavButton text={'Report'} icon={<MdReport />} to={'/student/report'} />
      <div className="mt-auto w-100">
        <div className="d-flex align-items-center gap-3 mb-3 w-100">
          <img src="https://via.placeholder.com/50" alt="Profile" className="rounded-circle" />
          <div className="w-100">
            <p className="mb-0">John </p>
            <small className="text-muted">Student</small>
          </div>
          <NavLink to="/student/profile">
            <IoMdSettings color="#5f6774" />
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default SideBar;

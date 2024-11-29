import React from 'react';
import NavButton from '../components/shared/NavButton';
import { FaBookOpen, FaUser } from 'react-icons/fa';
import { MdAssignment, MdQuiz, MdReport } from 'react-icons/md';
import { BiSolidChat } from 'react-icons/bi';

const SideBar = () => {
  return (
    <div
      className="d-flex flex-column px-2 mt-3 border-3 border-end border-light "
      style={{ width: '15%', height: '82vh' }}
    >
      <NavButton text={'My Courses'} icon={<FaBookOpen />} to={'/student/courses'} />
      <NavButton text={'Instructors'} icon={<FaUser />} to={'/student/instructors'} />
      <NavButton text={'Assignments'} icon={<MdAssignment />} to={'/student/assignments'} />
      <NavButton text={'Quizzes'} icon={<MdQuiz />} to={'/student/quizzes'} />
      <NavButton text={'Chat with'} icon={<BiSolidChat />} to={'/student/chat'} />
      <NavButton text={'Report'} icon={<MdReport />} to={'/student/report'} />
    </div>
  );
};

export default SideBar;

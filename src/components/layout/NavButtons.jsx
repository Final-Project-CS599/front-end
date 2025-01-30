// components/navigation/navButtons.js
import { FaBookOpen, FaUser, FaUsers, FaGraduationCap, FaChalkboardTeacher, FaBuilding } from 'react-icons/fa';
import {
  MdAssignment,
  MdQuiz,
  MdReport,
  MdDashboard,
  MdPayment,
  MdHelp,
  MdGrade,
} from 'react-icons/md';
import { BiSolidChat } from 'react-icons/bi';

export const adminNavButtons = [
  {
    text: 'Dashboard',
    icon: <MdDashboard />,
    to: '/admin/home',
  },
  {
    text: 'Department',
    icon: <FaBuilding />,
    to: '/admin/AddDepartment',
  },
  {
    text: 'Courses',
    icon: <FaGraduationCap />,
    to: '/admin/courses',
  },
  {
    text: 'Instructors',
    icon: <FaChalkboardTeacher />,
    to: '/admin/instructors',
  },
  {
    text: 'Students',
    icon: <FaUsers />,
    to: '/admin/student',
  },
  {
    text: 'Payments',
    icon: <MdPayment />,
    to: '/admin/payment',
  },
  {
    text: 'Help Desk',
    icon: <MdHelp />,
    to: '/admin/helpdesk',
  },
];

export const studentNavButtons = [
  {
    text: 'My Courses',
    icon: <FaBookOpen />,
    to: '/student/courses',
  },
  {
    text: 'Instructors',
    icon: <FaUser />,
    to: '/student/instructors',
  },
  {
    text: 'Assignments',
    icon: <MdAssignment />,
    to: '/student/assignments',
  },
  {
    text: 'Quizzes',
    icon: <MdQuiz />,
    to: '/student/quizzes',
  },
  {
    text: 'Chat with',
    icon: <BiSolidChat />,
    to: '/student/chat',
  },
  {
    text: 'Help Desk',
    icon: <MdReport />,
    to: '/student/helpDesk',
  },
];

export const instructorNavButtons = [
  {
    text: 'My Courses',
    icon: <FaBookOpen />,
    to: '/instructor/courses/mycourses',
  },
  {
    text: 'Students',
    icon: <FaUsers />,
    to: '/instructor/students',
  },
  {
    text: 'Assignments',
    icon: <MdAssignment />,
    to: '/instructor/assignments',
  },
  {
    text: 'Quizzes',
    icon: <MdQuiz />,
    to: '/instructor/quizzes',
  },
  {
    text: 'Grading',
    icon: <MdGrade />,
    to: '/instructor/grading',
  },
  {
    text: 'Chat',
    icon: <BiSolidChat />,
    to: '/instructor/chat',
  },
];

// Helper function to get nav buttons by role
export const getNavButtonsByRole = (role) => {
  switch (role) {
    case 'admin':
    case 'sAdmin':
      return adminNavButtons;
    case 'student':
      return studentNavButtons;
    case 'instructor':
      return instructorNavButtons;
    default:
      return [];
  }
};


export const getHomePath = (role) => {
    switch (role) {
      case 'admin':
      case 'sAdmin':
        return '/admin/home';
      case 'instructor':
        return '/instructor/courses/mycourses';
      case 'student':
      case 'user':
        return '/';
      default:
        return '/login';
    }
  };

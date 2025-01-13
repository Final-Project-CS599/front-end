import { createBrowserRouter } from 'react-router-dom';
import StudentCourses from '../pages/student/Courses';
import StudentInstructors from '../pages/student/Instructors';
import Assignments from '../pages/student/Assignments';
import Quizzes from '../pages/student/Quizzes';
import Chat from '../pages/student/Chat';
import Report from '../pages/student/Report';
import StudentHome from '../pages/Home';
import Messages from '../pages/student/Messages';
import StudentProfile from '../pages/student/Profile';
import InstructorById from '../pages/student/InstructorById';
import CourseById from '../pages/student/CourseById';
import AssignmentById from '../pages/student/AssignmentById';
import QuizById from '../pages/student/QuizById';
import Home from './../pages/admin/Home/Home';
import Student from './../pages/admin/Student/Student';
import Instructors from './../pages/admin/Instructors/Instructors';
import Profile from './../pages/admin/Profile/Profile';
import RegisterInstructors from './../pages/admin/RegisterInstructors/RegisterInstructors';
import RegisterStudents from './../pages/admin/RegisterStudent/RegisterStudent';
import AddAdmin from './../pages/admin/AddAdmin/AddAdmin';
import Login from './../pages/admin/Login/Login';
import ForgetPassword from './../pages/admin/ForgetPassword/ForgetPassword';
import NotFound from './../pages/admin/NotFound/NotFound';
import Courses from '../pages/admin/Courses/Courses.jsx';
import Acadmic from '../pages/admin/Acadmic/Acadmic.jsx';
import Extra from '../pages/admin/Extra/Extra.jsx';
import Payment from '../pages/admin/Payment/Payment.jsx';
import Asacadmic from '../pages/admin/Asacadmic/Asacadmic.jsx';
import Isacadmic from '../pages/admin/Isacadmic/Isacadmic.jsx';
import Msacadmic from '../pages/admin/Msacadmic/Msacadmic.jsx';
import Oracadmic from '../pages/admin/Oracadmic/Oracadmic.jsx';
import Csacadmic from '../pages/admin/Csacadmic/Csacadmic.jsx';
import Programingextra from '../pages/admin/Programingextra/Programingextra.jsx';
import Backendextra from '../pages/admin/Backendextra/Backendextra.jsx';
import Languagesextra from '../pages/admin/Languagesextra/Languagesextra.jsx';
import Digitalextra from '../pages/admin/Digitalextra/Digitalextra.jsx';
import Frontendextra from '../pages/admin/Frontendextra/Frontendextra.jsx';
import Addnewcourseacadmic from '../pages/admin/Addnewcourseacadmic/Addnewcourseacadmic.jsx';
import Addnewcourseextra from '../pages/admin/Addnewcourseextra/Addnewcourseextra.jsx';
import Helpdesk from '../pages/admin/Helpdesk/Helpdesk.jsx';
import AddDepartment from '../pages/admin/AddDepartment/AddDepartment.jsx';
import EditStudent from '../pages/admin/EditStudent/EditStudent.jsx';
import EditInstructor from '../pages/admin/EditInstructor/EditInstructor.jsx';
import LayoutWithSideBar from '../components/layout/LayoutWithSideBar.jsx';

export const studentRoutes = [
  // Student dashboard/home
  {
    index: true,
    element: <StudentHome />,
  },

  // Main student features
  {
    path: '/student/courses',
    element: <StudentCourses />,
  },
  {
    path: '/student/instructors',
    element: <StudentInstructors />,
  },
  {
    path: '/student/assignments',
    element: <Assignments />,
  },
  {
    path: '/student/quizzes',
    element: <Quizzes />,
  },

  // Communication features
  {
    path: '/student/chat',
    element: <Chat />,
  },
  {
    path: '/student/messages',
    element: <Messages />,
  },

  // Student resources
  {
    path: '/student/report',
    element: <Report />,
  },
  {
    path: '/student/profile',
    element: <StudentProfile />,
  },

  // Dynamic routes for detailed views
  {
    path: '/student/instructors/:id',
    element: <InstructorById />,
  },
  {
    path: '/student/courses/:id',
    element: <CourseById />,
  },
  {
    path: '/student/assignments/:id',
    element: <AssignmentById />,
  },
  {
    path: '/student/quizzes/:id',
    element: <QuizById />,
  },
];

export const router = createBrowserRouter([
  {
    path: '/',
    element: <LayoutWithSideBar />,
    children: [
      ...studentRoutes,
      { path: '/admin/home', element: <Home /> },
      { path: '/admin/courses', element: <Courses /> },
      { path: '/admin/acadmic', element: <Acadmic /> },
      { path: '/admin/asacadmic', element: <Asacadmic /> },
      { path: 'admin/isacadmic', element: <Isacadmic /> },
      { path: 'admin/msacadmic', element: <Msacadmic /> },
      { path: 'admin/oracadmic', element: <Oracadmic /> },
      { path: 'admin/csacadmic', element: <Csacadmic /> },
      { path: '/admin/extra', element: <Extra /> },
      { path: '/admin/programingextra', element: <Programingextra /> },
      { path: '/admin/languagesextra', element: <Languagesextra /> },
      { path: '/admin/backendextra', element: <Backendextra /> },
      { path: '/admin/frontendextra', element: <Frontendextra /> },
      { path: '/admin/digitalextra', element: <Digitalextra /> },
      { path: '/admin/addnewcourseextra', element: <Addnewcourseextra /> },
      { path: '/admin/addnewcourseacadmic', element: <Addnewcourseacadmic /> },
      { path: '/admin/instructors', element: <Instructors /> },
      { path: '/admin/student', element: <Student /> },
      { path: '/admin/profile', element: <Profile /> },
      { path: '/admin/registerInstructor', element: <RegisterInstructors /> },
      { path: '/admin/registerStudent', element: <RegisterStudents /> },
      { path: '/admin/addAdmin', element: <AddAdmin /> },
      { path: '/admin/Payment', element: <Payment /> },
      { path: '/admin/helpdesk', element: <Helpdesk /> },
      { path: '/admin/addDepartment', element: <AddDepartment /> },
      { path: '/admin/editStudent/:id', element: <EditStudent /> },
      { path: '/admin/editInstructor/:id', element: <EditInstructor /> },
      // login & forget password
      { path: '/login/:token', element: <Login /> },
      { path: '/login', element: <Login /> },
      { path: '/forgetPassword', element: <ForgetPassword /> },
      ,
    ],
  },
  { path: '*', element: <NotFound /> },
]);

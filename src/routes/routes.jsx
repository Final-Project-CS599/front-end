import { createBrowserRouter } from 'react-router-dom';
import StudentCourses from '../pages/student/courses/Courses.jsx';
import StudentInstructors from '../pages/student/Instructors';
import Assignments from '../pages/student/Assignments';
import Quizzes from '../pages/student/Quizzes';
import StudentChat from '../pages/student/Chat';
import Send from '../pages/student/helpDesk/Send.jsx';
import StudentHome from '../pages/Home';
import Messages from '../pages/student/Messages';
import StudentProfile from '../pages/student/Profile';
import InstructorById from '../pages/student/InstructorById';
import CourseById from '../pages/student/courses/CourseById';
import AssignmentById from '../pages/student/AssignmentById';
import QuizById from '../pages/student/QuizById';
import Home from './../pages/admin/Home/Home';
import Student from './../pages/admin/Student/Student';
import Instructors from './../pages/admin/Instructors/Instructors';
import Profile from './../pages/admin/AdminProfile/AdminProfile.jsx'
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
import EditStudent from '../pages/admin/SearchStudent/EditStudent.jsx';
import EditInstructor from '../pages/admin/SearchInstructors/EditInstructor.jsx';
import LayoutWithSideBar from '../components/layout/LayoutWithSideBar.jsx';
import ViewMessages from '../pages/student/helpdesk/ViewMessages.jsx';
import Assignments from '../pages/instructor/Assignment/Assignments';
import QuizzesInstructor from '../pages/instructor/Quizzes/Quizzes';
import Chat from '../pages/instructor/Chat/Chat';
import ProfilePage from '../pages/instructor/Profile/Profile';
import HelpdeskPage from '../pages/instructor/Report/Report'
import UploadCourse from '../components/shared/UploadCourse';
import QuizDetailsPage from '../pages/instructor/Quizzes/quizzDetails';
import AssignDetails from '../pages/instructor/Assignment/AssignDetails';
import MyCourses from '../pages/instructor/courses/mycourses';
import ViewQuizz from '../pages/instructor/Quizzes/viewquiz.jsx';
import ViewAssignment from '../pages/instructor/Assignment/AssignmenView.jsx';

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
    element: <StudentChat />,
  },
  {
    path: '/student/messages',
    element: <Messages />,
  },

  // Student resources
  {
    path: '/student/helpDesk/send',
    element: <Send />,
  },
  {
    path: '/student/helpDesk',
    element: <ViewMessages />,
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
      { path: '/instructor/courses', element: <MyCourses /> },
      { path: '/instructor/profile', element: <ProfilePage /> },
      { path: '/instructor/assignment', element: <Assignments /> },
      { path: '/instructor/quizzes', element: <QuizzesInstructor /> },
      { path: '/instructor/chat', element: <Chat /> },
      { path: '/instructor/report', element: <HelpdeskPage /> },
      { path: '/UploadCourse', element: <UploadCourse /> },
      { path: '/Quizzes-details', element: <QuizDetailsPage /> },
      { path: '/view-quiz', element: <ViewQuizz /> },
      { path: '/instructor/Assignment/Assign-details', element: <AssignDetails /> },
      { path: '/instructor/Assignment/view-assignment', element: <ViewAssignment/> },


      // login & forget password
      { path: '/login/:token', element: <Login /> },
      { path: '/login', element: <Login /> },
      { path: '/forgetPassword', element: <ForgetPassword /> },
    ],
  },
  { path: '*', element: <NotFound /> },
]);

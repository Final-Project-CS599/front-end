import { createBrowserRouter } from 'react-router-dom';

//auth
import Login from '../pages/admin/Auth/Login/Login.jsx';
// import ConfirmEmail from '../pages/admin/Auth/ConfirmEmail/ConfirmEmail.jsx';
import ForgetPassword from './../pages/admin/Auth/ForgetPassword/ForgetPassword.jsx';
import ForgetPasswordDetalis from './../pages/admin/Auth/ForgetPasswordDetalis/ForgetPasswordDetalis.jsx';
import ResetPassword from './../pages/admin/Auth/ResetPassword/ResetPassword.jsx';
//auth User
import AddAdmin from '../pages/admin/AuthUser/AddAdmin/AddAdmin.jsx';
import Student from '../pages/admin/AuthUser/Student/Student.jsx';
import Instructors from '../pages/admin/AuthUser/Instructors/Instructors.jsx';
import RegisterInstructors from '../pages/admin/AuthUser/RegisterInstructors/RegisterInstructors.jsx';
import RegisterStudents from '../pages/admin/AuthUser/RegisterStudent/RegisterStudent.jsx';
//home route
import HomeDashboard from '../pages/admin/HomeAndFooter/Home/Home.jsx';
import HelpDesk from './../pages/admin/HelpDesk/HelpDesk.jsx';
//Academic Router & Notfound
import AcademicRou from '../pages/admin/RouterAndNotFound/AcademicRou/AcademicRou.jsx';
import NotFound from '../pages/admin/RouterAndNotFound/NotFound/NotFound.jsx';
//student
import StudentCourses from '../pages/student/courses/Courses.jsx';
import StudentInstructors from '../pages/student/Instructors';
import StudentAssignments from '../pages/student/Assignments';
import StudentQuizzes from '../pages/student/Quizzes';
import StudentChat from '../pages/student/Chat';
import Send from '../pages/student/helpDesk/Send.jsx';
import StudentHome from '../pages/Home';
import Messages from '../pages/student/Messages';
import StudentProfile from '../pages/student/Profile';
import InstructorById from '../pages/student/InstructorById';
import CourseById from '../pages/student/courses/CourseById';
import AssignmentById from '../pages/student/AssignmentById';
import QuizById from '../pages/student/QuizById';
import Profile from './../pages/admin/AdminProfile/AdminProfile.jsx';
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
import AddDepartment from '../pages/admin/AddDepartment/AddDepartment.jsx';
import EditStudent from '../pages/admin/SearchStudent/EditStudent.jsx';
import EditInstructor from '../pages/admin/SearchInstructors/EditInstructor.jsx';
import LayoutWithSideBar from '../components/layout/LayoutWithSideBar.jsx';
import ViewMessages from '../pages/student/helpdesk/ViewMessages.jsx';
import Assignments from '../pages/instructor/Assignment/Assignments.jsx';
import Quizzes from '../pages/instructor/Quizzes/Quizzes';
import Chat from '../pages/instructor/Chat/Chat';
import ProfilePage from '../pages/instructor/Profile/Profile';
import HelpdeskPage from '../pages/instructor/Report/Report';
import UploadCourse from '../components/shared/UploadCourse';
import QuizDetailsPage from '../pages/instructor/Quizzes/quizzDetails';
import AssignDetails from '../pages/instructor/Assignment/AssignDetails';
import MyCourses from '../pages/instructor/courses/mycourses';

export const studentRoutes = [
  // Student dashboard/home
  { index: true, element: <StudentHome /> },
  // Main student features
  { path: '/student/courses', element: <StudentCourses /> },
  { path: '/student/instructors', element: <StudentInstructors /> },
  { path: '/student/assignments', element: <StudentAssignments /> },
  { path: '/student/quizzes', element: <StudentQuizzes /> },
  // Communication features
  { path: '/student/chat', element: <StudentChat /> },
  { path: '/student/messages', element: <Messages /> },
  // Student resources
  { path: '/student/helpDesk/send', element: <Send /> },
  { path: '/student/helpDesk', element: <ViewMessages /> },
  { path: '/student/profile', element: <StudentProfile /> },
  // Dynamic routes for detailed views
  { path: '/student/instructors/:id', element: <InstructorById /> },
  { path: '/student/courses/:id', element: <CourseById /> },
  { path: '/student/assignments/:id', element: <AssignmentById /> },
  { path: '/student/quizzes/:id', element: <QuizById /> },
];

export const adminRoutes = [
  //AcadmicRou //pages
  {
    index: true,
    element: (
      <AcademicRou>
        <HomeDashboard />
      </AcademicRou>
    ),
  },
  {
    path: '/admin/home',
    element: (
      <AcademicRou>
        {' '}
        <HomeDashboard />{' '}
      </AcademicRou>
    ),
  },
  //auth User
  {
    path: '/admin/addAdmin',
    element: (
      <AcademicRou>
        {' '}
        <AddAdmin />{' '}
      </AcademicRou>
    ),
  },
  {
    path: '/admin/instructors',
    element: (
      <AcademicRou>
        {' '}
        <Instructors />{' '}
      </AcademicRou>
    ),
  },
  {
    path: '/admin/student',
    element: (
      <AcademicRou>
        {' '}
        <Student />{' '}
      </AcademicRou>
    ),
  },
  {
    path: '/admin/registerInstructor',
    element: (
      <AcademicRou>
        {' '}
        <RegisterInstructors />{' '}
      </AcademicRou>
    ),
  },
  {
    path: '/admin/registerStudent',
    element: (
      <AcademicRou>
        {' '}
        <RegisterStudents />{' '}
      </AcademicRou>
    ),
  },
  //helpDesk
  {
    path: '/admin/helpDesk',
    element: (
      <AcademicRou>
        {' '}
        <HelpDesk />{' '}
      </AcademicRou>
    ),
  },
  {
    path: '/admin/profile',
    element: (
      <AcademicRou>
        <Profile />
      </AcademicRou>
    ),
  },
  // Courses
  {
    path: '/admin/courses',
    element: (
      <AcademicRou>
        {' '}
        <Courses />{' '}
      </AcademicRou>
    ),
  },
  {
    path: '/admin/acadmic',
    element: (
      <AcademicRou>
        {' '}
        <Acadmic />{' '}
      </AcademicRou>
    ),
  },
  {
    path: '/admin/asacadmic',
    element: (
      <AcademicRou>
        {' '}
        <Asacadmic />{' '}
      </AcademicRou>
    ),
  },
  {
    path: 'admin/isacadmic',
    element: (
      <AcademicRou>
        {' '}
        <Isacadmic />{' '}
      </AcademicRou>
    ),
  },
  {
    path: 'admin/msacadmic',
    element: (
      <AcademicRou>
        {' '}
        <Msacadmic />{' '}
      </AcademicRou>
    ),
  },
  {
    path: 'admin/oracadmic',
    element: (
      <AcademicRou>
        {' '}
        <Oracadmic />{' '}
      </AcademicRou>
    ),
  },
  {
    path: 'admin/csacadmic',
    element: (
      <AcademicRou>
        {' '}
        <Csacadmic />{' '}
      </AcademicRou>
    ),
  },
  {
    path: '/admin/extra',
    element: (
      <AcademicRou>
        {' '}
        <Extra />{' '}
      </AcademicRou>
    ),
  },
  {
    path: '/admin/programingextra',
    element: (
      <AcademicRou>
        {' '}
        <Programingextra />{' '}
      </AcademicRou>
    ),
  },
  {
    path: '/admin/languagesextra',
    element: (
      <AcademicRou>
        {' '}
        <Languagesextra />{' '}
      </AcademicRou>
    ),
  },
  {
    path: '/admin/backendextra',
    element: (
      <AcademicRou>
        {' '}
        <Backendextra />{' '}
      </AcademicRou>
    ),
  },
  {
    path: '/admin/frontendextra',
    element: (
      <AcademicRou>
        {' '}
        <Frontendextra />{' '}
      </AcademicRou>
    ),
  },
  {
    path: '/admin/digitalextra',
    element: (
      <AcademicRou>
        {' '}
        <Digitalextra />{' '}
      </AcademicRou>
    ),
  },
  {
    path: '/admin/addnewcourseextra',
    element: (
      <AcademicRou>
        {' '}
        <Addnewcourseextra />{' '}
      </AcademicRou>
    ),
  },
  {
    path: '/admin/addnewcourseacadmic',
    element: (
      <AcademicRou>
        {' '}
        <Addnewcourseacadmic />{' '}
      </AcademicRou>
    ),
  },
  //Payment
  {
    path: '/admin/Payment',
    element: (
      <AcademicRou>
        {' '}
        <Payment />{' '}
      </AcademicRou>
    ),
  },
  //Department
  {
    path: '/admin/addDepartment',
    element: (
      <AcademicRou>
        {' '}
        <AddDepartment />{' '}
      </AcademicRou>
    ),
  },
  {
    path: '/admin/editStudent/:id',
    element: (
      <AcademicRou>
        {' '}
        <EditStudent />{' '}
      </AcademicRou>
    ),
  },
  {
    path: '/admin/editInstructors/:id',
    element: (
      <AcademicRou>
        <EditInstructor />
      </AcademicRou>
    ),
  },
];

export const router = createBrowserRouter([
  {
    path: '/login',
    element: <Login />,
  },
  // {
  //   path: "/confirmEmail",
  //   element: <ConfirmEmail />,
  // },
  {
    path: '/forgetPassword',
    element: <ForgetPassword />,
  },
  {
    path: '/ForgetPasswordVerifyCode',
    element: <ForgetPasswordDetalis />,
  },
  {
    path: '/ResetPassword',
    element: <ResetPassword />,
  },
  {
    path: '/',
    element: <LayoutWithSideBar />,
    children: [
      ...studentRoutes,
      ...adminRoutes,

      //instructor
      { path: '/instructor/courses/mycourses', element: <MyCourses /> },
      { path: '/instructor/instructors', element: <ProfilePage /> },
      { path: '/instructor/Assignment/Assignment', element: <Assignments /> },
      { path: '/instructor/Quizzes/quizzes', element: <Quizzes /> },
      { path: '/instructor/chat', element: <Chat /> },
      { path: '/instructor/report', element: <HelpdeskPage /> },
      { path: '/UploadCourse', element: <UploadCourse /> },
      { path: '/instructor/Quizzes/Quizzes-details', element: <QuizDetailsPage /> },
      { path: '/instructor/Assignment/Assign-details', element: <AssignDetails /> },

      // //Auth login & forget password
      // { path: '/confirmEmail', element: <ConfirmEmail/> },
      //{ path: '/login' , element: <Login/>},
      // // {path: '/forgetPassword/:token', element: <ForgetPassword/>},
      // { path: '/forgetPassword' , element:<ForgetPassword/>},
      // { path: '/ForgetPasswordVerifyCode' , element:<ForgetPasswordDetalis/>},
      // { path: '/ResetPassword' , element:<ResetPassword/>},
    ],
  },

  //NotFound
  { path: '*', element: <NotFound /> },
]);

import { createBrowserRouter } from 'react-router-dom';

//auth
import ConfirmEmail from '../pages/admin/Auth/ConfirmEmail/ConfirmEmail.jsx';
import Login from '../pages/admin/Auth/Login/Login.jsx';
import ForgetPassword from './../pages/admin/Auth/ForgetPassword/ForgetPassword.jsx';
import ForgetPasswordDetalis from './../pages/admin/Auth/ForgetPasswordDetalis/ForgetPasswordDetalis.jsx';
import ResetPassword from './../pages/admin/Auth/ResetPassword/ResetPassword.jsx';
//auth User
import AddAdmin from '../pages/admin/AuthUser/AddAdmin/AddAdmin.jsx';
import Instructors from '../pages/admin/AuthUser/Instructors/Instructors.jsx';
import RegisterInstructors from '../pages/admin/AuthUser/RegisterInstructors/RegisterInstructors.jsx';
import RegisterStudents from '../pages/admin/AuthUser/RegisterStudent/RegisterStudent.jsx';
import Student from '../pages/admin/AuthUser/Student/Student.jsx';
//home route
import HelpDesk from '../pages/admin/Helpdesk/HelpDesk.jsx';
import HomeDashboard from '../pages/admin/HomeAndFooter/Home/Home.jsx';
//Academic Router & Notfound
import AcademicRou from '../pages/admin/RouterAndNotFound/AcademicRou/AcademicRou.jsx';
import NotFound from '../pages/admin/RouterAndNotFound/NotFound/NotFound.jsx';
//student
import LayoutWithSideBar from '../components/layout/LayoutWithSideBar.jsx';
import UploadCourse from '../pages/instructor/courses/UploadCourse.jsx';
import Acadmic from '../pages/admin/Acadmic/Acadmic.jsx';
import Extra from '../pages/admin/Extra/Extra.jsx';
import AllCourses from '../pages/admin/AllCourses/Allcourses.jsx';
import AllAcademic from '../pages/admin/AllAcademic/AllAcademic.jsx';
import DeleteCourse from '../pages/admin/DeleteCourse/DeleteCourse.jsx';
import Departments from '../pages/admin/Departments/Departments.jsx';
import Payment from '../pages/admin/Payment/Payment.jsx';
import PaymentContent from '../pages/admin/PaymentContent/PaymentContent.jsx';
import Addnewcourseacadmic from '../pages/admin/Addnewcourseacadmic/Addnewcourseacadmic.jsx';
import Addnewcourseextra from '../pages/admin/Addnewcourseextra/Addnewcourseextra.jsx';
import AddDepartment from '../pages/admin/AddDepartment/AddDepartment.jsx';
import EditStudent from '../pages/admin/SearchStudent/EditStudent.jsx';
import EditInstructor from '../pages/admin/SearchInstructors/EditInstructor.jsx';
import StudentHome from '../pages/student/Home.jsx';
import AssignDetails from '../pages/instructor/Assignment/AssignDetails';
import Assignments from '../pages/instructor/Assignment/Assignments.jsx';
import Chat from '../pages/instructor/Chat/Chat';
import MyCourses from '../pages/instructor/courses/mycourses';
import ProfilePage from '../pages/instructor/Profile/Profile';
import QuizDetailsPage from '../pages/instructor/Quizzes/quizzDetails';
import AdminProfile from '../pages/admin/AdminProfile/AdminProfile.jsx';
import StudentCourses from '../pages/admin/SearchStudent/StudentCourses.jsx';
import Quizzes from '../pages/instructor/Quizzes/Quizzes';
import HelpdeskPage from '../pages/instructor/Report/Report';
import AssignmentById from '../pages/student/AssignmentById';
import StudentAssignments from '../pages/student/Assignments';
import StudentChat from '../pages/student/Chat';
import CourseById from '../pages/student/courses/CourseById';
import Send from '../pages/student/helpDesk/Send.jsx';
import ViewMessages from '../pages/student/helpdesk/ViewMessages.jsx';
import InstructorById from '../pages/student/InstructorById';
import StudentInstructors from '../pages/student/Instructors';
import Messages from '../pages/student/Messages';
import StudentProfile from '../pages/student/Profile';
import QuizById from '../pages/student/QuizById';
import StudentQuizzes from '../pages/student/Quizzes';
import EditExam from '../pages/instructor/Quizzes/editQuizz.jsx';
import Courses from '../pages/admin/Courses/Courses.jsx';
import EditAssignment from '../pages/instructor/Assignment/EditAssignment.jsx';
import EditCourseMaterial from '../pages/instructor/courses/EditCourseMaterial.jsx';
import CoursesForStudent from '../pages/student/courses/Courses.jsx';

export const studentRoutes = [
  // Student dashboard/home
  { index: true, path: '/student/home', element: <StudentHome /> },
  // Main student features
  { path: '/student/courses', element: <CoursesForStudent /> },
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
    path: '/admin/extra',
    element: (
      <AcademicRou>
        {' '}
        <Extra />{' '}
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
  {
    path: '/admin/deletecourse',
    element: (
      <AcademicRou>
        {' '}
        <DeleteCourse />{' '}
      </AcademicRou>
    ),
  },
  {
    path: '/admin/departments',
    element: (
      <AcademicRou>
        {' '}
        <Departments />{' '}
      </AcademicRou>
    ),
  },
  {
    path: '/admin/allcourses',
    element: (
      <AcademicRou>
        {' '}
        <AllCourses />{' '}
      </AcademicRou>
    ),
  },
  { path: '/admin/allacademic', element: <AllAcademic /> },

  //Payment
  {
    path: '/admin/payment',
    element: (
      <AcademicRou>
        {' '}
        <Payment />{' '}
      </AcademicRou>
    ),
  },
  {
    path: '/admin/paymentcontent',
    element: (
      <AcademicRou>
        {' '}
        <PaymentContent />{' '}
      </AcademicRou>
    ),
  },

  //Department
  {
    path: '/admin/profile',
    element: (
      <AcademicRou>
        {' '}
        <AdminProfile />{' '}
      </AcademicRou>
    ),
  },
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
    path: '/admin/editInstructor/:id',
    element: (
      <AcademicRou>
        {' '}
        <EditInstructor />{' '}
      </AcademicRou>
    ),
  },
];

export const router = createBrowserRouter([
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/confirmEmail',
    element: <ConfirmEmail />,
  },
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
      { path: '/instructor/profile', element: <ProfilePage /> },
      { path: '/instructor/Assignment/Assignment', element: <Assignments /> },
      { path: '/instructor/Quizzes/quizzes', element: <Quizzes /> },
      { path: '/instructor/chat', element: <Chat /> },
      { path: '/instructor/report', element: <HelpdeskPage /> },
      { path: '/UploadCourse', element: <UploadCourse /> },
      { path: '/instructor/Quizzes/Quizzes-details', element: <QuizDetailsPage /> },
      { path: '/instructor/Quizzes/edit/:id', element: <EditExam /> },
      { path: '/instructor/courses/edit/:id', element: <EditCourseMaterial /> },
      { path: '/instructor/Assignment/Assign-details', element: <AssignDetails /> },
      { path: '/instructor/Assignment/edit/:id', element: <EditAssignment /> },
    ],
  },

  //NotFound
  { path: '*', element: <NotFound /> },
]);

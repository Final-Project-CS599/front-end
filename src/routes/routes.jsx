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
import AddDepartment from '../pages/admin/AddDepartment/AddDepartment.jsx';
import AdminProfile from '../pages/admin/AdminProfile/AdminProfile.jsx';
import Addnewcourseacadmic from '../pages/admin/CourseManagment/Addnewcourseacadmic/Addnewcourseacadmic.jsx';
import Addnewcourseextra from '../pages/admin/CourseManagment/Addnewcourseextra/Addnewcourseextra.jsx';
import AllAcademic from '../pages/admin/CourseManagment/AllAcademic/AllAcademic.jsx';
import AllCourses from '../pages/admin/CourseManagment/AllCourses/Allcourses.jsx';
import AllExtra from '../pages/admin/CourseManagment/AllExtra/Extra.jsx';
import Courses from '../pages/admin/CourseManagment/Courses/Courses.jsx';
import DeleteCourse from '../pages/admin/CourseManagment/DeleteCourse/DeleteCourse.jsx';
import Departments from '../pages/admin/Departments/Departments.jsx';
import Payment from '../pages/admin/Payment/Payment.jsx';
import PaymentContent from '../pages/admin/PaymentContent/PaymentContent.jsx';
import EditInstructor from '../pages/admin/SearchInstructors/EditInstructor.jsx';
import EditStudent from '../pages/admin/SearchStudent/EditStudent.jsx';
import AssignDetails from '../pages/instructor/Assignment/AssignDetails';
import Assignments from '../pages/instructor/Assignment/Assignments.jsx';
import EditAssignment from '../pages/instructor/Assignment/EditAssignment.jsx';
import Chat from '../pages/instructor/Chat/Chat';
import EditCourseMaterial from '../pages/instructor/courses/EditCourseMaterial.jsx';
import MyCourses from '../pages/instructor/courses/mycourses';
import UploadCourse from '../pages/instructor/courses/UploadCourse.jsx';
import ProfilePage from '../pages/instructor/Profile/Profile';
import EditExam from '../pages/instructor/Quizzes/editQuizz.jsx';
import QuizDetailsPage from '../pages/instructor/Quizzes/quizzDetails';
import Quizzes from '../pages/instructor/Quizzes/Quizzes';
import HelpdeskPage from '../pages/instructor/Report/Report';
import AssignmentById from '../pages/student/AssignmentById';
import StudentAssignments from '../pages/student/Assignments';
import StudentChat from '../pages/student/Chat';
import CourseById from '../pages/student/courses/CourseById';
import CoursesForStudent from '../pages/student/courses/Courses.jsx';
import Send from '../pages/student/helpDesk/Send.jsx';
import ViewMessages from '../pages/student/helpdesk/ViewMessages.jsx';
import StudentHome from '../pages/student/Home.jsx';
import InstructorById from '../pages/student/InstructorById';
import StudentInstructors from '../pages/student/Instructors';
import Messages from '../pages/student/Messages';
import StudentProfile from '../pages/student/Profile';
import QuizById from '../pages/student/QuizById';
import StudentQuizzes from '../pages/student/Quizzes';
import AddNewCourseAcademic from '../pages/admin/CourseManagment/Addnewcourseacadmic/Addnewcourseacadmic.jsx';
import AddNewCourseExtra from '../pages/admin/CourseManagment/Addnewcourseextra/Addnewcourseextra.jsx';
import UpdateExtraCourse from '../pages/admin/CourseManagment/Update/UpdateExtraCourse.jsx';
import UpdateAcademic from '../pages/admin/CourseManagment/Update/UpdateAcademicCourse.jsx';
import UpdateAcademicCourse from '../pages/admin/CourseManagment/Update/UpdateAcademicCourse.jsx';

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
        <HomeDashboard />
      </AcademicRou>
    ),
  },
  //auth User
  {
    path: '/admin/addAdmin',
    element: (
      <AcademicRou>
        <AddAdmin />
      </AcademicRou>
    ),
  },
  {
    path: '/admin/instructors',
    element: (
      <AcademicRou>
        <Instructors />
      </AcademicRou>
    ),
  },
  {
    path: '/admin/student',
    element: (
      <AcademicRou>
        <Student />
      </AcademicRou>
    ),
  },
  {
    path: '/admin/registerInstructor',
    element: (
      <AcademicRou>
        <RegisterInstructors />
      </AcademicRou>
    ),
  },
  {
    path: '/admin/registerStudent',
    element: (
      <AcademicRou>
        <RegisterStudents />
      </AcademicRou>
    ),
  },
  //helpDesk
  {
    path: '/admin/helpDesk',
    element: (
      <AcademicRou>
        <HelpDesk />
      </AcademicRou>
    ),
  },
  // Courses
  {
    path: '/admin/courses',
    element: (
      <AcademicRou>
        <Courses />
      </AcademicRou>
    ),
  },
  {
    path: '/admin/courses/academic',
    element: (
      <AcademicRou>
        <AllAcademic />
      </AcademicRou>
    ),
  },
  {
    path: '/admin/courses/extra',
    element: (
      <AcademicRou>
        <AllExtra />
      </AcademicRou>
    ),
  },
  {
    path: '/admin/addnewcourseextra',
    element: (
      <AcademicRou>
        <AddNewCourseExtra />
      </AcademicRou>
    ),
  },
  {
    path: '/admin/addnewcourseacadmic',
    element: (
      <AcademicRou>
        <AddNewCourseAcademic />
      </AcademicRou>
    ),
  },

  {
    path: '/admin/deletecourse',
    element: (
      <AcademicRou>
        <DeleteCourse />
      </AcademicRou>
    ),
  },
  {
    path: '/admin/departments',
    element: (
      <AcademicRou>
        <Departments />
      </AcademicRou>
    ),
  },
  {
    path: '/admin/courses/allcourses',
    element: (
      <AcademicRou>
        <AllCourses />
      </AcademicRou>
    ),
  },
  // { path: '/admin/courses/allacademic', element: <AllAcademic /> },
  {
    path: '/admin/courses/academic/update',
    element: <UpdateAcademicCourse />,
  },
  {
    path: '/admin/courses/extra/update',
    element: <UpdateExtraCourse />,
  },
  //Payment
  {
    path: '/admin/payment',
    element: (
      <AcademicRou>
        <Payment />
      </AcademicRou>
    ),
  },
  {
    path: '/admin/paymentcontent',
    element: (
      <AcademicRou>
        <PaymentContent />
      </AcademicRou>
    ),
  },

  //Department
  {
    path: '/admin/profile',
    element: (
      <AcademicRou>
        <AdminProfile />
      </AcademicRou>
    ),
  },
  {
    path: '/admin/addDepartment',
    element: (
      <AcademicRou>
        <AddDepartment />
      </AcademicRou>
    ),
  },
  {
    path: '/admin/editStudent/:id',
    element: (
      <AcademicRou>
        <EditStudent />
      </AcademicRou>
    ),
  },
  {
    path: '/admin/editInstructor/:id',
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

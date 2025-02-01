import { createBrowserRouter } from 'react-router-dom';
import Home from './../pages/admin/Home/Home';
import Student from './../pages/admin/Student/Student';
import Instructors from './../pages/admin/Instructors/Instructors';
import Profile from './../pages/admin/Profile/Profile';
import About from '../components/About/About.jsx';
import RegisterInstructors from './../pages/admin/RegisterInstructors/RegisterInstructors';
import RegisterStudents from './../pages/admin/RegisterStudent/RegisterStudent';
import AddAdmin from './../pages/admin/AddAdmin/AddAdmin';
import Login from './../pages/admin/Login/Login';
import ForgetPassword from './../pages/admin/ForgetPassword/ForgetPassword';
import NotFound from './../pages/admin/NotFound/NotFound';
import LayoutWithSideBar from './../components/layout/LayoutWithSideBar';
import Courses from '../pages/admin/Courses/Courses.jsx';
import Departments from '../pages/admin/Departments/Department.jsx';
import Sections from '../pages/admin/Sections/Sections.jsx';
import Acadmic from '../pages/admin/Acadmic/Acadmic.jsx';
import Extra from '../pages/admin/Extra/Extra.jsx';
import Payment from '../pages/admin/Payment/Payment.jsx';
import CoursePage from '../pages/admin/CoursePage/CoursePage.jsx';
import Addnewcourseacadmic from'../pages/admin/Addnewcourseacadmic/Addnewcourseacadmic.jsx';
import Addnewcourseextra from '../pages/admin/Addnewcourseextra/Addnewcourseextra.jsx';
import PaymentContent from '../pages/admin/PaymentContent/PaymentContent.jsx';
import AllCourses from '../pages/admin/AllCourses/Allcourses.jsx';
import AddNewCourse from '../pages/admin/AddNewCourse/AddNewCourse.jsx';
import Helpdesk from '../pages/admin/Helpdesk/Helpdesk.jsx';
import AddDepartment from "../pages/admin/AddDepartment/AddDepartment.jsx";
import EditStudent from "../pages/admin/EditStudent/EditStudent.jsx";
import EditInstructor from "../pages/admin/EditInstructor/EditInstructor.jsx";
import DeleteCourse from '../pages/admin/DeleteCourse/DeleteCourse.jsx';


export const router = createBrowserRouter([
  {
    path: '/', element: <LayoutWithSideBar />, children: [
      //pages
      {index: true, element: <Home/> },
      {path: '/admin/courses' , element: <Courses/>},
      {path:'/admin/departments', element: <Departments/>},
      {path:'/admin/sections', element: <Sections/>},
      {path: '/admin/acadmic' , element: <Acadmic/>},
      {path: '/admin/extra' , element: <Extra/>},
      {path: '/admin/addnewcourseextra', element:<Addnewcourseextra/>},
      {path:'/admin/addnewcourseacadmic', element: <Addnewcourseacadmic/>},
      {path:'/admin/coursepage', element: <CoursePage/>},
      {path:'/admin/paymentcontent', element: <PaymentContent/>},
      {path:'/admin/allcourses', element: <AllCourses/>},
      {path: '/admin/addnewcourse', element: <AddNewCourse/>},
      {path: '/admin/instructors' , element: <Instructors/>},
      {path: '/admin/student' , element: <Student/>},
      {path: '/admin/profile', element: <Profile /> },
      {path: '/admin/about', element: <About /> },
      {path: '/admin/registerInstructor' , element: <RegisterInstructors/>},
      {path: '/admin/registerStudent' , element: <RegisterStudents/>},
      {path: '/admin/addAdmin' , element: <AddAdmin/>},
      {path: '/admin/Payment' , element: <Payment/>},
      {path: '/admin/helpdesk' , element: <Helpdesk/>},
      {path: "/admin/addDepartment", element: <AddDepartment /> },
      {path: "/admin/editStudent/:id", element: <EditStudent /> },
      {path: "/admin/editInstructor/:id", element: <EditInstructor /> },
      {path: "/admin/deletecourse", element: <DeleteCourse /> },
      
      
      // login & forget password
      {path: '/login/:token', element: <Login/>},
      {path: '/login' , element: <Login/>},
      {path: '/forgetPassword' , element:<ForgetPassword/>},
      {path: '*' , element: <NotFound />},

      
//********************************************************************************************************************** */
      //AcadmicRou
      // {index: true , element:  <AcadmicRou><Home/></AcadmicRou>},
      // { path: 'instructors' , element: <AcadmicRou><Instructors/></AcadmicRou>},
      // { path: 'student' , element: <AcadmicRou><Student/></AcadmicRou>},
      // { path: 'profile', element: <AcadmicRou><Profile /></AcadmicRou> },
      // { path: 'about', element: <AcadmicRou><About /></AcadmicRou> },
      // { path: 'registerInstructor' , element: <AcadmicRou><RegisterInstructors/></AcadmicRou>},
      // { path: 'registerStudent' , element: <AcadmicRou><RegisterStudents/></AcadmicRou>},
    ],
  },
]);

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
import Courses from '../pages/admin/courses/Courses.jsx';
import Acadmic from '../pages/admin/Acadmic/Acadmic.jsx';
import CoursesExtra from '../pages/admin/CoursesExtra/CoursesExtra.jsx';
import Payment from '../pages/admin/Payment/Payment.jsx';
import Helpdesk from '../pages/admin/Helpdesk/Helpdesk.jsx';


export const router = createBrowserRouter([
  {
    path: '/', element: <LayoutWithSideBar />, children: [
      { index: true, element: <Home/> },
      { path: '/admin/courses' , element: <Courses/>},
      { path: '/admin/acadmic' , element: <Acadmic/>},
      { path: '/admin/coursesExtra' , element: <CoursesExtra/>},
      { path: '/admin/instructors' , element: <Instructors/>},
      { path: '/admin/student' , element: <Student/>},
      { path: '/admin/profile', element: <Profile /> },
      { path: '/admin/about', element: <About /> },
      { path: '/admin/registerInstructor' , element: <RegisterInstructors/>},
      { path: '/admin/registerStudent' , element: <RegisterStudents/>},
      { path: '/admin/addAdmin' , element: <AddAdmin/>},
      { path: '/admin/Payment' , element: <Payment/>},
      { path: '/admin/helpdesk' , element: <Helpdesk/>},

      { path: '/login' , element: <Login/>},
      { path: '/forgetPassword' , element:<ForgetPassword/>},
      { path: '*' , element: <NotFound />}



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

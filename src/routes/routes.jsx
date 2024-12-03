import { createBrowserRouter } from 'react-router-dom';
import LayoutWithSideBar from './../components/layout/LayoutWithSideBar';
import Home from '../components/pages/admin/Home/Home.jsx';
import About from '../components/pages/admin/About/About.jsx';
import Instructors from './../components/pages/admin/Instructors/Instructors';
import Student from './../components/pages/admin/Student/Student';
import Profile from './../components/pages/admin/Profile/Profile';
import Login from './../components/pages/admin/Login/Login';
import RegisterInstructors from '../components/pages/admin/RegisterInstructors/RegisterInstructors.jsx';
import RegisterStudents from '../components/pages/admin/RegisterStudent/RegisterStudent.jsx';
import ForgetPassword from './../components/pages/admin/ForgetPassword/ForgetPassword.jsx';
import NotFound from './../components/pages/admin/NotFound/NotFound';
import AcadmicRou from './../components/pages/admin/AcadmicRou/AcadmicRou';
import AddAdmin from './../components/pages/admin/AddAdmin/AddAdmin.jsx';

export const router = createBrowserRouter([
  {
    path: '/', element: <LayoutWithSideBar />, children: [
      { index: true, element: <Home/> },
      { path: '/instructors' , element: <Instructors/>},
      { path: '/student' , element: <Student/>},
      { path: '/profile', element: <Profile /> },
      { path: '/about', element: <About /> },
      { path: '/registerInstructor' , element: <RegisterInstructors/>},
      { path: '/registerStudent' , element: <RegisterStudents/>},
      { path: '/addAdmin' , element: <AddAdmin/>},

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

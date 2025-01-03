import { createBrowserRouter } from 'react-router-dom';
import LayoutWithSideBar from '../layout/LayoutWithSideBar';
import Courses from '../pages/student/Courses';
import Instructors from '../pages/student/Instructors';
import Assignments from '../pages/student/Assignments';
import Quizzes from '../pages/student/Quizzes';
import Chat from '../pages/student/Chat';
import Report from '../pages/student/Report';
import Home from '../pages/Home';
import About from '../pages/About';
import Messages from '../pages/student/Messages';
import Profile from '../pages/student/Profile';
import InstructorById from '../pages/student/InstructorById';
import CourseById from '../pages/student/CourseById';
import AssignmentById from '../pages/student/AssignmentById';
import QuizById from '../pages/student/QuizById';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <LayoutWithSideBar />,
    children: [
      { index: true, element: <Home /> },
      { path: '/student/courses', element: <Courses /> },
      { path: '/student/instructors', element: <Instructors /> },
      { path: '/student/assignments', element: <Assignments /> },
      { path: '/student/quizzes', element: <Quizzes /> },
      { path: '/student/chat', element: <Chat /> },
      { path: '/student/report', element: <Report /> },
      { path: '/student/messages', element: <Messages /> },
      { path: '/student/profile', element: <Profile /> },
      { path: '/student/instructors/:id', element: <InstructorById /> },
      { path: '/student/courses/:id', element: <CourseById /> },
      { path: '/student/assignments/:id', element: <AssignmentById /> },
      { path: '/student/quizzes/:id', element: <QuizById /> },
      { path: '/about', element: <About /> },
    ],
  },
]);

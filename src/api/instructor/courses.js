import { axiosInstance } from '../axiosCopy.js';
import { useQuery } from '@tanstack/react-query';

export const getCourses = async () => {
  const response = await axiosInstance.get('/courses/viewCoursesWithExtra');
  return response;
};

// export const useGetCourses = () => {
//   return useQuery({
//     queryFn: getCourses,
//   });
// };

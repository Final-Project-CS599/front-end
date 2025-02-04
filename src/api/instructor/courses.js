import { axiosInstance } from '../axiosCopy.js';
import { useQuery } from '@tanstack/react-query';

export const getCourses = async () => {
  const response = await axiosInstance.get('/courses/viewCoursesWithExtra');
  return response.data;
};

export const useGetCourses = () => {
  return useQuery({
    queryFn: getCourses,
  });
};

const getCourseById = async (course_id) => {
  const response = await axiosInstance.get(`/courses/viewCourse/${course_id}`);
  return response.data;
};

export const useGetCourseById = (id) => {
  return useQuery({
    queryFn: () => getCourseById(id),
  });
};
export const searchCourses = async (query) => {
  const response = await axiosInstance.get(`/courses/searchCourse?s=${query}`);
  return response.data;
};

export const useSearchCourses = (query) => {
  return useQuery({
    queryKey: ['searchCourses', query],
    queryFn: () => searchCourses(query),
    enabled: !!query, // Only fetch data if query is provided
    retry: 2,
  });
};

export const deleteCourseMaterial = async (c_id) => {
  const response = await axiosInstance.delete(`/courseMaterial/delete/${c_id}`);
  return response.data;
};

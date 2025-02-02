import { useMutation, useQuery } from '@tanstack/react-query';
import { axiosInstance } from '../axiosCopy';

const getStudentCourses = async (req, res) => {
  const response = await axiosInstance.get('/student/courses');
  console.log(response.data);
  return response.data;
};

export const useGetStudentCourses = () => {
  return useQuery({
    queryKey: 'courses',
    queryFn: getStudentCourses,
    retry: 2,
  });
};

const getCourseById = async (id) => {
  const response = await axiosInstance.get(`/student/courses/${id}`);
  return response.data;
};

export const useGetCourseById = (id) => {
  return useQuery({
    queryKey: ['course', id],
    queryFn: () => getCourseById(id),
    retry: 2,
  });
};

const enrollCourse = async (id) => {
  const response = await axiosInstance.post(`/student/courses/enroll`, { id });
  return response.data;
};

export const useEnrollCourse = () => {
  return useMutation({
    mutationFn: enrollCourse,
  });
};

const searchCourses = async (query) => {
  const response = await axiosInstance.get(`/student/courses/search?q=${query}`);
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

const getRecommendedCourses = async () => {
  const response = await axiosInstance.get('/student/courses/recommend');
  return response.data;
};

export const useGetRecommendedCourses = () => {
  return useQuery({
    queryKey: ['recommendedCourses'],
    queryFn: getRecommendedCourses,
    retry: 2,
  });
};

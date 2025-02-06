import { axiosInstance } from '../../axiosCopy';
import { useMutation, useQuery } from '@tanstack/react-query';

const getAllCourses = async () => {
  const response = await axiosInstance.get('/courses/getAllCourses');
  return response.data;
};

export const useGetAllCourses = () => {
  return useQuery({
    queryKey: 'allCourses',
    queryFn: getAllCourses,
  });
};

const addCourse = async (courseData) => {
  const response = await axiosInstance.post('/courses/addCourses', courseData);
  return response.data;
};

export const useAddCourse = () => {
  return useMutation({
    mutationFn: addCourse,
  });
};

const updateCourse = async (courseData) => {
  const response = await axiosInstance.patch('/courses/updateCourses', courseData);
  return response.data;
};

export const useUpdateCourse = () => {
  return useMutation({
    mutationFn: updateCourse,
  });
};

const deleteCourse = async (courseData) => {
  const response = await axiosInstance.delete('/courses/deleteCourse', {
    params: courseData,
  });
  return response.data;
};

export const useDeleteCourse = () => {
  return useMutation({
    mutationFn: deleteCourse,
  });
};

const getPayments = async () => {
  const response = await axiosInstance.get('/courses/getPayments');

  return response.data;
};

export const useGetPayments = () => {
  return useQuery({
    queryKey: 'payments',
    queryFn: getPayments,
  });
};

const approvePayment = async (student_id) => {
  const response = await axiosInstance.post('/courses/approvePayment', { student_id });
  return response.data;
};

export const useApprovePayment = () => {
  return useMutation({
    mutationFn: approvePayment,
  });
};

const rejectPayment = async (id) => {
  const response = await axiosInstance.delete(`/courses/cancelPayment/${id}`);
  return response.data;
};

export const useRejectPayment = () => {
  return useMutation({
    mutationFn: rejectPayment,
  });
};

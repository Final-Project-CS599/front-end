import { useMutation, useQuery } from '@tanstack/react-query';
import { axiosInstance } from '../../axiosCopy';

const getAllExtraCourses = async () => {
  const response = await axiosInstance.get('/courses/getAllCoursesExtra');
  return response.data;
};

export const useGetAllExtraCourses = () => {
  return useQuery({
    queryKey: 'allExtraCourses',
    queryFn: getAllExtraCourses,
  });
};

const addExtraCourse = async (courseData) => {
  const response = await axiosInstance.post('/courses/addExtra', courseData);
  return response.data;
};

export const useAddExtraCourse = () => {
  return useMutation({
    mutationFn: addExtraCourse,
  });
};

const updateExtraCourse = async (id, courseData) => {
  const response = await axiosInstance.patch(`/courses/updateExtra/${id}`, courseData);
  return response.data;
};

export const useUpdateExtraCourse = () => {
  return useMutation({
    mutationFn: updateExtraCourse,
  });
};

const getExtraCourseById = async (id) => {
  const response = await axiosInstance.get(`/courses/getExtraCourse/${id}`);
  return response.data;
};

export const useGetExtraCourseById = (id) => {
  return useQuery({
    queryKey: 'courseById',
    queryFn: () => getExtraCourseById(id),
  });
};

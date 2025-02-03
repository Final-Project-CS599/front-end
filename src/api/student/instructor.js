import { useQuery } from '@tanstack/react-query';
import { axiosInstance } from '../axiosCopy';

const getInstructors = async () => {
  const response = await axiosInstance.get('/student/instructor');
  return response.data;
};

export const useGetInstructors = () => {
  return useQuery({
    queryFn: getInstructors,
  });
};

const getInstructorById = async (id) => {
  const response = await axiosInstance.get(`/student/instructor/profile/${id}`);
  return response.data;
};

export const useGetInstructorById = (id) => {
  return useQuery({
    queryKey: ['instructor', id],
    queryFn: () => getInstructorById(id),
  });
};

import { useMutation, useQuery } from '@tanstack/react-query';
import { axiosInstance } from '../axiosCopy';

const updateProfile = async (profileData) => {
  const response = await axiosInstance.patch(`/instructorProfile/updateProfile`, profileData);
  return response.data;
};

export const useUpdateProfile = () => {
  return useMutation({
    mutationKey: ['updateProfile'],
    mutationFn: updateProfile,
  });
};

const getProfile = async (id) => {
  const response = await axiosInstance.get(`/instructorProfile/viewProfile`);
  return response.data;
};

export const useGetProfile = () => {
  return useQuery({
    queryKey: ['getProfile'],
    queryFn: getProfile,
  });
};

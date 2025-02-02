import { useMutation, useQuery } from '@tanstack/react-query';
import { axiosInstance } from '../axiosCopy';

const updateProfile = async (profileData) => {
  const response = await axiosInstance.patch(`/student/updateProfile`, {
    body: JSON.stringify(profileData),
  });

  return response.data;
};

export const useUpdateProfile = () => {
  return useMutation({
    mutationKey: ['updateProfile'],
    mutationFn: updateProfile,
  });
};

const getProfile = async () => {
  const response = await axiosInstance.get('/student/profile');
  return response.data;
};

export const useGetProfile = () => {
  return useQuery({
    queryKey: ['getProfile'],
    queryFn: getProfile,
  });
};

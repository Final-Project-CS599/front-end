import { useMutation } from '@tanstack/react-query';
import { axiosInstance } from '../axiosCopy';

const updateProfile = async (profileData, id) => {
  const response = await axiosInstance.put(`/instructor/${id}/updateProfile`, {
    body: JSON.stringify(profileData),
  });

  if (!response.ok) {
    throw new Error('Failed to update profile');
  }

  return response.json();
};

export const useUpdateProfile = () => {
  return useMutation({
    mutationKey: ['updateProfile'],
    mutationFn: updateProfile,
  });
};

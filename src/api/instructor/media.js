import { axiosInstance } from '../axiosCopy.js';
import { useMutation, useQuery } from '@tanstack/react-query';

const getMaterial = async () => {
  const response = await axiosInstance.get('/courseMaterial/view');
  return response.data;
};

export const useGetMaterial = () => {
  return useQuery({
    queryKey: ['viewMaterial'],
    queryFn: getMaterial,
  });
};

const addMaterial = async (body) => {
  const response = await axiosInstance.post('/courseMaterial/add', body);
  return response;
};

export const useAddMaterial = () => {
  return useMutation({
    mutationKey: ['addMaterial'],
    mutationFn: addMaterial,
  });
};

const deleteMaterial = async (m_id) => {
  const response = await axiosInstance.delete(`/courseMaterial/delete/${m_id}`);
  return response;
};

export const useDeleteMaterial = () => {
  return useMutation({
    mutationKey: ['deleteMaterial'],
    mutationFn: deleteMaterial,
  });
};

const editMaterial = async (body) => {
  const response = await axiosInstance.put(`/courseMaterial/edit/${body.materialId}`, body);
  return response;
};

export const useEditMaterial = () => {
  return useMutation({
    mutationKey: ['editMaterial'], //for caching later
    mutationFn: editMaterial, //alais queryFunction
  });
};

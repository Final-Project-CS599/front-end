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
    mutationKey: ['addMaterial'], //for caching later
    mutationFn: addMaterial, //alais queryFunction
  });
};

const deleteMaterial = async (m_id) => {
  const response = await axiosInstance.delete(`/courseMaterial/delete/${m_id}`); // استخدام params
  return response;
};

export const useDeleteMaterial = () => {
  return useMutation({
    mutationKey: ['deleteMaterial'], //for caching later
    mutationFn: deleteMaterial, //alais queryFunction
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

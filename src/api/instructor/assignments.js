import { axiosInstance } from '../axiosCopy.js';
import { useMutation, useQuery } from '@tanstack/react-query';

const getAssignment = async () => {
  const response = await axiosInstance.get('/assignment/view');
  return response.data;
};

export const useGetAssignment = () => {
  return useQuery({
    queryKey: ['viewAssignments'],
    queryFn: getAssignment,
  });
};

const addAssignment = async (body) => {
  const response = await axiosInstance.post('/assignment/add', body);
  return response;
};

export const useAddAssignment = () => {
  return useMutation({
    mutationKey: ['addAssignment'], //for caching later
    mutationFn: addAssignment, //alais queryFunction
  });
};

const deleteAssignment = async (assignmentId) => {
  const response = await axiosInstance.delete(`/assignment/delete/${assignmentId}`);
  return response;
};

export const useDeleteAssignment = () => {
  return useMutation({
    mutationKey: ['deleteAssignment'], //for caching later
    mutationFn: deleteAssignment, //alais queryFunction
  });
};

const editAssignment = async (body) => {
  const response = await axiosInstance.put(`/assignment/edit/${body.assignmentId}`, body);
  return response;
};

export const useEditAssignment = () => {
  return useMutation({
    mutationKey: ['editAssignment'], //for caching later
    mutationFn: editAssignment, //alais queryFunction
  });
};

const getAssignmentById = async (assinId) => {
  const response = await axiosInstance.get(`/assignment/view/${assinId}`);
  return response.data;
};

export const useGetAssignmentById = (assinId) => {
  return useQuery({
    queryKey: ['viewAssignmentById'], //for caching later
    queryFn: () => getAssignmentById(assinId), //alais queryFunction
  });
};

export const searchAssignment = async (s) => {
  const response = await axiosInstance.get(`/assignment/searchAssignment?assignment=${s}`);
  return response.data;
};

export const useSearchAssignment = (query) => {
  return useQuery({
    queryKey: ['searchAssignment', query],
    queryFn: () => searchAssignment(query),
    enabled: !!query,
    retry: 2,
  });
};

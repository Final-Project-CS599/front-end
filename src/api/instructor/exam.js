import { axiosInstance } from '../axiosCopy.js';
import { useMutation, useQuery } from '@tanstack/react-query';

const getExam = async () => {
  const response = await axiosInstance.get('/exam/view');
  return response.data;
};

export const useGetExam = () => {
  return useQuery({
    queryKey: ['viewExams'], //for caching later
    queryFn: getExam, //alais queryFunction
  });
};

const addExam = async (body) => {
  const response = await axiosInstance.post('/exam/add', body);
  return response;
};

export const useAddExam = () => {
  return useMutation({
    mutationKey: ['addExam'], //for caching later
    mutationFn: addExam, //alais queryFunction
  });
};

const deleteExam = async (examId) => {
  const response = await axiosInstance.delete(`/exam/delete/${examId}`);
  return response;
};

export const useDeleteExam = () => {
  return useMutation({
    mutationKey: ['deleteExam'], //for caching later
    mutationFn: deleteExam, //alais queryFunction
  });
};

const editExam = async (body) => {
  const response = await axiosInstance.patch(`/exam/edit/${body.examId}`, body);
  return response;
};

export const useEditExam = () => {
  return useMutation({
    mutationKey: ['editExam'], //for caching later
    mutationFn: editExam, //alais queryFunction
  });
};

const getExamById = async (examId) => {
  const response = await axiosInstance.get(`/exam/view/${examId}`);
  return response.data;
};

export const useGetExamById = (examId) => {
  return useQuery({
    queryKey: ['viewExamById'], //for caching later
    queryFn: () => getExamById(examId), //alais queryFunction
  });
};

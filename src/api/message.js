import { useMutation, useQuery } from '@tanstack/react-query';
import { axiosInstance } from './axiosCopy';

const getStudentMessages = async () => {
  const response = await axiosInstance.get('/message/viewMsgStu');
  return response;
};

export const useGetStudentMessages = () => {
  return useQuery({
    queryKey: 'studentMessages',
    queryFn: getStudentMessages,
  });
};

const getInstructorMessages = async () => {
  const response = await axiosInstance.get('/message/viewMsgInst');
  return response.data;
};

export const useGetInstructorMessages = () => {
  return useQuery({
    queryKey: 'instructorMessages',
    queryFn: getInstructorMessages,
  });
};

const sendMessage = async (m_message, role, reciever) => {
  const response = await axiosInstance.post('/message/send', m_message, role, reciever);
  return response;
};

export const useSendMessage = () => {
  return useMutation({
    mutationKey: 'sendMessage',
    mutationFn: sendMessage,
  });
};

const searchByName = async (role, name) => {
  const response = await axiosInstance.post(`/message/search`, role, name);
  return response.data;
};

export const useSearchByName = () => {
  return useMutation({
    mutationKey: 'searchByName',
    mutationFn: searchByName,
  });
};

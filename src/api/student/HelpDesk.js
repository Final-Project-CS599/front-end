import { axiosInstance } from '../axiosCopy';
import { useMutation, useQuery } from '@tanstack/react-query';
const getMessages = async () => {
  const response = await axiosInstance.get(`/student/help-desk/messages`);
  return response.data;
};

const sendMessage = async (messageData) => {
  const response = await axiosInstance.post(`/student/help-desk/messages`, messageData);
  return response.data;
};

export const useGetHelpDeskMessages = () => {
  return useQuery({
    queryKey: ['help-desk-messages'],
    queryFn: getMessages,
  });
};

export const useSendHelpDeskMessage = () => {
  return useMutation({
    mutationKey: ['send-help-desk-message'],
    mutationFn: sendMessage,
  });
};

import { axiosInstance } from '../axiosCopy';
import { useMutation, useQuery } from '@tanstack/react-query';
const getMessagesForInstructor = async () => {
  const response = await axiosInstance.get(`/help/viewHelp`);
  return response.data;
};

const sendMessageForInstructor = async (messageData) => {
  const response = await axiosInstance.post(`/help/send`, messageData);
  return response.data;
};

export const useGetHelpDeskMessagesForInstructor = () => {
  return useQuery({
    queryKey: ['help-desk-messages'],
    queryFn: getMessagesForInstructor,
  });
};

export const useSendHelpDeskMessageForInstructor = () => {
  return useMutation({
    mutationKey: ['send-help-desk-message'],
    mutationFn: sendMessageForInstructor,
  });
};

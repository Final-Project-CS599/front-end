import { useMutation, useQuery } from '@tanstack/react-query';
import { axiosInstance } from '../axiosCopy';

export const getExams = async (course_id) => {
  const response = await axiosInstance.get(`/student/exam/view/${course_id}`);
  return response.data;
};

export const useGetExams = (course_id) => {
  return useQuery({
    queryKey: ['exams', course_id],
    queryFn: () => getExams(course_id),
    enabled: !!course_id,
    retry: 2,
  });
};

const submitExam = async (data) => {
  const response = await axiosInstance.post('/student/submitexam', data);
  return response.data;
};

export const useSubmitExam = () => {
  return useMutation({
    mutationFn: submitExam,
  });
};

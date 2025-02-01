import { useQuery } from '@tanstack/react-query';
import { axiosInstance } from '../axiosCopy'; // Adjust the import path as needed

export const getExams = async (course_id) => {
  const response = await axiosInstance.get(`/student/exam/view/${course_id}`);
  return response.data;
};

export const useGetExams = (course_id) => {
  return useQuery({
    queryKey: ['exams', course_id],
    queryFn: () => getExams(course_id),
    enabled: !!course_id, // Only fetch data if course_id is provided
    retry: 2,
  });
};

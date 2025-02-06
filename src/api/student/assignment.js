import { useQuery } from '@tanstack/react-query';
import { axiosInstance } from '../axiosCopy'; // Adjust the import path as needed

export const getAssignments = async (course_id) => {
  const response = await axiosInstance.get(`/student/assignment/view/${course_id}`);
  return response.data;
};

export const useGetAssignments = (course_id) => {
  return useQuery({
    queryKey: ['assignments', course_id],
    queryFn: () => getAssignments(course_id),
    enabled: !!course_id, // Only fetch data if course_id is provided
    retry: 2,
  });
};

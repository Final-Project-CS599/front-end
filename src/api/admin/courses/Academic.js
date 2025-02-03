import { useQuery } from '@tanstack/react-query';
import { axiosInstance } from '../../axiosCopy';

const getAllAcademicCourses = async (req, res) => {
  const response = await axiosInstance.get('/courses/getAllCoursesAcademic');
  return response.data;
};

export const useGetAllAcademicCourses = () => {
  return useQuery({
    queryKey: 'allAcademicCourses',
    queryFn: getAllAcademicCourses,
  });
};

const addAcademicCourse = async (courseData) => {
  const response = await axiosInstance.post('/courses/addAcademic', courseData);
  return response.data;
};

export const useAddAcademicCourse = () => {
  return useMutation({
    mutationFn: addAcademicCourse,
  });
};

const updateAcademic = async (courseData) => {
  const response = await axiosInstance.patch('/courses/updateAcademic', courseData);
  return response.data;
};

export const useUpdateAcademic = () => {
  return useMutation({
    mutationFn: updateAcademic,
  });
};

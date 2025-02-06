import { useMutation, useQuery } from '@tanstack/react-query';
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

const updateAcademic = async ({ id, courseData }) => {
  const response = await axiosInstance.patch(`/courses/updateAcademic/${id}`, courseData);
  return response.data;
};

export const useUpdateAcademic = () => {
  return useMutation({
    mutationFn: updateAcademic,
  });
};

const getAcademicCourseById = async (id) => {
  const response = await axiosInstance.get(`/courses/getAcademicCourse/${id}`);
  return response.data;
};

export const useGetAcademicCourseById = (id) => {
  return useQuery({
    queryKey: 'courseById',
    queryFn: () => getAcademicCourseById(id),
  });
};

const getAllCourses = async () => {
  const response = await axiosInstance.get('/courses/getAllCourses');
  return response.data;
};

export const useGetAllCourses = () => {
  return useQuery({
    queryKey: 'allCourses',
    queryFn: getAllCourses,
  });
};

const addCourse = async (courseData) => {
  const response = await axiosInstance.post('/courses/addCourses', courseData);
  return response.data;
};

export const useAddCourse = () => {
  return useMutation({
    mutationFn: addCourse,
  });
};

const updateCourse = async (courseData) => {
  const response = await axiosInstance.patch('/courses/updateCourses', courseData);
  return response.data;
};

export const useUpdateCourse = () => {
  return useMutation({
    mutationFn: updateCourse,
  });
};

const deleteCourse = async (courseData) => {
  const response = await axiosInstance.delete('/courses/deleteCourse', courseData);
  return response.data;
};

export const useDeleteCourse = () => {
  return useMutation({
    mutationFn: deleteCourse,
  });
};

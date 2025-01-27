import { axiosInstance } from "../axiosCopy"

export const getAssignmets = async (course_id) => {
    const response = await axiosInstance.get('/student/assignment', course_id)
    return response.data
}
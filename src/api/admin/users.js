import { useMutation, useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../axiosCopy"

const searchStudents = async (params) => {
    console.log("Sending search params:", params);

    // Filter out empty values
    const filteredParams = Object.fromEntries(
        Object.entries(params).filter(([_, value]) => value !== '')
    );

    const { data } = await axiosInstance.get('/editStudents', {
        params: filteredParams
    });
    return data;
};

export const useSearchStudents = () => {
    return useMutation({
        mutationKey: ['search-result'],
        mutationFn: searchStudents
    });
};


const getStudentById = async (id) => {
    const response = await axiosInstance.get(`/editStudents/${id}`)
    return response.data.data
}

export const useGetStudentById = (id) => {
    return useQuery({
        queryKey: ['student-data'],
        queryFn: () => getStudentById(id)
    })
}

const editStudent = async (id, body) => {
    const response = await axiosInstance.patch(`/editStudents/${id}`, body)
    return response.data
}

export const useEditStudent = () => {
    return useMutation({
        mutationKey: ['edit-student'],
        mutationFn: (id, body)=> editStudent(id, body)
    })
}

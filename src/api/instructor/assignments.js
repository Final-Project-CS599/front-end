import { axiosInstance } from "../axiosCopy.js"
import { useQuery } from "@tanstack/react-query"

const getAssignment = async()=>{
    const response = await axiosInstance.get('/assignment/view')
    return response;
}

export const useGetAssignment = ()=>{
    return useQuery({
        queryKey:['viewAssignments'], 
        queryFn: getAssignment
    })
}

const addAssignment = async()=>{
    const response = await axiosInstance.post('/assignment/add')
    return response;
}

export const useAddAssignment = ()=>{
    return useQuery({
        queryKey:['addAssignment'], //for caching later
        queryFn: addAssignment //alais queryFunction
    })
}

const deleteAssignment = async(assignmentId)=>{
    const response = await axiosInstance.delete(`/assignment/delete/${assignmentId}`);
    return response;
}

export const useDeleteCourses = ()=>{
    return useQuery({
        queryKey:['deleteAssignment'], //for caching later
        queryFn: deleteAssignment //alais queryFunction
    })
}


const editAssignment = async(assignmentId)=>{
    const response = await axiosInstance.put(`/assignment/edit/${assignmentId}`);
    return response;
}

export const useEditCourses = ()=>{
    return useQuery({
        queryKey:['editAssignment'], //for caching later
        queryFn: editAssignment //alais queryFunction
    })
}
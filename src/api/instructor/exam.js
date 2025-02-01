import { axiosInstance } from "../axiosCopy.js"
import { useQuery } from "@tanstack/react-query"

const getExam = async()=>{
    const response = await axiosInstance.get('/exam/view')
    return response;
}

export const useGetExam = ()=>{
    return useQuery({
        queryKey:['viewExams'], //for caching later
        queryFn: getExam //alais queryFunction
    })
}

const addExam = async()=>{
    const response = await axiosInstance.get('/exam/add')
    return response;
}

export const useAddExam = ()=>{
    return useQuery({
        queryKey:['addExam'], //for caching later
        queryFn: addExam //alais queryFunction
    })
}

const deleteExam = async(examId)=>{
    const response = await axiosInstance.get(`/exam/delete/${examId}`);
    return response;
}

export const useDeleteCourses = ()=>{
    return useQuery({
        queryKey:['deleteExam'], //for caching later
        queryFn: deleteExam //alais queryFunction
    })
}


const editExam = async(examId)=>{
    const response = await axiosInstance.get(`/exam/edit/${examId}`);
    return response;
}

export const useEditCourses = ()=>{
    return useQuery({
        queryKey:['editExam'], //for caching later
        queryFn: editExam //alais queryFunction
    })
}
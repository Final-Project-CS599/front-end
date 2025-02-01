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

const editStudent = async ({ id, updateBody }) => {
    const response = await axiosInstance.patch(`/editStudents/${id}`, updateBody)
    return response.data
}

export const useEditStudent = () => {
    return useMutation({
        mutationKey: ['edit-student'],
        mutationFn: editStudent 
    })
}

const getStudentAcademicCourses = async (id) => {
    const response = await axiosInstance.get(`/editStudents/${id}/academicCourses`) // Updated route to match backend
    return response.data.data
}

export const useGetStudentAcademicCourses = (id) => {
    return useQuery({
        queryKey: ['student-academic-courses', id],
        queryFn: () => getStudentAcademicCourses(id),
        enabled: !!id
    })
}

const getStudentExtraCourses = async (id) => {
    const response = await axiosInstance.get(`/editStudents/${id}/extraCourses`) // Updated route to match backend
    return response.data.data
}

export const useGetStudentExtraCourses = (id) => {
    return useQuery({
        queryKey: ['student-extra-courses', id],
        queryFn: () => getStudentExtraCourses(id),
        enabled: !!id
    })
}



const searchInstructors = async (params) => {
    console.log("Sending search params:", params);

    // Filter out empty values
    const filteredParams = Object.fromEntries(
        Object.entries(params).filter(([_, value]) => value !== '')
    );

    const { data } = await axiosInstance.get('/editInstructors', {
        params: filteredParams
    });
    return data;
};

export const useSearchInstructors = () => {
    return useMutation({
        mutationKey: ['search-result'],
        mutationFn: searchInstructors
    });
};


const getInstructorById = async (id) => {
    const response = await axiosInstance.get(`/editInstructors/${id}`)
    return response.data.data
}

export const useGetInstructorById = (id) => {
    return useQuery({
        queryKey: ['Instructor-data'],
        queryFn: () => getInstructorById(id)
    })
}

const editInstructor = async ({ id, updateBody }) => {
    const response = await axiosInstance.patch(`/editInstructors/${id}`, updateBody)
    return response.data
}

export const useEditInstructor = () => {
    return useMutation({
        mutationKey: ['edit-Instructor'],
        mutationFn: editInstructor 
    })
}

const getInstructorAcademicCourses = async (id) => {
    const response = await axiosInstance.get(`/editInstructors/${id}/academicCourses`) // Updated route to match backend
    return response.data.data
}


export const useGetInstructorAcademicCourses = (id) => {
    return useQuery({
        queryKey: ['Instructor-academic-courses', id],
        queryFn: () => getInstructorAcademicCourses(id),
        enabled: !!id
    })
}


const getInstructorExtraCourses = async (id) => {
    const response = await axiosInstance.get(`/editInstructors/${id}/extraCourses`) 
    return response.data.data
}


export const useGetInstructorExtraCourses = (id) => {
    return useQuery({
        queryKey: ['Instructor-extra-courses', id],
        queryFn: () => getInstructorExtraCourses(id),
        enabled: !!id
    })
}
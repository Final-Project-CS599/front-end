import { useMutation, useQuery } from "@tanstack/react-query"
import { axiosInstance } from "../axiosCopy"

const getDpartmentsData = async () => {
    const response = await axiosInstance.get('/departments')
    return response.data
}


export const addDepartment = async (body) => {
    const response = await axiosInstance.post('/departments', body)
    return response.data
}


export const useGetDepartmentsData = () => {
    return useQuery({
        queryKey: ['departments'],
        queryFn: getDpartmentsData
    })
}

export const useAddDepartment = () => {
    return useMutation({
        mutationKey: ['add-department'],
        mutationFn: addDepartment
    })
}
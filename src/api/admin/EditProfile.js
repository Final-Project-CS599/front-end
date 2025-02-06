import { useMutation, useQuery } from "@tanstack/react-query"
import { axiosInstance } from "../axiosCopy"

const getAdminData = async () => {
    const response = await axiosInstance.get('/adminProfile')
    return response.data
}


const editAdminData = async (data) => {
    const response = axiosInstance.patch('/adminProfile', data)
    return response
}


export const useGetAdminData = () => {
    return useQuery({
        queryKey: ['profile'],
        queryFn: getAdminData
    })
}


export const useEditAdminData = () => {
    return useMutation({
        mutationKey: ['edit-profile'],
        mutationFn: editAdminData
    })
}
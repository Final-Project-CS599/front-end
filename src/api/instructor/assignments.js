import { useQuery } from "@tanstack/react-query"
import { axiosInstance } from "../axiosCopy.js"

const getAssignments = async()=>{
    const response = axiosInstance.get('/assignment/view')
    return response
}


export const useGetAssignments = ()=>{
    return useQuery({
        queryKey:['Assignments'],
        queryFn: getAssignments
    })
}
import { axiosInstance } from "../axiosCopy.js"
import { useQuery } from "@tanstack/react-query"


const getCourses = async()=>{
    const response = await axiosInstance.get('/courses/viewCourse')
    return response;
}


export const useGetCourses = ()=>{
    return useQuery({
        queryKey:['viewCourses'], //for caching later
        queryFn: getCourses //alais queryFunction
    })
}
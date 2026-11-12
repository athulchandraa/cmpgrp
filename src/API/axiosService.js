import axiosInstance from "./axiosInstance"

const axiosService=async(httpMethod,url,reqBody)=>{
    try{
        const response=axiosInstance({
            method:httpMethod,
            url,
            data:reqBody
        })
        return response
    }catch(err){
        throw(err)
    }
}

export default axiosService
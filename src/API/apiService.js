import axiosService from "./axiosService"

//Registration API
export const registerAPI=async(data)=>{
    return await axiosService('POST','/user-reg',data)
}

//Login API
export const loginAPI=async(data)=>{
    return await axiosService('POST','/user-login',data)
}

export const submitComplaint=async(data)=>{
    return await axiosService('POST','/submit-grievance',data)
}

export const analyzeGrievanceAPI = async (description) => {
  return await axiosService("POST", "/analyze-grievance", {description})
}
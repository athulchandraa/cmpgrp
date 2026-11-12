import axios from "axios";

const axiosInstance=axios.create({
    baseURL:"https://cmpgrp-backend.onrender.com",
    timeout:60000
})

export default axiosInstance
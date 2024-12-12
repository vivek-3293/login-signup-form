import axios from "axios";

// Api Base Url
const BASE_URL = process.env.REACT_APP_API_BASE_URL;


const apiClient = axios.create({
baseURL: BASE_URL,
headers: {
    "Content-Type": "Application/json",
},
});

// Post Method Api
export const post = async (url, data) => {
    try{
        const response= await apiClient.post(url, data);
        return response.data;
    }catch (error){
       return error.response?.data || { message: "Something Went Wrong!" };
    }
};
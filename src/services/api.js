import axios from "axios";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

axios.defaults.withCredentials = true;

// const BASE_URL = process.env.REACT_APP_API_BASE_URL;

// const axiosInstance = axios.create({
//   baseURL: BASE_URL,
// });

// axiosInstance.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     const navigate = useNavigate();
//     const { handleLogout } = useContext(AuthContext);

//     if ((error.response.data.code = "access_denied")) {
//       handleLogout();
//       navigate("/");
//     }
//     console.log('if', error.response.data.code)
//     return Promise.reject(error);
//   }
// );

// Post Method Api
export const post = async (url, data) => {
  try {
    const response = await axios.post(url, data);
    
    return response.data;
  } catch (error) {
    return error.response?.data || { message: "Something Went Wrong!" };
  }
};

// Get Method Api
export const get = async (url) => {
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    return error.response?.data || { message: "Something went wrong!" };
  }
};

// Put Method Api
export const put = async (url, data) => {
  try {
    const response = await axios.put(url, data);
    return response.data;
  } catch (error) {
    return error.response?.data || { message: "Something went wrong!" };
  }
};

// Put Method Api
export const patch = async (url, data) => {
  try {
    const response = await axios.patch(url, data);
    return response.data;
  } catch (error) {
    return error.response?.data || { message: "Something went wrong!" };
  }
};

// Delete Method Api
export const del = async (url) => {
  try {
    const response = await axios.delete(url);

    return response.data;
  } catch (error) {
    return error.response?.data || { message: "Something went wrong!" };
  }
};

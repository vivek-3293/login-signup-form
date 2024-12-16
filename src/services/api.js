import axios from "axios";
import Cookies from "js-cookie";

// Post Method Api

export const post = async (url, data, requiresAuth = false) => {
  try {
    const token = Cookies.get("token");

    const headers = {};
    if (requiresAuth && token) {
      headers.Authorization = `Bearer ${token}`;
    }

    const response = await axios.post(url, data, { headers });
    console.log(response);
    
    return response.data;
  } catch (error) {
    return error.response?.data || { message: "Something Went Wrong!" };
  }
};

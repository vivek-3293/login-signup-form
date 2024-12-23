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
    
    return response.data;
  } catch (error) {
    return error.response?.data || { message: "Something Went Wrong!" };
  }
};

// Get Method Api
export const get = async (url, requiresAuth = false) => {
  try {
    const token = Cookies.get("token");
    const headers = {};
    if (requiresAuth && token) {
      headers.Authorization = `Bearer ${token}`;
    }
    const response = await axios.get(url, { headers });
    return response.data;
  } catch (error) {
    return error.response?.data || { message: "Something went wrong!" };
  }
};

// Put Method Api
export const put = async (url, data, requiresAuth = false) => {
  try {
    const token = Cookies.get("token");
    const headers = {};
    if (requiresAuth && token) {
      headers.Authorization = `Bearer ${token}`;
    }
    const response = await axios.put(url, data, { headers });
    return response.data;
  } catch (error) {
    return error.response?.data || { message: "Something went wrong!" };
  }
};


// Delete Method Api
export const del = async (url, requiresAuth = false) => {
  try {
    
    const token = Cookies.get("token");
    const headers = {};
    if (requiresAuth && token) {
      headers.Authorization = `Bearer ${token}`;
    }

    const response = await axios.delete(url, { headers });
    
    return response.data;
  } catch (error) {
    return error.response?.data || { message: "Something went wrong!" };
  }
};
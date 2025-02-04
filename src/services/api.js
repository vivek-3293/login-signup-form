import axios from "axios";
import Cookies from "js-cookie";
import { toast } from "react-toastify";

axios.defaults.withCredentials = true;



const apiCall = async (method, url, data = null) => {
  try {
    const response = await axios({ method, url, data });
    return response.data;
  } catch (error) {
    return error.response?.data || { message: "Something went wrong!" };
  }
};

// Api Method All
export const post = (url, data) => apiCall("post", url, data);
export const get = (url) => apiCall("get", url);
export const put = (url, data) => apiCall("put", url, data);
export const patch = (url, data) => apiCall("patch", url, data);
export const del = (url) => apiCall("delete", url);

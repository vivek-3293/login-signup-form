import axios from "axios";

axios.defaults.withCredentials = true;


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

// Delete Method Api
export const del = async (url) => {
  try {
    const response = await axios.delete(url);

    return response.data;
  } catch (error) {
    return error.response?.data || { message: "Something went wrong!" };
  }
};

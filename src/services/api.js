import axios from "axios";
import Cookies from "js-cookie";

// Post Method Api
export const post = async (url, data) => {
  try {
    const token = Cookies.get("token");
    // console.log(token);

    const headers = {
      Authorization: token ? `Bearer ${token}` : undefined,
    };
    console.log("headers token", headers);

    const response = await axios.post(url, data, { headers });
    return response.data;
  } catch (error) {
    return error.response?.data || { message: "Something Went Wrong!" };
  }
};

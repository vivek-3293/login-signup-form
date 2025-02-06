import axios from "axios";
import Cookies from "js-cookie";
import { AuthContext } from "../context/AuthContext";
import { useContext, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

axios.defaults.withCredentials = true;

export const ApiInterceptor = () => {
  const { handleLogout, setAuth } = useContext(AuthContext);
  const navigate = useNavigate();
  const isLoggingOut = useRef(false);

  useEffect(() => {
    const interceptor = axios.interceptors.response.use(
      (response) => response,
      async (error) => {
        console.log("err", error?.response?.status);
        if (error?.response?.status === 403 && !isLoggingOut.current) {
          isLoggingOut.current = true;
          Cookies.remove("connect.sid");

          setAuth(null);
          localStorage.removeItem("auth");
          if (handleLogout) await handleLogout();
          // toast.error(error?.response?.data?.message);

          setTimeout(() => {
            navigate("/");
          }, 100);
        }
        return Promise.reject(error);
      }
    );
    // console.log("inter", interceptor);

    return () => {
      axios.interceptors.response.eject(interceptor);
    };
  }, [handleLogout, navigate, setAuth]);
};

// Api Commun Method
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

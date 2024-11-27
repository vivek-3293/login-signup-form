import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = async (email, password) => {
    try {
      const response = await axios.post("http://192.168.1.68:3030/auth/login", {
        email,
        password,
      });

      if (response.status === 200) {
        const token = response.data.accessToken;
        localStorage.setItem("token", token);
        Cookies.set("token", token, { expires: 7 });
        setUser({ email });
        return true;
      }
    } catch (error) {
      console.error("Login Error: ", error);
      return false;
    }
  };

  const signup = async (formData) => {
    try {
      const response = await axios.post(
        "http://192.168.1.68:3030/auth/register",
        formData
      );
      return response.data;
    } catch (error) {
      console.error("Signup Error: ", error);
      throw error.response?.data?.error || "Signup failed";
    }
  };

  const logout = async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.post(
        "http://192.168.1.68:3030/auth/logout",
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      localStorage.removeItem("token");
      Cookies.remove("token");
      setUser(null);
      toast.success("Logout Successful");
      
    } catch (error) {
      console.error("Logout Error: ", error);
    }
  };

  const isAuthenticated = () => {
    const token = Cookies.get("token");
    return token ? true : false;
  };

  useEffect(() => {
    if (isAuthenticated()) {
      setUser({ email: "user@example.com" }); // Example user
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

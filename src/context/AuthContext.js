import React, { createContext, useState, useContext, useEffect } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { userLogout } from "../services/UrlService";
import { toast } from "react-toastify";
import { post } from "../services/Api";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({ token: Cookies.get("token") || null });
  const navigate = useNavigate();

  useEffect(() => {
    if (auth.token) {
      navigate("/home");
    }
  }, [auth.token, navigate]);

  // Login Function
  const login = (token, role) => {
    Cookies.set("token", token);
    Cookies.set("role", role);
    setAuth({ token, role });
  };

  // Logout Function
  const handleLogout = async () => {
    try {
      const response = await post(userLogout(),{}, true);

      Cookies.remove("token");
      Cookies.remove("role");
      setAuth({ token: null, role: null });
      toast.success(response.message || "Logout Successful");
      navigate("/");
      // navigate("/loginformik")
    } catch (error) {
      toast.error(
        error.response?.message || "Logout failed. Please try again."
      );
    }
  };

  return (
    <AuthContext.Provider value={{ auth, login, handleLogout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

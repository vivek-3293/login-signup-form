import React, { createContext, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { userLogout } from "../services/UrlService";
import { post } from "../services/Api";
import Cookies from "js-cookie";
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(() => {
    const savedAuth = localStorage.getItem("auth");
    return savedAuth ? JSON.parse(savedAuth) : null;
  });

  const navigate = useNavigate();

  const handleUserData = (role) => {
    setAuth({ role });
    localStorage.setItem("auth", JSON.stringify({ role }));

    navigate("/");
  };

  const handleLogout = async () => {
    setAuth(null);
    localStorage.removeItem("auth");
    Cookies.remove("connect.sid");
    await post(userLogout());
    setTimeout(() => {
      navigate("/");
    }, 100);
  };

  return (
    <AuthContext.Provider
      value={{ auth, setAuth, handleUserData, handleLogout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

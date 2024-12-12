import React, { createContext, useState, useContext, useEffect } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({ token: Cookies.get("token") || null });
  const navigate = useNavigate();
  
    useEffect(() => {
      if (auth.token){
        navigate("/home");
      }
    }, [auth.token, navigate]);
  

  // Login Function
  const login = (token) => {
    Cookies.set("token", token);
    setAuth({ token });
  };

  // Logout Function
  const logout = () => {
    Cookies.remove("token");
    setAuth({ token: null });
    navigate("/")
    // navigate("/loginformik")
  };

  return (
    <AuthContext.Provider value={{ auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

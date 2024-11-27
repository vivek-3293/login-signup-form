import React, { createContext, useState, useContext } from "react";
import Cookies from "js-cookie";
import axios from "axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(() => ({
    token: Cookies.get("token") || null,
  }));

  // Login Function
  const login = (token) => {
    Cookies.set("token", token, { expires: 7 });
    setAuth({ token });
  };

  // Logout Function
  const logout = () => {
    Cookies.remove("token");
    setAuth({ token: null });
  };

  // Refresh Token Function
  const refreshToken = async () => {
    try {
      const response = await axios.post(
        "http://192.168.1.68:3030/auth/refresh"
      );
      if (response.data && response.data.token) {
        const newToken = response.data.token;
        login(newToken);
      } else {
        console.log("Refresh token response invalid");
      }
    } catch (error) {
      console.log("Token refresh failed:", error.message);
      logout();
    }
  };

  return (
    <AuthContext.Provider value={{ auth, login, logout, refreshToken }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

import React, { createContext, useState, useEffect, useContext } from "react";
import Cookies from "js-cookie";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(() =>({
    token: Cookies.get("token") || null,
  }));

  const login = (token) => {
    Cookies.set("token", token, { expires: 7 });
    setAuth({ token });
  }

  const logout = () => {
    Cookies.remove("token");
    setAuth({ token: null });
  } 

 
  return (
    <AuthContext.Provider value={{ auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
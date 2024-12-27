import React, { createContext, useState ,useContext} from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";


export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(() => {
    const savedAuth = localStorage.getItem("auth");
    return savedAuth ? JSON.parse(savedAuth) : {};
  });
  
  const navigate = useNavigate();

  const handleLogin = (token, role) => {
    setAuth({ token, role });
    Cookies.set("token", token); 
    localStorage.setItem("auth", JSON.stringify({ token, role }));
    navigate("/");
  };

  const handleLogout = () => {
    setAuth({});
    Cookies.remove("token");
    localStorage.removeItem("auth");
    navigate("/");
  };

  return (
    <AuthContext.Provider value={{ auth, handleLogin, handleLogout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
























import React, { createContext, useState, useContext, useEffect } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { userLogout } from "../services/UrlService";
import { toast } from "react-toastify";
import { post } from "../services/Api";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({ 
    token: Cookies.get("token") || null,
    role: Cookies.get("role") || null,
  });
    
  const navigate = useNavigate();

  useEffect(() => {
    if (auth.token) {
      navigate("/");
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
      navigate("/login");
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
























// import React, { createContext, useState ,useContext} from "react";
// import { useNavigate } from "react-router-dom";

// export const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [auth, setAuth] = useState(() => {
//     const savedAuth = localStorage.getItem("auth");
//     return savedAuth ? JSON.parse(savedAuth) : {};
//   });
  
//   const navigate = useNavigate();

//   const handleLogin = (token, role) => {
//     setAuth({ token, role });
//     localStorage.setItem("auth", JSON.stringify({ token, role }));
//     navigate("/");
//   };

//   const handleLogout = () => {
//     setAuth({});
//     localStorage.removeItem("auth");
//     navigate("/login");
//   };

//   return (
//     <AuthContext.Provider value={{ auth, handleLogin, handleLogout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => useContext(AuthContext);

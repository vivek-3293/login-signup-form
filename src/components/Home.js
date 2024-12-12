import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { toast } from "react-toastify";
import { post } from "../services/api";
import { userLogout } from "../services/urlService";

const Home = () => {
  const { auth, logout } = useContext(AuthContext);

  const handleLogout = async () => {
    try {
      console.log("Token", auth.token);
      
      const response = await post(userLogout(),{});
      
      toast.success(response.message || "Logout Successful");
      logout();
    } catch (error) {
      console.log("Logout Error", error.response);
      
      toast.error(
        error.response?.message || "Logout failed. Please try again."
      );
    }
  };

  return (
    <div className="container text-center mt-5">
      <h1>Welcome to Home Page</h1>

      <button className="btn btn-danger mt-3" onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
};

export default Home;

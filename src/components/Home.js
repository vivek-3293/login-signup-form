import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Home = () => {
  const { auth, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try{
      const response = await axios.post("http://192.168.1.68:3030/auth/logout",
        {},
        {
          headers: {
            Authorization: `Bearer ${auth.token}`,
          },
        }
      );
        toast.success(response.data.message || "Logout Successful");
        logout();
        navigate("/");
    }catch (error){
    console.error("Logout Failed", error);
    toast.error(error.response?.data?.message || "Logout failed. Please try again.");
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

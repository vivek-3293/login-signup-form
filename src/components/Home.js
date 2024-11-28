import React, { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BiUserCircle } from "react-icons/bi";

const Home = () => {
  const { auth, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = async () => {
    try {
      const response = await axios.post(
        "http://192.168.1.9:3030/auth/logout",
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
    } catch (error) {
      console.error("Logout Failed", error);
      toast.error(
        error.response?.data?.message || "Logout failed. Please try again."
      );
    }
  };

  return (
    <div className="container text-center mt-5">
      <h1>Welcome to Home Page</h1>
      <div className="profile-container position-relative">
        <button
          className="btn btn-light border rounded-circle"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <BiUserCircle />
        </button>

        {isMenuOpen && (
          <div
            className="position-absolute end-0 bg-light border rounded p-3"
            style={{ width: "200px" }}
          >
            <p className="mb-2">Welcome, {auth?.user?.name || "User"}</p>
            <button className="btn btn-danger mt-3" onClick={handleLogout}>
              Logout
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;

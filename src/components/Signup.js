import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { toast } from "react-toastify";
import axios from "axios";

const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();


  const handleChange = (e) =>{
    const { name, value} = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible((prev) => !prev);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://192.168.1.68:3030/auth/register", formData);
      setMessage(`Registration successful! ${response.data.name}`);
      toast.success("Registration successful")
      navigate("/");
    } catch (error) {
      setMessage(error.response?.data?.error || "Registration failed. Please try again.");
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <h2 className="text-center">Sign Up</h2>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              className="form-control my-3"
              placeholder="Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              
              required
            />
            <input
              type="email"
              className="form-control my-3"
              placeholder="Email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <input
              type={passwordVisible ? "text" : "password"}
              className="form-control my-3"
              placeholder="Password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <span
              className="position-absulate"
              style={{ top: "40px", right: "10px", cursor: "pointer" }}
              onClick={togglePasswordVisibility}
            >
              {passwordVisible ? <FaEyeSlash /> : <FaEye />}
            </span>

            <button type="submit" className="btn btn-primary w-100">
              Sign Up
            </button>
          </form>
          <p className="text-center mt-3">
            Already have an account? <Link to="/">Login</Link>
          </p>
          {message && <p className="text-danger text-center">{message}</p>}
        </div>
      </div>
    </div>
  );
};

export default Signup;

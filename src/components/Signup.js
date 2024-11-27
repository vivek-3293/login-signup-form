import React, { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";

const Signup = () => {
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [message, setMessage] = useState("");
  const { signup } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signup(formData);
      setMessage("Registration successful!");
      navigate("/");
    } catch (error) {
      setMessage(error);
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
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
            <input
              type="email"
              className="form-control my-3"
              placeholder="Email"
              name="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
            />
            <input
              type="password"
              className="form-control my-3"
              placeholder="Password"
              name="password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              required
            />
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

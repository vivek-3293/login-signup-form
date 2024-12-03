import React, { useState, useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [errors, setErrors] = useState({});
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();


  const validateForm = (name, value) => {
    let error = "";
    if (name === "email") {
      if (!value) {
        error = "Email is Required.";
      } else if (!/\S+@\S+\.\S+/.test(value)) {
        error = "Enter Valid Email.";
      }
    }

    if (name === "password") {
      if (!value) {
        error = "Password is Required";
      } else if (value.length < 6) {
        error = "Password must be at least 6 characters long.";
      }
    }

    return error;
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    const errors = validateForm(name, value);
    setErrors((prev) => ({ ...prev, [name]: errors }));
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible((prev) => !prev);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const emailError = validateForm("email", email);
    const passwordError = validateForm("password", password);

    if (emailError || passwordError) {
      setErrors({ email: emailError, password: passwordError });
      return;
    }

    try {
      const response = await axios.post("/api/login/custom-validation", {
        email,
        password,
      });
      login(response.data.accessToken);
      toast.success("Login Successful");
    } catch (error) {
      console.log(error);
      toast.error("Invalid email or password.");
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <h2 className="text-center">Login</h2>
          <form onSubmit={handleSubmit}>
            <input
              type="email"
              className="form-control my-3"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onBlur={handleBlur}
              name="email"
              required
            />
            {errors.email && <p className="text-danger">{errors.email}</p>}
            <div className="position-relative">
              <input
                type={passwordVisible ? "text" : "password"}
                className="form-control my-3"
                placeholder="Password"
                value={password}
                onChange={ (e) => setPassword(e.target.value)}
                onBlur={handleBlur}
                name="password"
                required
              />

              <span
                className="pass-icon position-absulate"
                onClick={togglePasswordVisibility}
              >
                {passwordVisible ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
            {errors.password && (
              <p className="text-danger">{errors.password}</p>
            )}

            <button type="submit" className="btn btn-primary w-100">
              Login
            </button>
          </form>
          <p className="text-center mt-3">
            Don't have an account? <Link to="/signup">Sign Up</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;

import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { toast } from "react-toastify";
import axios from "axios";
import { Helmet } from "react-helmet";

const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validateForm = (name, value) => {
    let errors = "";
    if (name === "name") {
      if (!value.trim()) {
        errors = "Name is Required.";
      } else if (!/^[a-zA-Z0-9\s]+$/.test(value)) {
        errors = "Name should be in letters only.";
      }
    }

    if (name === "email") {
      if (!value) {
        errors = "Email is Required.";
      } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
        errors = "Enter Valid Email.";
      }
    }

    if (name === "password") {
      if (!value) {
        errors = "Password is Required";
      } else if (formData.password.length < 6) {
        errors = "Password must be at least 6 characters long.";
      }
    }

    return errors;
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    const errors = validateForm(name, value);
    setErrors((prev) => ({ ...prev, [name]: errors }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible((prev) => !prev);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const nameError = validateForm("name", formData.name);
    const emailError = validateForm("email", formData.email);
    const passwordError = validateForm("password", formData.password);

    const allErrors = {
      name: nameError,
      email: emailError,
      password: passwordError,
    };

    setErrors(allErrors);

    if (Object.values(allErrors).some((error) => error)) return;

    setLoading(true);
    try {
      const response = await axios.post(
        "/api/auth/registration/custom-validation",
        formData
      );
      setMessage(`Registration successful! ${response.data.name}`);
      toast.success("Registration successful");
      navigate("/home");
    } catch (error) {
      setMessage(
        error.response?.data?.message ||
          "Registration failed. Please try again."
      );
      setLoading(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Sign Up</title>
      </Helmet>

      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <h2 className="text-center">Sign Up</h2>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                className="form-control"
                placeholder="Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                onBlur={handleBlur}
                required
              />
              {errors.name && <p className="text-danger">{errors.name}</p>}
              <input
                type="email"
                className="form-control mt-4"
                placeholder="Email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                onBlur={handleBlur}
                required
              />
              {errors.email && <p className="text-danger">{errors.email}</p>}
              <div className="position-relative">
                <input
                  type={passwordVisible ? "text" : "password"}
                  className="form-control mt-4"
                  placeholder="Password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  required
                />
                <span
                  className="pass-icon-signup position-absolute"
                  onClick={togglePasswordVisibility}
                >
                  {passwordVisible ? <FaEyeSlash /> : <FaEye />}
                </span>
              </div>
              {errors.password && (
                <p className="text-danger">{errors.password}</p>
              )}

              <button type="submit" className="btn btn-primary w-100 mt-4">
                {loading ? (
                  <div
                    className="spinner-border spinner-border-sm"
                    role="status"
                  >
                    <span className="sr-only">Loading...</span>
                  </div>
                ) : (
                  "Sign Up"
                )}
              </button>
            </form>
            <p className="text-center mt-3">
              Already have an account? <Link to="/">Login</Link>
            </p>
            {message && <p className="text-danger text-center">{message}</p>}
          </div>
        </div>
      </div>
    </>
  );
};

export default Signup;

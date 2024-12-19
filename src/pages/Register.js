import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { toast } from "react-toastify";
import { Helmet } from "react-helmet";
import { AuthContext } from "../context/AuthContext";
import { post } from "../services/Api";
import { userRegister } from "../services/UrlService";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirm_password: "",
    phone: "",
    address: "",
  });
  const [passwordVisible, setPasswordVisible] = useState(false);
  const { login } = useContext(AuthContext);

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

    if (name === "phone") {
      if (!value.trim()) {
        errors = "Phone number is required.";
      } else if (!/^\d{10}$/.test(value)) {
        errors = "Enter a valid 10-digit phone number.";
      }
    }
    
    if (name === "address") {
      if (!value.trim()) {
        errors = "Address is required.";
      } else if (value.length < 10) {
        errors = "Address should be at least 10 characters long.";
      }
    }

    if (name === "password") {
      if (!value) {
        errors = "Password is Required";
      } else if (formData.password.length < 6) {
        errors = "Password must be at least 6 characters long.";
      }
    }

    if (name === "confirm_password") {
      if (!value) {
        errors = "Confirm Password is required.";
      } else if (value !== formData.password) {
        errors = "Passwords do not match.";
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
    const phoneError = validateForm("phone", formData.phone);
    const addressError = validateForm("address", formData.address);
    const confirmPasswordError = validateForm("confirm_password", formData.confirm_password);

    const allErrors = {
      name: nameError,
      email: emailError,
      password: passwordError,
      phone: phoneError,
      address: addressError,
      confirm_password: confirmPasswordError,
    };

    setErrors(allErrors);

    if (Object.values(allErrors).some((error) => error)) return;

    setLoading(true);
    try {
      const response = await post(userRegister(), formData);    

      toast.success('Registration successful Welcome');
      login(response.accessToken);
      
      navigate("/");
    } catch (error) {
      toast.error("Registration Failed. Please Try Again.");
      setMessage(
        error.response?.message || "Registration failed. Please try again."
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
              />
              {errors.name && <p className="text-danger">{errors.name}</p>}
              <input
                type="email"
                className="form-control mt-3"
                placeholder="Email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errors.email && <p className="text-danger">{errors.email}</p>}
              <input
                type="text"
                className="form-control mt-3"
                placeholder="Phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errors.phone && <p className="text-danger">{errors.phone}</p>}
              <textarea
                className="form-control mt-3"
                placeholder="Address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errors.address && (
                <p className="text-danger">{errors.address}</p>
              )}
              <div className="position-relative">
                <input
                  type={passwordVisible ? "text" : "password"}
                  className="form-control mt-3"
                  placeholder="Password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
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

              <input
                type={passwordVisible ? "text" : "password"}
                className="form-control mt-3"
                placeholder="Confirm Password"
                name="confirm_password"
                value={formData.confirm_password}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errors.confirm_password && (
                <p className="text-danger">{errors.confirm_password}</p>
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
                  "Register"
                )}
              </button>
            </form>
            <p className="text-center mt-3">
              Already have an account? <Link to="/login">Login</Link>
            </p>
            
            {message && <p className="text-danger text-center">{message}</p>}
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;

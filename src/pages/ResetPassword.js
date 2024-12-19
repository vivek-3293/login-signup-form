import React from "react";
import { useState } from "react";
import { Helmet } from "react-helmet";
import { post } from "../services/Api";
import { userResetPassword } from "../services/UrlService";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const ResetPassword = () => {
  const [formData, setFormData] = useState({
    email: "",
    new_password: "",
    confirm_password: "",
  });

  const navigate = useNavigate();

  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const validateForm = (name, value) => {
    let error = "";
    if (name === "email") {
      if (!value) {
        error = "Email is required.";
      } else if (!/\S+@\S+\.\S+/.test(value)) {
        error = "Enter a valid email.";
      }
    }

    if (name === "new_password") {
      if (!value) {
        error = "New password is required.";
      } else if (value.length < 6) {
        error = "Password must be at least 6 characters long.";
      }
    }

    if (name === "confirm_password") {
      if (!value) {
        error = "Confirm password is required.";
      } else if (value !== formData.new_password) {
        error = "Passwords do not match.";
      }
    }

    return error;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    const error = validateForm(name, value);
    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const emailError = validateForm("email", formData.email);
    const passwordError = validateForm("new_password", formData.new_password);
    const confirmPasswordError = validateForm(
      "confirm_password",
      formData.confirm_password
    );

    const allErrors = {
      email: emailError,
      new_password: passwordError,
      confirm_password: confirmPasswordError,
    };

    setErrors(allErrors);
    if (Object.values(allErrors).some((error) => error)) return;

    setLoading(true);
    try {
      const response = await post(userResetPassword(), formData);
      toast.success(response.message);
      navigate("/login");
    } catch (error) {
      setMessage(
        error.response?.message || "Password and Confirm password are not same"
      );
      setLoading(false);
    }
  };
  return (
    <>
      <Helmet>
        <title>Reset Password</title>
      </Helmet>

      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <h2 className="text-center">Login</h2>
            <form onSubmit={handleSubmit}>
              <input
                type="email"
                className="form-control"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                onBlur={handleBlur}
                name="email"
              />
              {errors.email && (
                <p className="text-danger mb-3">{errors.email}</p>
              )}

              <input
                type="password"
                className="form-control mt-4"
                placeholder="New Password"
                value={formData.new_password}
                onChange={handleChange}
                onBlur={handleBlur}
                name="new_password"
              />

              {errors.new_password && (
                <p className="text-danger">{errors.new_password}</p>
              )}

              <input
                type="password"
                className="form-control mt-4"
                placeholder="Confirm Password"
                value={formData.confirm_password}
                onChange={handleChange}
                onBlur={handleBlur}
                name="confirm_password"
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
                  "reset password"
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default ResetPassword;

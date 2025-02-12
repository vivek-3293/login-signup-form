import React from "react";
import { useState } from "react";
import { Helmet } from "react-helmet";
import { post } from "../services/Api";
import { userResetPassword } from "../services/UrlService";
import { toast } from "react-toastify";
import { useLocation, useNavigate } from "react-router-dom";

const ResetPassword = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const prefilledEmail = queryParams.get("email") || "";

  const [formData, setFormData] = useState({
    email: prefilledEmail,
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

    const allErrors = {
      email: emailError,
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
            <h2 className="text-center mb-5">Forgot Your Password?</h2>
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

              <button type="submit" className="btn btn-primary w-100 mt-4 rounded-pill">
                {loading ? (
                  <div
                    className="spinner-border spinner-border-sm"
                    role="status"
                  >
                  </div>
                ) : (
                  "Next"
                )}
              </button>
            </form>
            <div className="text-center mt-3">
              <button
                className="btn btn-link"
                onClick={() => navigate("/login")}
              >
                Return to Login
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ResetPassword;

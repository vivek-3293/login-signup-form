import React, { useState, useContext } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { toast } from "react-toastify";
import { Helmet } from "react-helmet";
import { AuthContext } from "../context/AuthContext";
import { post } from "../services/api";
import { addMember, userRegister } from "../services/urlService";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirm_password: "",
    phone: "",
    address: "",
    role: "",
    status: "",
  });
  const [passwordVisible, setPasswordVisible] = useState(false);
  const { handleUserData } = useContext(AuthContext);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [isFormChanged, setIsFormChanged] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const isAddMember = location.state?.isAddMember;

  const validateForm = (name, value) => {
    let errors = "";
    if (name === "name" && !value.trim()) errors = "Name is required.";
    if (name === "email" && !/\S+@\S+\.\S+/.test(value))
      errors = "Invalid email.";
    if (name === "password" && value.length < 6)
      errors = "Password must be 6 characters.";
    if (name === "confirm_password" && value !== formData.password)
      errors = "Passwords do not match.";
    return errors;
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    const error = validateForm(name, value);
    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setIsFormChanged(true);
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const requiredFields = isAddMember
      ? ["name", "email", "password", "confirm_password", "role", "status"]
      : ["name", "email", "password", "confirm_password"];

    const allErrors = {};
    requiredFields.forEach((field) => {
      const error = validateForm(field, formData[field]);
      if (error) allErrors[field] = error;
    });

    setErrors(allErrors);
    if (Object.keys(allErrors).length > 0) return;

    setLoading(true);
    try {
      const apiEndpoint = isAddMember ? addMember() : userRegister();

      const memberRegister = isAddMember
        ? formData
        : {
            name: formData.name,
            email: formData.email,
            password: formData.password,
            confirm_password: formData.confirm_password,
            phone: formData.phone,
            address: formData.address,
          };

      const response = await post(apiEndpoint, memberRegister);
      toast.success(
        isAddMember ? response?.message : response?.message
      );

      setIsFormChanged(false);
      if (isAddMember) {
        navigate("/members");
      } else {
        handleUserData(response.userDetail.role);
        navigate("/");
      }
    } catch (error) {
      toast.error("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>{isAddMember ? "Add Member" : "Sign Up"}</title>
      </Helmet>

      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <h2 className="text-center">
              {isAddMember ? "Add Member" : "Sign Up"}
            </h2>
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
                type="number"
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

              {isAddMember && (
                <>
                  <select
                    name="role"
                    className="form-control mt-3"
                    value={formData.role}
                    onChange={handleChange}
                  >
                    <option value="">Select Role</option>
                    <option value="admin">Admin</option>
                    <option value="member">Member</option>
                  </select>
                  <select
                    name="status"
                    className="form-control mt-3"
                    value={formData.status}
                    onChange={handleChange}
                  >
                    <option value="">Select Status</option>
                    <option value="active">Active</option>
                    <option value="suspended">Suspends</option>
                  </select>
                </>
              )}

              <div className="d-flex my-4">
                <button
                  type="submit"
                  className="btn btn-primary w-100 rounded-pill me-1"
                  disabled={!isFormChanged || loading}
                >
                  {loading ? "Loading..." : isAddMember ? "Submit" : "Register"}
                </button>
                {isAddMember && (
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => navigate(isAddMember ? "/members" : "/")}
                >
                  Cancel
                </button>
                )}
              </div>
            </form>

            {!isAddMember && (
              <p className="text-center mt-3">
                Already have an account? <Link to="/login">Login</Link>
              </p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;

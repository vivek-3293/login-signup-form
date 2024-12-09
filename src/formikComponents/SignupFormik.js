import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useFormik } from "formik";
import axios from "axios";
import { toast } from "react-toastify";
import { AuthContext } from "../context/AuthContext";
import * as Yup from "yup";
import { Helmet } from "react-helmet";

function SignupFormik() {
  const [loading, setLoading] = useState(false);
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [message, setMessage] = useState("");

  const [passwordVisible, setPasswordVisible] = useState(false);

  const validationSchema = Yup.object({
    name: Yup.string().min(3).max(15).required("Name is Required."),
    email: Yup.string().email("Invalid Email.").required("Email is Required."),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .max(10, "Password must not exceed 10 characters")
      .matches(/[a-z]/, "Password must contain at least one small letter")
      .matches(/[A-Z]/, "Password must contain at least one capital letter")
      .matches(/\d/, "Password must contain at least one number")
      .matches(
        /[@!$%&*?]/,
        "Password must contain at least one special character"
      )
      .required("Password is Required"),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
    },
    validationSchema: validationSchema,

    onSubmit: async (values) => {
      setLoading(true);
      try {
        const response = await axios.post(
          "/api/auth/registration/custom-validation",
          values
        );
        login(response.data.accessToken);
        toast.success("Registration Successful");
        navigate("/home");
      } catch (error) {
        toast.error("Registration Failed. Please Try Again.");
        setMessage(
          error.response?.data?.message ||
            "Registration failed. Please try again."
        );
        setLoading(false);
      }
    },
  });

  const togglePasswordVisibility = () => {
    setPasswordVisible((prev) => !prev);
  };

  return (
    <>
    <Helmet>
        <title>SignupFormik</title>
      </Helmet>
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <h2 className="text-center">Sign Up Formik</h2>
          <form onSubmit={formik.handleSubmit}>
            <input
              type="text"
              className="form-control"
              placeholder="Name"
              name="name"
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              required
            />
            {formik.touched.name && formik.errors.name && (
              <p className="text-danger">{formik.errors.name}</p>
            )}

            <input
              type="email"
              className="form-control mt-4"
              placeholder="Email"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              required
            />
            {formik.touched.email && formik.errors.email && (
              <p className="text-danger">{formik.errors.email}</p>
            )}

            <div className="position-relative">
              <input
                type={passwordVisible ? "text" : "password"}
                className="form-control mt-4"
                placeholder="Password"
                name="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                required
              />
              <span
                className="pass-icon-signup position-absolute"
                onClick={togglePasswordVisibility}
              >
                {passwordVisible ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
            {formik.touched.password && formik.errors.password && (
              <p className="text-danger">{formik.errors.password}</p>
            )}

            {loading ? (
              <div className="text-center">Loading...</div>
            ) : (
              <button type="submit" className="btn btn-primary w-100 mt-4">
                Sign Up Formik
              </button>
            )}
          </form>
          <p className="text-center mt-3">
            Already have an account? <Link to="/">LoginFormik</Link>
          </p>
          {message && <p className="text-danger text-center">{message}</p>}
        </div>
      </div>
    </div>
    </>
  );
}

export default SignupFormik;

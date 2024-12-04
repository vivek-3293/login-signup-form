import React, { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import axios from "axios";
import { toast } from "react-toastify";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import * as Yup from "yup";

function LoginFormik() {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const [passwordVisible, setPasswordVisible] = useState(false);

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Email is Invalid.")
      .required("Email is Required."),
    password: Yup.string()
      .required("Password is Required.")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
        "Enter Strong Password."
      ),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },

    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        const response = await axios.post(
          "/api/auth/login/custom-validation",
          values
        );
        login(response.data.accessToken);
        toast.success("Login Successful.");
        navigate("/home");
      } catch (error) {
        toast.error("Invalid email or password.");
      }
    },
  });

  const togglePasswordVisibility = () => {
    setPasswordVisible((prev) => !prev);
  };
  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <h2 className="text-center">Login Formik</h2>
          <form onSubmit={formik.handleSubmit}>
            <input
              type="text"
              className="form-control my-3"
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
                className="form-control my-3"
                placeholder="Password"
                name="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                required
              />

              <span
                className="pass-icon-signup position-absulate"
                onClick={togglePasswordVisibility}
              >
                {passwordVisible ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
            {formik.touched.password && formik.errors.password && (
              <p className="text-danger">{formik.errors.password}</p>
            )}

            <button type="submit" className="btn btn-primary w-100">
              Login Formik
            </button>
          </form>
          <p className="text-center mt-3">
            Don't have an account? <Link to="/signupformik">SignUpFormik</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default LoginFormik;

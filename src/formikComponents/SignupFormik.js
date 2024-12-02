import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { FaEye, FaEyeSlash } from "react-icons/fa";

function SignupFormik() {
    const { auth } = useContext(AuthContext);
    const navigate = useNavigate();

    const [passwordVisible, setPasswordVisible] = useState(false);

    const togglePasswordVisibility = () =>{
        setPasswordVisible((prev) => !prev);
    }
  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <h2 className="text-center">Sign Up Formik</h2>
          <form>
            <input
              type="text"
              className="form-control my-3"
              placeholder="Name"
              name="name"
              required
            />

            <input
              type="text"
              className="form-control my-3"
              placeholder="Email"
              name="email"
              required
            />

            <div className="position-relative">
              <input 
              type={passwordVisible ? "text" : "password"}
              className="form-control my-3"
              placeholder="Password"
              name="password"
              required
              />
              <span className="pass-icon-signup position-absulate" onClick={togglePasswordVisibility}>
                {passwordVisible ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>

            <button type="submit" className="btn btn-primary w-100">Sign Up Formik</button>
          </form>
          <p className="text-center mt-3">Already have an account? <Link to="/">LoginFormik</Link></p>
        </div>
      </div>
    </div>
  );
}

export default SignupFormik;

import React, { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Helmet } from "react-helmet";
import { post } from "../services/Api";
import { userLogin } from "../services/UrlService";

const Login = () => {
  const [formData, setFormData] = useState({email: "", password: ""});
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const { login } = useContext(AuthContext);

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

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
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

    const {email, password} = formData;

    const emailError = validateForm("email", email);
    const passwordError = validateForm("password", password);

    if (emailError || passwordError) {
      setErrors({ email: emailError, password: passwordError });
      return;
    }

    setLoading(true);
    try {
      const response = await post(userLogin(), formData);
      login(response.accessToken, response.role);
      toast.success("Login Successful");
    } catch (error) {
      toast.error("Invalid email or password.");
      setLoading(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Login</title>
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
              <div className="position-relative">
                <input
                  type={passwordVisible ? "text" : "password"}
                  className="form-control mt-4"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  name="password"
                />

                <span
                  className="pass-icon position-absolute"
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
                  "Login"
                )}
              </button>
            </form>
            <p className="text-center mt-3">
              Don't have an account? <Link to="/signup">Register</Link>
            </p>
            <p className="text-center">
              <Link to="/reset-password">Forgot Password</Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;













// import React, { useState, useContext } from "react";
// import { AuthContext } from "../context/AuthContext";
// import { Link, useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";
// import { FaEye, FaEyeSlash } from "react-icons/fa";
// import { Helmet } from "react-helmet";
// import { post } from "../services/Api";
// import { userLogin } from "../services/UrlService";

// const Login = () => {
//   const [formData, setFormData] = useState({ email: "", password: "" });
//   const [passwordVisible, setPasswordVisible] = useState(false);
//   const [errors, setErrors] = useState({ email: "", password: "" });
//   const [loading, setLoading] = useState(false);
//   const { handleLogin } = useContext(AuthContext);
//   const navigate = useNavigate();

//   const validateForm = (name, value) => {
//     let error = "";
//     if (name === "email") {
//       if (!value) {
//         error = "Email is required.";
//       } else if (!/\S+@\S+\.\S+/.test(value)) {
//         error = "Enter a valid email.";
//       }
//     }

//     if (name === "password") {
//       if (!value) {
//         error = "Password is required.";
//       } else if (value.length < 6) {
//         error = "Password must be at least 6 characters long.";
//       }
//     }

//     return error;
//   };

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleBlur = (e) => {
//     const { name, value } = e.target;
//     const error = validateForm(name, value);
//     setErrors((prev) => ({ ...prev, [name]: error }));
//   };

//   const togglePasswordVisibility = () => {
//     setPasswordVisible((prev) => !prev);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const { email, password } = formData;

//     const emailError = validateForm("email", email);
//     const passwordError = validateForm("password", password);

//     if (emailError || passwordError) {
//       setErrors({ email: emailError, password: passwordError });
//       return;
//     }

//     setLoading(true);
//     try {
//       const response = await post(userLogin(), formData);
//       handleLogin(response.accessToken, response.userDetail.role);
//       toast.success("Login successful");
//       navigate("/");
//     } catch (error) {
//       toast.error(
//         error.response?.data?.message || "Invalid email or password."
//       );
//       setLoading(false);
//     }
//   };

//   return (
//     <>
//       <Helmet>
//         <title>Login</title>
//       </Helmet>
//       <div className="container mt-5">
//         <div className="row justify-content-center">
//           <div className="col-md-6">
//             <h2 className="text-center">Login</h2>
//             <form onSubmit={handleSubmit}>
//               <input
//                 type="email"
//                 className="form-control"
//                 placeholder="Email"
//                 value={formData.email}
//                 onChange={handleChange}
//                 onBlur={handleBlur}
//                 name="email"
//               />
//               {errors.email && (
//                 <p className="text-danger mb-3">{errors.email}</p>
//               )}

//               <div className="position-relative">
//                 <input
//                   type={passwordVisible ? "text" : "password"}
//                   className="form-control mt-4"
//                   placeholder="Password"
//                   value={formData.password}
//                   onChange={handleChange}
//                   onBlur={handleBlur}
//                   name="password"
//                 />
//                 <span
//                   className="pass-icon position-absolute"
//                   onClick={togglePasswordVisibility}
//                 >
//                   {passwordVisible ? <FaEyeSlash /> : <FaEye />}
//                 </span>
//               </div>
//               {errors.password && (
//                 <p className="text-danger">{errors.password}</p>
//               )}

//               <button type="submit" className="btn btn-primary w-100 mt-4">
//                 {loading ? (
//                   <div
//                     className="spinner-border spinner-border-sm"
//                     role="status"
//                   >
//                     <span className="sr-only">Loading...</span>
//                   </div>
//                 ) : (
//                   "Login"
//                 )}
//               </button>
//             </form>

//             <p className="text-center mt-3">
//               Don't have an account? <Link to="/signup">Register</Link>
//             </p>
//             <p className="text-center">
//               <Link to="/reset-password">Forgot Password?</Link>
//             </p>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Login;

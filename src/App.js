import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Signup from "./components/Signup";
import "bootstrap/dist/css/bootstrap.min.css";
import "../src/index.css";
import Home from "./components/Home";
import ProtectedRoute from "./components/ProtectedRoute";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthProvider } from "./context/AuthContext";
import LoginFormik from "./formikComponents/LoginFormik";
import SignupFormik from "./formikComponents/SignupFormik";

function App() {
  return (
    <Router>
      <AuthProvider>
        <div>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/loginformik" element={<LoginFormik />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/signupformik" element={<SignupFormik />} />
            <Route path="/home" element={ <ProtectedRoute>{" "}<Home />{" "}</ProtectedRoute>
              }
            />
          </Routes>
        </div>
        <ToastContainer />
      </AuthProvider>
    </Router>
  );
}

export default App;

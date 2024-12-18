import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Login from "./pages/Login";
import Register from "./pages/Register";
import "../src/index.css";
import Home from "./pages/Home";
import ProtectedRoute from "./pages/ProtectedRoute";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthProvider } from "./context/AuthContext";
import LoginFormik from "./formikComponents/LoginFormik";
import SignupFormik from "./formikComponents/SignupFormik";
import Navbar from "./components/navbar";


function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Login />} />
          {/* <Route path="/loginformik" element={<LoginFormik />} /> */}
          <Route path="/signup" element={<Register />} />
          {/* <Route path="/signupformik" element={<SignupFormik />} /> */}
          <Route
            path="/home"
            element={
              <>
                <Navbar />
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              </>
            }
          />
        </Routes>
        <ToastContainer />
      </AuthProvider>
    </Router>
  );
}

export default App;

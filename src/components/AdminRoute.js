import React from "react";
import { useAuth } from "../context/AuthContext";
import { Navigate } from "react-router-dom";

const AdminRoute = ({ children }) => {
  const { auth } = useAuth();

  if (!auth.token) {
    return <Navigate to="/login" />;
  }

  if (auth.role !== "admin") {
    return <Navigate to="/" />;
  }

  return children;
};

export default AdminRoute;

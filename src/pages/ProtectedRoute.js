import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = ({ children, role, isAuthRoute = false }) => {
  const { auth } = useAuth();
  const location = useLocation();

  if (auth && isAuthRoute) {
    return <Navigate to={location.state?.from || "/"} replace />;
  }

  if (!auth && !isAuthRoute) {
    return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  }

  if (role && auth?.role?.role !== role) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;

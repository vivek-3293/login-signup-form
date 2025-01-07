import React from "react";
import { useLocation, Routes, Route, Navigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Home from "../pages/Home";
import ResetPassword from "../pages/ResetPassword";
import Navbar from "./communComponents/navbar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AdminRoute from "../components/communComponents/AdminRoute";
import SearchBook from "../pages/admin/SearchBook";
import AdminDashboard from "./AdminDashboard";
import BorrowHistory from "../pages/borrow/BorrowHistory ";
import AddBook from "../pages/admin/AddBook";
import MemberList from "../pages/admin/MemberList ";
import SingleBook from "../pages/admin/SingleBook";
import SingleMember from "../pages/admin/SingleMember";
import ProtectedRoute from "../pages/ProtectedRoute";
import NotFound from "./communComponents/NotFound";

function AppRoutes() {
  const location = useLocation();

  const noNavbarRoutes = [
    "/login",
    "/signup",
    "/reset-password",
    "/book",
    "/not-found",
  ];
  const showNavbar = !noNavbarRoutes.includes(location.pathname);

  return (
    <>
      {showNavbar && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/not-found" element={<NotFound />} />

        <Route
          path="/login"
          element={
            <ProtectedRoute isAuthRoute>
              <Login />
            </ProtectedRoute>
          }
        />
        <Route
          path="/signup"
          element={
            <ProtectedRoute isAuthRoute>
              <Register />
            </ProtectedRoute>
          }
        />

        <Route
          path="/reset-password"
          element={
            <ProtectedRoute isAuthRoute>
              <ResetPassword />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin-dashboard"
          element={
            <ProtectedRoute role="admin">
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin"
          element={
            <AdminRoute>
              <AddBook />
            </AdminRoute>
          }
        />
        <Route
          path="/update-book/:id"
          element={
            <AdminRoute>
              <AddBook />
            </AdminRoute>
          }
        />

        <Route path="/book/:id" element={<SingleBook />} />
        <Route path="/search" element={<SearchBook />} />

        {/* Member Routes */}
        <Route
          path="/members"
          element={
            <ProtectedRoute>
              <AdminRoute>
                <MemberList />
              </AdminRoute>
            </ProtectedRoute>
          }
        />

        <Route path="/member/:id" element={<SingleMember />} />

        {/* Borrow Routes */}

        <Route
          path="/borrow-history"
          element={
            <ProtectedRoute>
              <BorrowHistory />
            </ProtectedRoute>
          }
        />

       {/* All route for 404 */}
       <Route path="*" element={<Navigate to="/not-found" />} />
      </Routes>
      <ToastContainer />
    </>
  );
}

export default AppRoutes;

import React from "react";
import { useLocation, Routes, Route } from "react-router-dom";
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

function AppRoutes() {
  const location = useLocation();

  const noNavbarRoutes = ["/login", "/signup", "/reset-password", "/book"];
  const showNavbar = !noNavbarRoutes.includes(location.pathname);

  return (
    <>
      {showNavbar && <Navbar />}
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Register />} />
        <Route path="/" element={<Home />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />

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
            <AdminRoute>
              <MemberList />
            </AdminRoute>
          }
        />

        <Route path="/member/:id" element={<SingleMember />} />

        {/* Borrow Routes */}

        <Route path="/borrow-history" element={<BorrowHistory />} />
      </Routes>
      <ToastContainer />
    </>
  );
}

export default AppRoutes;

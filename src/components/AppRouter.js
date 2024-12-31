import React from "react";
import { useLocation, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Home from "../pages/Home";
import AddBook from "../pages/AddBook";
import ResetPassword from "../pages/ResetPassword";
import Navbar from "../components/navbar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AdminRoute from "../components/AdminRoute";
import SingleBook from "../pages/SingleBook";
import SearchBook from "../pages/SearchBook";
import MemberList from "../pages/MemberList ";
import SingleMember from "../pages/SingleMember";

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

      </Routes>
      <ToastContainer />
    </>
  );
}

export default AppRoutes;

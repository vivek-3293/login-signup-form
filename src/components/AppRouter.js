import React from "react";
import { useLocation, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Home from "../pages/Home";
import AdminRoute from "../components/AdminRoute";
import ResetPassword from "../pages/ResetPassword";
import Navbar from "../components/navbar";
import AddBook from "../pages/AddBook";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function AppRoutes() {
  const location = useLocation();

  const noNavbarRoutes = ["/login", "/signup", "/reset-password"];
  const showNavbar = !noNavbarRoutes.includes(location.pathname);

  return (
    <>
      {showNavbar && <Navbar />}
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Register />} />
        <Route path="/" element={<Home />} />
        <Route
          path="/admin"
          element={
              <AddBook />
          }
        />
        <Route path="/reset-password" element={<ResetPassword />} />
      </Routes>
      <ToastContainer />
    </>
  );
}

export default AppRoutes;

















// import React from "react";
// import { useLocation, Routes, Route, Navigate } from "react-router-dom";
// import "bootstrap/dist/css/bootstrap.min.css";
// import Login from "../pages/Login";
// import Register from "../pages/Register";
// import Home from "../pages/Home";
// import AddBook from "../pages/AddBook";
// import ResetPassword from "../pages/ResetPassword";
// import Navbar from "../components/navbar";
// import { ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import { useAuth } from "../context/AuthContext";

// function AppRoutes() {
//   const location = useLocation();
//   const { auth } = useAuth();

//   const noNavbarRoutes = ["/login", "/signup", "/reset-password"];
//   const showNavbar = !noNavbarRoutes.includes(location.pathname);

//   const ProtectedRoute = ({ children, isAdmin }) => {
//     if (!auth.token) {
//       return <Navigate to="/login" />;
//     }

//     if (isAdmin && auth.role !== "admin") {
//       return <Navigate to="/" />;
//     }

//     return children;
//   };

//   return (
//     <>
//       {showNavbar && <Navbar />}
//       <Routes>
//         <Route path="/login" element={<Login />} />
//         <Route path="/signup" element={<Register />} />
//         <Route path="/" element={<Home />} />
//         <Route
//           path="/admin"
//           element={
//             <ProtectedRoute isAdmin={true}>
//               <AddBook />
//             </ProtectedRoute>
//           }
//         />
//         <Route path="/reset-password" element={<ResetPassword />} />
//       </Routes>
//       <ToastContainer />
//     </>
//   );
// }

// export default AppRoutes;

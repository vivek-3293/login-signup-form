import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const Home = () => {
  const { auth } = useContext(AuthContext);

  return (
    <div className="container text-center mt-5">
      <h1>Welcome to Library Management System</h1>
      <p>You are logged in as <b>{auth?.role === "admin" ? "Admin" : "Member"}</b>.</p>
    </div>
  );
};

export default Home;




















// import React, { useContext } from "react";
// import { AuthContext } from "../context/AuthContext";
// import { toast } from "react-toastify";
// import { post } from "../services/Api";
// import { userLogout } from "../services/UrlService";

// const Home = () => {
//   const { auth, logout } = useContext(AuthContext);

//   const handleLogout = async () => {
//     try {
      
//       const response = await post(userLogout(),{}, true);
      
//       toast.success(response.message || "Logout Successful");
//       logout();
//     } catch (error) {
      
//       toast.error(
//         error.response?.message || "Logout failed. Please try again."
//       );
//     }
//   };

//   return (
//     <div className="container text-center mt-5">
//       <h1>Welcome to Home Page</h1>
      

//       <button className="btn btn-danger mt-3" onClick={handleLogout}>
//         Logout
//       </button>
//     </div>
//   );
// };

// export default Home;

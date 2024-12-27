import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import BooksList from "../pages/BookList";


const Home = () => {
  const { auth } = useContext(AuthContext);

  return (
    <div className="container text-center mt-5">
      <h1>Welcome to Library Management System</h1>
      <p>
        You are logged in as{" "}
        <b>{auth?.role === "admin" ? "Admin" : "Member"}</b>.
      </p>

      {/* {auth?.role === "admin" && <BooksList />} */}
      {auth && <BooksList />}
    </div>
  );
};

export default Home;

import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import BooksList from "./admin/BookList";

const Home = () => {
  const { auth } = useContext(AuthContext);

  return (
    <>
      <div className="container text-center mt-5">
        <h1>Welcome to Home Page</h1>
        <p>
          You are logged in as{" "}
          <b>{auth?.role?.role === "admin" ? "Admin" : auth?.role?.role === "member" ? "member" : ""}</b>
        </p>

        <BooksList />
      </div>
    </>
  );
};

export default Home;

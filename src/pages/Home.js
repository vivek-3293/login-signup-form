import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import BooksList from "./admin/BookList";

const Home = () => {
  const { auth } = useContext(AuthContext);

  return (
    <>
      <div className="container text-center pt-5 mt-8rem">
        <h2>Welcome to Home Page</h2>
        <p>
          You are logged in as{" "}
          <b>
            {auth?.role?.role === "admin"
              ? "Admin"
              : auth?.role?.role === "member"
              ? "member"
              : ""}
          </b>
        </p>

        <BooksList />
      </div>
    </>
  );
};

export default Home;

import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
  const { auth, handleLogout } = useContext(AuthContext);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/search?q=${searchTerm}`);
    }
  };

  const handleLoginClick = () => {
    navigate("/login");
  };

  const handleSignupClick = () => {
    navigate("/signup");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container">
        <h2> Library System</h2>

        <div className="collapse navbar-collapse">
          <ul className="navbar-nav ms-auto">

            {/* Search Bar */}
            <form className="d-flex" onSubmit={handleSearch}>
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search Books"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button className="btn btn-outline-success mx-1" type="submit">
                Search
              </button>
            </form>

            {/* Buttons */}
            {auth.token ? (
              <button className="btn btn-outline-danger mx-1" onClick={handleLogout}>
                Logout
              </button>
            ) : (
              <>
                <button
                  className="btn btn-outline-success mx-1"
                  onClick={handleLoginClick}
                >
                  Login
                </button>
                <button
                  className="btn btn-outline-success mx-1"
                  onClick={handleSignupClick}
                >
                  Signup
                </button>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

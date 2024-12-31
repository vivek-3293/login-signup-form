import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { FaUserCircle } from "react-icons/fa";

const Navbar = () => {
  const { auth, handleLogout } = useContext(AuthContext); 
  const [searchTerm, setSearchTerm] = useState("");
  const [isProfileOpen, setIsProfileOpen] = useState(false);
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

  const toggleProfileMenu = () => {
    setIsProfileOpen(!isProfileOpen);
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container">
        <h4 className="mx-3">Library System</h4>

        <div className="collapse navbar-collapse">
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/">
                Home
              </Link>
            </li>
            {auth?.role === "admin" && (
              <li className="nav-item">
                <Link className="nav-link" to="/members">
                  All Members
                </Link>
              </li>
            )}
          </ul>

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
          {auth ? (
            <div className="d-flex align-items-center position-relative">
              {/* Profile Icon */}
              <FaUserCircle
                size={30}
                className="cursor-pointer mx-2"
                onClick={toggleProfileMenu}
              />

              {/* Dropdown Menu */}
              {isProfileOpen && (
                <div
                  className="position-absolute bg-white shadow rounded"
                  style={{
                    top: "42px",
                    right: "0",
                    zIndex: "1000",
                    minWidth: "175px",
                    padding: "10px",
                  }}
                >
                  <ul className="navbar-nav d-flex flex-column">
                   
                      <li className="nav-item">
                        <Link className="nav-link" to="">
                          Profile
                        </Link>
                      </li>
                    

                    <button
                      className="btn btn-outline-danger mt-2 text-center"
                      onClick={handleLogout} 
                    >
                      Logout
                    </button>
                  </ul>
                </div>
              )}
            </div>
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
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

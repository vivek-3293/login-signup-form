import React, { useState, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import { AuthContext } from "../../context/AuthContext";
import ProfileUpdateModal from "./ProfileUpdateModal ";

const Navbar = () => {
  const { auth, handleLogout } = useContext(AuthContext);
  const [searchTerm, setSearchTerm] = useState("");
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [selectedMember, setSelectedMember] = useState(null);
  
  const navigate = useNavigate();

  const toggleProfileMenu = (e) => {
    e.stopPropagation();
    setIsProfileOpen(!isProfileOpen);
  };

  const handleLogoutClick = () => {
    handleLogout();
    setIsProfileOpen(false);
  };
  const handleProfileClick = () => {
    setShowUpdateModal(true);
    setSelectedMember(auth.role);
  };

  const handleCloseModal = () => {
    setShowUpdateModal(false);
    setSelectedMember(null);
    setIsProfileOpen(false);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/search?q=${searchTerm}`);
      setSearchTerm("");
    } else {
      navigate("/");
    }
  };

  const handleLoginClick = () => {
    navigate("/login");
  };

  const handleSignupClick = () => {
    navigate("/signup");
  };

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (
        !e.target.closest(".profile-menu") &&
        !e.target.closest(".profile-icon")
      ) {
        setIsProfileOpen(false);
      }
    };
    if (isProfileOpen) {
      window.addEventListener("click", handleOutsideClick);
    }
    return () => {
      window.removeEventListener("click", handleOutsideClick);
    };
  }, [isProfileOpen]);

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
            {auth?.role?.role === "member" && (
              <li className="nav-item">
                <Link className="nav-link" to="/borrow-history">
                  BorrowHistory
                </Link>
              </li>
            )}
            {auth?.role?.role === "admin" && (
              <li className="nav-item">
                <Link className="nav-link" to="/admin-dashboard">
                  AdminDashboard
                </Link>
              </li>
            )}
          </ul>
          <form className="d-flex" onSubmit={handleSearch}>
            <input
              className="form-control w-100"
              type="search"
              placeholder="Search Books"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button className="btn btn-outline-success mx-2" type="submit">
              Search
            </button>
          </form>
          {auth ? (
            <div className="d-flex align-items-center position-relative">
              <FaUserCircle
                size={30}
                className="cursor-pointer mx-2"
                onClick={toggleProfileMenu}
              />
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
                  <ul className="navbar-nav d-flex flex-column my-2">
                    <li className="nav-item">
                      <button
                        className="btn btn-outline-primary text-center"
                        onClick={handleProfileClick}
                      >
                        Update Profile
                      </button>
                    </li>
                    <button
                      className="btn btn-outline-danger mt-4 text-center"
                      onClick={handleLogoutClick}
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

      {showUpdateModal && (
        <ProfileUpdateModal
          memberData={selectedMember}
          onClose={handleCloseModal}
        />
      )}
    </nav>
  );
};

export default Navbar;

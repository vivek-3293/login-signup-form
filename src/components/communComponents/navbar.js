import React, { useState, useContext } from "react";
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

  const toggleProfileMenu = () => {
    setIsProfileOpen(!isProfileOpen); 
  };

  const handleProfileClick = () => {
    setShowUpdateModal(true); 
    setSelectedMember(auth);
  };

  const handleCloseModal = () => {
    setShowUpdateModal(false); 
     setSelectedMember(null);
  };

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
        <h4 className="mx-3">Library System</h4>

        <div className="collapse navbar-collapse">
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/">
                Home
              </Link>
            </li>
            {auth?.role === "member" && (
            <li className="nav-item">
              <Link className="nav-link" to="/borrow-history">
                BorrowHistory
              </Link>
            </li>
             )}
            {auth?.role === "admin" && (
              <li className="nav-item">
                <Link className="nav-link" to="/admin-dashboard">
                  AdminDashboard
                </Link>
              </li>
            )}
          </ul>

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

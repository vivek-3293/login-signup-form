import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
  const { auth, handleLogout } = useContext(AuthContext);
  const isAdmin = auth?.role === "admin";

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container">
        <Link className="navbar-brand" to="/">
          Library System
        </Link>
        <div className="collapse navbar-collapse">
          <ul className="navbar-nav ms-auto">
            {auth.token ? (
              <>
                {isAdmin && <Link className="nav-link" to="/admin">Admin Dashboard</Link>}
                {!isAdmin && <Link className="nav-link" to="/member">My Dashboard</Link>}
                <button className="btn btn-danger" onClick={handleLogout}>
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link className="nav-link" to="/">Login</Link>
                <Link className="nav-link" to="/signup">Signup</Link>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

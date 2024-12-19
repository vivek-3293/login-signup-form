import React, { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
  const { auth, handleLogout } = useContext(AuthContext);
  const isAdmin = auth?.role === "admin";

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container">
        <h2> Library System</h2>

        <div className="collapse navbar-collapse">
          <ul className="navbar-nav ms-auto">
            {auth.token ? (
              <>
                {isAdmin && (
                  <NavLink className="nav-link" to="/admin">
                    Add Book
                  </NavLink>
                )}
                <button className="btn btn-danger" onClick={handleLogout}>
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link className="nav-link" to="/login">
                  Login
                </Link>
                <Link className="nav-link" to="/signup">
                  Signup
                </Link>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

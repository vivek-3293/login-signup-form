import React from "react";
import { Link } from "react-router-dom";

const AdminDashboard = () => {
  return (
    <div>
      <h2>Admin Dashboard</h2>

      <Link className="nav-link" to="/members">
        All Members
      </Link>
      
      
    </div>
  );
};

export default AdminDashboard;

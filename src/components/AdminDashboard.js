import React from "react";
import { Link } from "react-router-dom";

const AdminDashboard = () => {
  return (
    <div>
      <h2>Admin Dashboard</h2>

      <Link className="nav-link" to="/members">
        AllMembers
      </Link>
      
      <Link className="nav-link" to="/admin-history">
        AllMemberBorrowHistory
      </Link>
      <Link className="nav-link" to="/overdue-history">
        OverDueHistory
      </Link>
    </div>
  );
};

export default AdminDashboard;

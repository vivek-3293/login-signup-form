import React from "react";
import { Link } from "react-router-dom";

const AdminDashboard = () => {
  return (
    <div className="py-3">
      <h2 className="py-5 text-center">Admin Dashboard</h2>

      <Link className="nav-link text-center" to="/members">
        AllMembers
      </Link>
      
      <Link className="nav-link text-center" to="/admin-history">
        AllMemberBorrowHistory
      </Link>
      <Link className="nav-link text-center" to="/overdue-history">
        OverDueHistory
      </Link>
    </div>
  );
};

export default AdminDashboard;

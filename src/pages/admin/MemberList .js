import React, { useEffect, useState, useCallback } from "react";
import { AuthContext, useAuth } from "../../context/AuthContext";
import { adminToggle, getAllMembers } from "../../services/urlService";
import { patch, post } from "../../services/api";
import "../../styles/memberTable.css";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import ProfileUpdateModal from "../../components/communComponents/ProfileUpdateModal ";

const MemberList = () => {
  const { auth } = useAuth(AuthContext);
  const [members, setMembers] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [selectedMember, setSelectedMember] = useState(null);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const navigate = useNavigate();
  const limit = 15;

  const fetchMembers = async () => {
    if (loading || !hasMore) return;
    setLoading(true);

    try {
      const response = await post(getAllMembers(), {
        page,
        limit,
        search: "",
      });

      if (response?.members) {
        setMembers((prevMembers) => [
          ...prevMembers,
          ...response.members.filter(
            (newMember) =>
              !prevMembers.some((member) => member._id === newMember._id)
          ),
        ]);
        if (response.members.length < limit) {
          setHasMore(false);
        }
      }
    } catch (error) {
      toast.error(error.response?.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMembers();
  }, [page]);

  const handleScroll = useCallback(() => {
    if (
      window.innerHeight + document.documentElement.scrollTop >=
      document.documentElement.offsetHeight - 100
    ) {
      if (hasMore && !loading) {
        setPage((prevPage) => prevPage + 1);
      }
    }
  }, [hasMore, loading]);

  useEffect(() => {
    let timeout;
    const handleScrollWithMemberList = () => {
      clearTimeout(timeout);
      timeout = setTimeout(handleScroll, 200);
    };
    window.addEventListener("scroll", handleScrollWithMemberList);
    return () => {
      clearTimeout(timeout);
      window.removeEventListener("scroll", handleScrollWithMemberList);
    };
  }, [handleScroll]);

  const handleUpdateUser = (member) => {
    setSelectedMember(member);
    setShowUpdateModal(true);
  };

  const handleUpdateSuccess = (updatedMember) => {
    setMembers((prevMembers) =>
      prevMembers.map((member) =>
        member._id === updatedMember._id ? updatedMember : member
      )
    );
  };

  const handleCloseModal = () => {
    setShowUpdateModal(false);
    setSelectedMember(null);
  };

  const handleAddMember = () => {
    navigate("/add-member", { state: { isAddMember: true } });
  };

  const handleToggleRole = async (memberId, currentRole) => {
    try {
      const newRole = currentRole === "admin" ? "member" : "admin";
      const response = await patch(adminToggle(), {
        userId: memberId,
        role: newRole,
      });

      if (response?.message) {
        toast.success(!response.message);
        setMembers((prevMembers) =>
          prevMembers.map((member) =>
            member._id === memberId ? { ...member, role: newRole } : member
          )
        );
      }
    } catch (error) {
      toast.error(error.response?.data?.message);
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Member List</h2>

      {auth.role?.role === "admin" && (
        <button onClick={handleAddMember} className="btn btn-primary my-3 rounded-pill">
          Add Member
        </button>
      )}

      <table className="table table-bordered table-hover">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Address</th>
            <th>Role</th>
            <th>Status</th>
            {auth.role?.role === "admin" && <th>Actions</th>}
            {auth.role?.role === "admin" && <th>Admin Check</th>}
          </tr>
        </thead>
        <tbody>
          {members.map((member) => (
            <tr key={member._id}>
              <td>{member.name}</td>
              <td>{member.email}</td>
              <td>{member.phone}</td>
              <td>{member.address}</td>
              <td>{member.role}</td>
              <td>{member.status}</td>
              {auth.role?.role === "admin" && (
                <td>
                  <button
                    onClick={() => handleUpdateUser(member)}
                    className="btn btn-warning btn-sm me-2 p-2 rounded-pill"
                  >
                    Update User
                  </button>
                </td>
              )}
              {auth.role?.role === "admin" && (
                <td>
                  <input
                    type="checkbox"
                    checked={member.role === "admin"}
                    onChange={() => handleToggleRole(member._id, member.role)}
                  />
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>

      {loading && <p className="text-center">loading...</p>}

      {showUpdateModal && (
        <ProfileUpdateModal
          memberData={selectedMember}
          onClose={handleCloseModal}
          onUpdateSuccess={handleUpdateSuccess}
        />
      )}
    </div>
  );
};

export default MemberList;

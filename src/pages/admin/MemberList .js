import React, { useEffect, useState } from "react";
import { AuthContext, useAuth } from "../../context/AuthContext";
import {
  adminToggle,
  getAllMembers,
  getMemberById,
  updateMember,
} from "../../services/UrlService";
import { get, patch, post, put } from "../../services/Api";
import "../../styles/memberTable.css";
import { useNavigate } from "react-router-dom";
// import ProfileUpdateModal from "../../components/communComponents/ProfileUpdateModal ";
import { toast } from "react-toastify";

const MemberList = () => {
  const { auth } = useAuth(AuthContext);
  const [members, setMembers] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [selectedMember, setSelectedMember] = useState(null);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const navigate = useNavigate();

  const fetchMembers = async () => {
    if (loading) return;
    setLoading(true);

    try {
      const response = await post(getAllMembers(), {
        page,
        limit: 15,
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
        if (response.members.length < 15) {
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

  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop >=
      document.documentElement.offsetHeight - 50
    ) {
      if (hasMore && !loading) {
        setPage((prevPage) => prevPage + 1);
      }
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [hasMore, loading]);

  const fetchSingleMember = async (memberId) => {
    try {
      const response = await get(getMemberById(memberId));

      if (response?.member) {
        setSelectedMember(response.member);
        setShowUpdateModal(true);
      } else {
        toast.error(response?.message);
      }
    } catch (error) {
      toast.error(error?.message);
    }
  };

  useEffect(() => {
    if (selectedMember) {
      setMembers((prevMembers) =>
        prevMembers.map((member) =>
          member._id === selectedMember._id ? selectedMember : member
        )
      );
    }
  }, [selectedMember]);

  const handleUpdateMember = async (e) => {
    e.preventDefault();
    try {
      const { _id, email, membershipId, createdAt, ...updateData } =
        selectedMember;
      const response = await put(updateMember(_id), updateData);

      if (response?.member) {
        setSelectedMember(response.member);
      }
      toast.success(response?.message);
      handleCloseModal();
      navigate("/members");
    } catch (error) {
      toast.error(error?.message);
    }
  };

  const fields = ["name", "email", "phone", "address", "role", "status"];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSelectedMember((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleUpdateUser = (memberId) => {
    fetchSingleMember(memberId);
    setShowUpdateModal(true);
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
        toast.success(response.message);
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
        <button onClick={handleAddMember} className="btn btn-primary my-3">
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
                    onClick={() => handleUpdateUser(member._id)}
                    className="btn btn-warning btn-sm me-2"
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
      {!hasMore && (
        <p className="text-center mt-4">
          <b>All Member Are Loaded.</b>
        </p>
      )}

      {showUpdateModal && selectedMember && (
        <div className="modal show d-block">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Update Member</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={handleCloseModal}
                ></button>
              </div>
              <div className="modal-body">
                <form>
                  {fields.map((field) => (
                    <div className="mb-3" key={field}>
                      <label className="form-label">
                        {field.charAt(0).toUpperCase() + field.slice(1)}
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        name={field}
                        value={selectedMember[field] || ""}
                        onChange={handleChange}
                        disabled={field === "email"}
                      />
                    </div>
                  ))}
                </form>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handleUpdateMember}
                >
                  Update
                </button>
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={handleCloseModal}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/*{showUpdateModal && selectedMember && (
        <ProfileUpdateModal
          memberData={selectedMember}
          onClose={handleCloseModal}
          onUpdateSuccess={handleUpdateSuccess}
        />
      )} */}
    </div>
  );
};

export default MemberList;

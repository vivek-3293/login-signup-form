import React, { useEffect, useState } from "react";
import { AuthContext, useAuth } from "../context/AuthContext";
import { getAllMembers, updateMember } from "../services/UrlService";
import { get, put } from "../services/Api";
import "../styles/memberTable.css";
import { useNavigate } from "react-router-dom";
import UpdateMemberModal from "../components/UpdateMemberModal";
import { toast } from "react-toastify";


const MemberList = () => {
  const { auth } = useAuth(AuthContext);
  const [members, setMembers] = useState([]);
  const navigate = useNavigate();
  const [selectedMember, setSelectedMember] = useState(null);
  const [showUpdateModal, setShowUpdateModal] = useState(false);

  const fetchMembers = async () => {
    const response = await get(getAllMembers());
    if (response?.members) {
      setMembers(response.members);
    }
  };

  useEffect(() => {
    fetchMembers();
  }, []);

  const handleUpdateMember = (member) => {
    setSelectedMember(member);
    setShowUpdateModal(true);
  };

  const handleCloseModal = () => {
    setShowUpdateModal(false);
    setSelectedMember(null);
  };

  const handleUpdate = async (updatedData) => {
    try {
      const response = await put(updateMember(selectedMember._id), updatedData);
      fetchMembers();
      setShowUpdateModal(false);
      toast.success(response?.message);
    } catch (error) {
      toast.error("Failed to update member", error);
    }
  };

  // Add member handler
  const handleAddMember = () => {
    navigate("/signup", { state: { isAddMember: true } });
  };

  // View member handler
  const handleViewMember = (id) => {
    navigate(`/member/${id}`);
  };
 

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">MemberList</h2>

      {/* Add Member Form */}

      {auth.role === "admin" && (
        <button onClick={handleAddMember} className="btn btn-primary my-3">
          Add Member
        </button>
      )}

      {/* Member Table */}
      <div className="table-responsive">
        <table className="table table-bordered table-hover">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Address</th>
              <th>Role</th>
              <th>Status</th>
              {auth.role === "admin" && <th>Actions</th>}
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
                {auth.role === "admin" && (
                  <td>
                    <button
                      onClick={() => handleUpdateMember(member)}
                      className="btn btn-warning btn-sm me-2"
                    >
                      Update
                    </button>
                    <button
                      onClick={() => handleViewMember(member._id)}
                      className="btn btn-info btn-sm mx-2"
                    >
                      View
                    </button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showUpdateModal && (
        <UpdateMemberModal
          memberData={selectedMember}
          onClose={handleCloseModal}
          onUpdate={handleUpdate}
        />
      )}
    </div>
  );
};

export default MemberList;

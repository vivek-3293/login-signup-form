import React, { useEffect, useState } from "react";
import { AuthContext, useAuth } from "../../context/AuthContext";
import { getAllMembers } from "../../services/UrlService";
import { get } from "../../services/Api";
import "../../styles/memberTable.css";
import { useNavigate } from "react-router-dom";
import ProfileUpdateModal from "../../components/communComponents/ProfileUpdateModal ";

const MemberList = () => {
  const { auth } = useAuth(AuthContext);
  const [members, setMembers] = useState([]);
  const [selectedMember, setSelectedMember] = useState(null);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const navigate = useNavigate();

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

  const handleAddMember = () => {
    navigate("/signup", { state: { isAddMember: true } });
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Member List</h2>

      {auth.role === "admin" && (
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
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>

      {showUpdateModal && (
        <ProfileUpdateModal
          memberData={selectedMember}
          onClose={handleCloseModal}
          onUpdateSuccess={fetchMembers}
        />
      )}
    </div>
  );
};

export default MemberList;

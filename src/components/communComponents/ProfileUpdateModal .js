import React, { useState, useEffect } from "react";
import { put } from "../../services/Api";
import { toast } from "react-toastify";
import { updateMember } from "../../services/UrlService";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

const ProfileUpdateModal = ({ memberData, onClose, onUpdateSuccess }) => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
    role: "",
    status: "",
  });
  const [isFormChanged, setIsFormChanged] = useState(false);
  const navigate = useNavigate();
  const { handleLogout, auth } = useContext(AuthContext);

  useEffect(() => {
    if (memberData) {
      setFormData({
        name: memberData?.role?.name || "",
        phone: memberData?.role?.phone || "",
        address: memberData?.role?.address || "",
        role: memberData?.role?.role || "",
        status: memberData?.role?.status || "",
      });

      setIsFormChanged(false);
    }
  }, [memberData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      const updatedData = {
        ...prev,
        [name]: value,
      };
      setIsFormChanged(
        JSON.stringify(updatedData) !== JSON.stringify(formData)
      );
      return updatedData;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await put(updateMember(memberData?.role._id), formData);
      if (response.code === "access_denied") {
        handleLogout();
      }
      toast.success(response?.message);
      const updatedData = {
        ...formData,
      };
      setFormData(updatedData);

      onUpdateSuccess?.(memberData);

      navigate(auth?.role?.role === "admin" ? "/members" : "/");
      onClose();
    } catch (error) {
      toast.error(error?.message || "Error updating profile.");
    }
  };

  return (
    <div className="modal show" style={{ display: "block" }}>
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Update Profile</h5>
            <button className="btn-close" onClick={onClose}></button>
          </div>
          <div className="modal-body">
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label">Name</label>
                <input
                  type="text"
                  className="form-control"
                  name="name"
                  value={formData.name || ""}
                  onChange={handleChange}
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Phone</label>
                <input
                  type="tel"
                  className="form-control"
                  name="phone"
                  value={formData.phone || ""}
                  onChange={handleChange}
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Address</label>
                <input
                  type="text"
                  className="form-control"
                  name="address"
                  value={formData.address || ""}
                  onChange={handleChange}
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Role</label>
                <select
                  className="form-control"
                  name="role"
                  value={formData.role || "member"}
                  onChange={handleChange}
                  disabled={memberData?.role?.role === "member"}
                >
                  <option value="member">Member</option>
                  <option value="admin">Admin</option>
                </select>
              </div>

              <div className="mb-3">
                <label className="form-label">Status</label>
                <select
                  className="form-control"
                  name="status"
                  value={formData.status || "active"}
                  onChange={handleChange}
                  disabled={memberData?.role?.role === "member"}
                >
                  <option value="active">Active</option>
                  <option value="inactive">Suspend</option>
                </select>
              </div>

              <div className="d-flex justify-content-between">
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={!isFormChanged}
                >
                  Update
                </button>
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={onClose}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileUpdateModal;

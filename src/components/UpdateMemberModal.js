import React, { useState, useEffect } from "react";

const UpdateMemberModal = ({ memberData, onClose, onUpdate }) => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
    role: "",
    status: "",
  });

  useEffect(() => {
    if (memberData) {
      setFormData({
        name: memberData.name || "",
        phone: memberData.phone || "",
        address: memberData.address || "",
        role: memberData.role || "",
        status: memberData.status || "",
      });
    }
  }, [memberData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const isFormChanged = () => {
    return (
      formData.name !== memberData.name ||
      formData.phone !== memberData.phone ||
      formData.address !== memberData.address ||
      formData.role !== memberData.role ||
      formData.status !== memberData.status
    );
  };

  const handleUpdate = () => {
    const updatedData = {
      ...formData,
      phone: formData.phone.toString(),
    };
    onUpdate(updatedData);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h3>Update Member</h3>

        <form className="mb-4">
          <div className="row">
            <div className="col-12 col-md-6 mb-3">
              <label>Name:</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="form-control"
              />
            </div>
            <div className="col-12 col-md-6 mb-3">
              <label>Phone:</label>
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="form-control"
              />
            </div>
            <div className="col-12 mb-3">
              <label>Address:</label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                className="form-control"
              />
            </div>
            <div className="col-12 col-md-6 mb-3">
              <label>Role:</label>
              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="form-control"
              >
                <option value="admin">Admin</option>
                <option value="member">Member</option>
              </select>
            </div>
            <div className="col-12 col-md-6 mb-3">
              <label>Status:</label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="form-control"
              >
                <option value="active">Active</option>
                <option value="inactive">Suspend</option>
              </select>
            </div>
          </div>
        </form>

        <div className="modal-buttons">
          <button
            onClick={handleUpdate}
            disabled={!isFormChanged()}
            className="btn btn-primary"
          >
            Update
          </button>
          <button onClick={onClose} className="btn btn-secondary mx-4">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpdateMemberModal;

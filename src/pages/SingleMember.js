import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getMemberById } from "../services/UrlService";
import { get } from "../services/Api";

const SingleMember = () => {
  const { id } = useParams();
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
  });

  useEffect(() => {
    const fetchMember = async () => { 
      try {
        const response = await get(getMemberById(id));
        if (response?.member) {
          setFormData({
            name: response.member.name,
            email: response.member.email,
            phone: response.member.phone,
            address: response.member.address,
            role: response.member.role,
            status: response.member.status,
          });
        } else {
          setError("Member not found");
        }
      } catch (err) {
        setError("Failed to fetch member details");
      }
    };

    fetchMember();
  }, [id]);

  if (error) {
    return (
      <div className="container mt-4">
        <h3 className="text-danger">{error}</h3>
        <button
          onClick={() => navigate("/members")}
          className="btn btn-secondary mt-3"
        >
          Back to Members List
        </button>
      </div>
    );
  }

//   if (!member) {
//     return <div className="container mt-4">Loading...</div>;
//   }

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Member Details</h2>
      <div className="card shadow p-4">
        <p>
          <strong>Name:</strong> {formData.name}
        </p>
        <p>
          <strong>Email:</strong> {formData.email}
        </p>
        <p>
          <strong>Phone:</strong> {formData.phone}
        </p>
        <p>
          <strong>Address:</strong> {formData.address}
        </p>
        <p>
          <strong>Role:</strong> {formData.role}
        </p>
        <p>
          <strong>Status:</strong> {formData.status}
        </p>
       
        <button
          onClick={() => navigate("/members")}
          className="btn btn-primary mt-3"
        >
          Back to Members List
        </button>
      </div>
    </div>
  );
};

export default SingleMember;

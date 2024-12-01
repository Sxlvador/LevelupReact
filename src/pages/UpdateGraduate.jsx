import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../components/navbar";

const UpdateGraduate = () => {
  const { id } = useParams(); // Get the graduate ID from the URL
  const navigate = useNavigate(); // For programmatic navigation
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    address: "",
    phoneNumber: "",
    age: "",
    dateOfBirth: "",
  });
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  // Fetch graduate details on component load
  useEffect(() => {
    const fetchGraduate = async () => {
      try {
        const response = await fetch(`http://localhost:5216/api/Graduates/${id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch graduate details");
        }
        const data = await response.json();
        setFormData({
          firstName: data.firstName || "",
          lastName: data.lastName || "",
          email: data.email || "",
          address: data.address || "",
          phoneNumber: data.phoneNumber || "",
          age: data.age || "",
          dateOfBirth: data.dateOfBirth ? data.dateOfBirth.split("T")[0] : "",
        });
      } catch (err) {
        setError(err.message || "An error occurred");
      }
    };

    fetchGraduate();
  }, [id]);

  // Handle input change
  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    try {
      const response = await fetch(`http://localhost:5216/api/Graduates/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to update graduate details");
      }

      setSuccess("Graduate updated successfully!");
      setTimeout(() => navigate("/viewall"), 2000); // Redirect after success
    } catch (err) {
      setError(err.message || "An error occurred");
    }
  };

  return (
    <div>
      <Navbar />
      <div className="max-w-xl mx-auto mt-6 p-6 bg-white shadow-md rounded-lg">
        <h2 className="text-2xl font-semibold text-center mb-6">Update Graduate</h2>
        {error && <p className="text-red-600 text-center mb-4">{error}</p>}
        {success && <p className="text-green-600 text-center mb-4">{success}</p>}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            name="firstName"
            placeholder="First Name"
            value={formData.firstName}
            onChange={handleInputChange}
            required
            className="border border-gray-300 rounded p-2"
          />
          <input
            type="text"
            name="lastName"
            placeholder="Last Name"
            value={formData.lastName}
            onChange={handleInputChange}
            required
            className="border border-gray-300 rounded p-2"
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleInputChange}
            required
            className="border border-gray-300 rounded p-2"
          />
          <input
            type="text"
            name="address"
            placeholder="Address"
            value={formData.address}
            onChange={handleInputChange}
            required
            className="border border-gray-300 rounded p-2"
          />
          <input
            type="text"
            name="phoneNumber"
            placeholder="Phone Number"
            value={formData.phoneNumber}
            onChange={handleInputChange}
            required
            className="border border-gray-300 rounded p-2"
          />
          <input
            type="number"
            name="age"
            placeholder="Age"
            value={formData.age}
            onChange={handleInputChange}
            required
            className="border border-gray-300 rounded p-2"
          />
          <input
            type="date"
            name="dateOfBirth"
            placeholder="Date of Birth"
            value={formData.dateOfBirth}
            onChange={handleInputChange}
            required
            className="border border-gray-300 rounded p-2"
          />
          <button
            type="submit"
            class="bg-[#22ff1e]"          >
          
            Update Graduate
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateGraduate;

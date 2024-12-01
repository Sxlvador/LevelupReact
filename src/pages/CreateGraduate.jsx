import React, { useState, useEffect } from "react";
import Navbar from "../components/navbar";

const CreateGraduate = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    address: "",
    phoneNumber: "",
    age: "", // This will be calculated
    dateOfBirth: "",
  });
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (formData.dateOfBirth) {
      const dob = new Date(formData.dateOfBirth);
      const today = new Date();
      if (dob > today) {
        setError("Date of birth cannot be today's date or a future date.");
        setFormData((prevData) => ({
          ...prevData,
          age: "", // Clear age if date is invalid
        }));
      } else {
        setError("");
        const calculateAge = (dob) => {
          const birthDate = new Date(dob);
          const today = new Date();
          let age = today.getFullYear() - birthDate.getFullYear();
          const monthDifference = today.getMonth() - birthDate.getMonth();
          if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
            age--;
          }
          return age;
        };

        setFormData((prevData) => ({
          ...prevData,
          age: calculateAge(formData.dateOfBirth),
        }));
      }
    }
  }, [formData.dateOfBirth]);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (error) {
      alert("Please fix the errors before submitting.");
      return;
    }
    setError("");
    setSuccess("");
    try {
      const response = await fetch("http://localhost:5216/api/Graduates", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to create graduate");
      }

      const data = await response.json();
      setSuccess("Graduate created successfully!");
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        address: "",
        phoneNumber: "",
        age: "", // Reset age after submission
        dateOfBirth: "",
      });
    } catch (err) {
      setError(err.message || "An error occurred");
    }
  };

  return (
    <div>
      <Navbar />
      <div className="max-w-xl mx-auto mt-6 p-6 bg-white shadow-md rounded-lg">
        <h2 className="text-2xl font-semibold text-center mb-6">Create Graduate</h2>
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
            type="date"
            name="dateOfBirth"
            placeholder="Date of Birth"
            value={formData.dateOfBirth}
            onChange={handleInputChange}
            required
            className="border border-gray-300 rounded p-2"
          />
          <input
            type="text"
            name="age"
            placeholder="Age"
            value={formData.age}
            readOnly
            className="border border-gray-300 rounded p-2 bg-gray-200"
          />
          {error && <p className="text-red-600 text-center">{error}</p>}
          <button
            type="submit"
            className="bg-[#545651] text-white font-semibold px-4 py-2 rounded-lg"
            disabled={!!error} // Disable button if there's an error
          >
            Create Graduate
          </button>
          {success && <p className="text-green-600 text-center">{success}</p>}
        </form>
      </div>
    </div>
  );
};

export default CreateGraduate;

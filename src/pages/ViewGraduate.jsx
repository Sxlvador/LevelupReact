import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../components/navbar";

const ViewGraduate = () => {
  const { id } = useParams(); // Get the graduate ID from the URL
  const navigate = useNavigate(); // For programmatic navigation
  const [graduate, setGraduate] = useState(null);
  const [error, setError] = useState("");

  // Fetch graduate details
  useEffect(() => {
    const fetchGraduate = async () => {
      try {
        const response = await fetch(`http://localhost:5216/api/Graduates/${id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch graduate details");
        }
        const data = await response.json();
        setGraduate(data);
      } catch (err) {
        setError(err.message || "An error occurred");
      }
    };

    fetchGraduate();
  }, [id]);

  // Delete graduate handler
  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      `Are you sure you want to delete ${graduate?.firstName} ${graduate?.lastName}?`
    );

    if (confirmDelete) {
      try {
        const response = await fetch(`http://localhost:5216/api/Graduates/${id}`, {
          method: "DELETE",
        });

        if (!response.ok) {
          throw new Error("Failed to delete graduate");
        }

        alert("Graduate deleted successfully!");
        navigate("/viewall"); // Redirect to the list of graduates after deletion
      } catch (err) {
        setError(err.message || "An error occurred while deleting the graduate");
      }
    }
  };

  return (
    <div>
      <Navbar />
      <div className="max-w-xl mx-auto mt-6 p-6 bg-white shadow-md rounded-lg">
        <h2 className="text-2xl font-semibold text-center mb-6">Graduate Details</h2>
        {error && (
          <p className="text-red-600 text-center mb-4">{error}</p>
        )}
        {graduate ? (
          <div className="flex flex-col gap-4">
            <div>
              <strong>First Name:</strong> {graduate.firstName}
            </div>
            <div>
              <strong>Last Name:</strong> {graduate.lastName}
            </div>
            <div>
              <strong>Email:</strong> {graduate.email}
            </div>
            <div>
              <strong>Phone Number:</strong> {graduate.phoneNumber}
            </div>
            <div>
              <strong>Address:</strong> {graduate.address}
            </div>
            <div>
              <strong>Age:</strong> {graduate.age}
            </div>
            <div>
              <strong>Date of Birth:</strong> {new Date(graduate.dateOfBirth).toLocaleDateString()}
            </div>
            <div className="flex justify-between mt-6">
              {/* Edit (Update) Button */}
              <button
                onClick={() => navigate(`/update/${id}`)}
                class="bg-[#ffbf29]"          >
              
                Edit
              </button>
              {/* Delete Button */}
              <button
                onClick={handleDelete}
                class="bg-[#ff0f0f]"          >

              
                Delete
              </button>
            </div>
          </div>
        ) : (
          <p className="text-center">Loading graduate details...</p>
        )}
      </div>
    </div>
  );
};

export default ViewGraduate;

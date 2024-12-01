import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/navbar";

const ViewAllGraduates = () => {
  const [graduates, setGraduates] = useState([]);
  const [error, setError] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [graduateToDelete, setGraduateToDelete] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchGraduates = async () => {
      try {
        const response = await fetch("http://localhost:5216/api/Graduates");
        if (!response.ok) {
          throw new Error("Failed to fetch graduates");
        }
        const data = await response.json();
        setGraduates(data);
      } catch (err) {
        setError(err.message || "An error occurred");
      }
    };

    fetchGraduates();
  }, []);

  const handleDelete = async () => {
    if (!graduateToDelete) return;

    try {
      const response = await fetch(
        `http://localhost:5216/api/Graduates/${graduateToDelete.id}`,
        { method: "DELETE" }
      );

      if (!response.ok) {
        throw new Error("Failed to delete graduate");
      }

      alert("Graduate deleted successfully!");
      setGraduates((prev) =>
        prev.filter((graduate) => graduate.id !== graduateToDelete.id)
      );
      setIsModalOpen(false);
      setGraduateToDelete(null);
    } catch (err) {
      setError(err.message || "An error occurred while deleting the graduate");
    }
  };

  const openDeleteModal = (graduate) => {
    setGraduateToDelete(graduate);
    setIsModalOpen(true);
  };

  return (
    <div>
      <Navbar />
      <section className="md:px-12 px-4 mt-6">
        {error && (
          <div className="text-red-500 text-center mb-4">{error}</div>
        )}
        <table className="w-full border border-white md:rounded-t-xl rounded-t-lg overflow-hidden">
          <thead className="bg-white uppercase text-black text-lg">
            <tr>
              <th className="md:rounded-s-xl rounded-s-lg md:py-2 py-1 md:px-8 px-4">
                Full Name
              </th>
              <th className="md:py-2 py-1 md:px-8 px-4">Contact Details</th>
              <th className="md:rounded-e-xl rounded-e-lg md:py-2 py-1 md:px-8 px-4">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="text-white">
            {graduates.length > 0 ? (
              graduates.map((graduate) => (
                <tr
                  key={graduate.id}
                  className="bg-gray-800 border-b border-gray-600"
                >
                  <td className="md:py-4 py-2 md:px-8 px-4">
                    {graduate.firstName} {graduate.lastName}
                  </td>
                  <td className="md:py-4 py-2 md:px-8 px-4">
                    Email: {graduate.email}
                    <br />
                    Phone: {graduate.phoneNumber}
                  </td>
                  <td className="md:py-4 py-2 md:px-8 px-4">
                    <Link
                      to={`/customer/${graduate.id}`}
                      style={{
                        color: "#FFA500",
                        fontWeight: "bold",
                        padding: "0.5rem 1.5rem",
                        borderRadius: "9999px",
                        border: "2px solid #FFA500",
                        backgroundColor: "transparent",
                        cursor: "pointer",
                        marginRight: "0.5rem",
                        display: "inline-block",
                      }}
                    >
                      View
                    </Link>
                    <Link
                      to={`/update/${graduate.id}`}
                      style={{
                        color: "#28a745",
                        fontWeight: "bold",
                        padding: "0.5rem 1.5rem",
                        borderRadius: "9999px",
                        border: "2px solid #28a745",
                        backgroundColor: "transparent",
                        cursor: "pointer",
                        marginRight: "0.5rem",
                        display: "inline-block",
                      }}
                    >
                      Update
                    </Link>
                    <button
                      onClick={() => openDeleteModal(graduate)}
                      style={{
                        color: "#dc2626",
                        fontWeight: "bold",
                        padding: "0.5rem 1.5rem",
                        borderRadius: "9999px",
                        border: "2px solid #dc2626",
                        backgroundColor: "transparent",
                        cursor: "pointer",
                        display: "inline-block",
                      }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" className="text-center text-white md:py-4 py-2">
                  No graduates found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </section>

      {/* Modal */}
      {isModalOpen && graduateToDelete && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              backgroundColor: "#e5f3d9",
              padding: "2rem",
              borderRadius: "8px",
              textAlign: "center",
              boxShadow: "0 10px 15px rgba(0, 0, 0, 0.3)",
            }}
          >
            <h2
              style={{
                fontSize: "1.25rem",
                fontWeight: "bold",
                marginBottom: "1rem",
              }}
            >
              DELETE GRADUATE
            </h2>
            <p style={{ marginBottom: "1.5rem", fontSize: "1rem" }}>
              DELETE <strong>{graduateToDelete.firstName} {graduateToDelete.lastName}</strong>?
            </p>
            <div style={{ display: "flex", justifyContent: "center", gap: "1rem" }}>
              <button
                onClick={handleDelete}
                style={{
                  color: "#dc2626",
                  fontWeight: "bold",
                  padding: "0.5rem 1.5rem",
                  borderRadius: "9999px",
                  border: "2px solid #dc2626",
                  backgroundColor: "transparent",
                  cursor: "pointer",
                  marginRight: "0.5rem",
                }}
              >
                DELETE
              </button>
              <button
                onClick={() => setIsModalOpen(false)}
                style={{
                  color: "#16a34a",
                  fontWeight: "bold",
                  padding: "0.5rem 1.5rem",
                  borderRadius: "9999px",
                  border: "2px solid #16a34a",
                  backgroundColor: "transparent",
                  cursor: "pointer",
                }}
              >
                CANCEL
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewAllGraduates;

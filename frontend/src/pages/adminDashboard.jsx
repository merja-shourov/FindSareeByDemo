import React, { useState, useEffect } from "react";
import { useAuth } from "../utils/AuthContext";
import { useNavigate, Link } from "react-router";

const AdminDashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [rentals, setRentals] = useState([]);
  const [sarees, setSarees] = useState([]);
  const [activeTab, setActiveTab] = useState("users"); // 'users', 'rentals', or 'sarees'
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [editingUser, setEditingUser] = useState(null);
  const [editForm, setEditForm] = useState({ name: "", email: "", isAdmin: false });
  const [showSareeModal, setShowSareeModal] = useState(false);
  const [editingSaree, setEditingSaree] = useState(null);
  const [sareeForm, setSareeForm] = useState({
    name: "",
    pricePerDay: "",
    description: "",
    material: "",
    color: "",
    occasion: "Wedding",
    size: "Free Size",
    available: true,
    image: "",
  });
  const [imageFile, setImageFile] = useState(null);

  useEffect(() => {
    fetchUsers();
    fetchRentals();
    fetchSarees();
  }, []);

  const fetchRentals = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:5001/api/rentals/all", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setRentals(data.rentals);
      }
    } catch (error) {
      console.error("Error fetching rentals:", error);
    }
  };

  const fetchSarees = async () => {
    try {
      const response = await fetch("http://localhost:5001/api/sarees");
      if (response.ok) {
        const data = await response.json();
        setSarees(data.sarees);
      }
    } catch (error) {
      console.error("Error fetching sarees:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:5001/api/admin/users", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setUsers(data.users);
      } else {
        setMessage("Failed to fetch users");
      }
    } catch (error) {
      setMessage("Error fetching users");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (userId) => {
    if (!window.confirm("Are you sure you want to delete this user?")) {
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`http://localhost:5001/api/admin/users/${userId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        setMessage("User deleted successfully");
        fetchUsers();
      } else {
        setMessage("Failed to delete user");
      }
    } catch (error) {
      setMessage("Error deleting user");
      console.error(error);
    }
  };

  const handleEdit = (userToEdit) => {
    setEditingUser(userToEdit._id);
    setEditForm({
      name: userToEdit.name,
      email: userToEdit.email,
      isAdmin: userToEdit.isAdmin || false,
    });
  };

  const handleUpdate = async (userId) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`http://localhost:5001/api/admin/users/${userId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(editForm),
      });

      if (response.ok) {
        setMessage("User updated successfully");
        setEditingUser(null);
        fetchUsers();
      } else {
        setMessage("Failed to update user");
      }
    } catch (error) {
      setMessage("Error updating user");
      console.error(error);
    }
  };

  const handleCancelEdit = () => {
    setEditingUser(null);
    setEditForm({ name: "", email: "", isAdmin: false });
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const handleRentalStatusUpdate = async (rentalId, status) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `http://localhost:5001/api/rentals/${rentalId}/status`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ status }),
        }
      );

      if (response.ok) {
        setMessage(`Rental ${status} successfully!`);
        fetchRentals();
      } else {
        setMessage("Failed to update rental status");
      }
    } catch (error) {
      setMessage("Error updating rental status");
      console.error(error);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "approved":
        return "bg-green-100 text-green-800";
      case "rejected":
        return "bg-red-100 text-red-800";
      case "completed":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  // Saree management functions
  const handleAddSaree = () => {
    setEditingSaree(null);
    setSareeForm({
      name: "",
      pricePerDay: "",
      description: "",
      material: "",
      color: "",
      occasion: "Wedding",
      size: "Free Size",
      available: true,
      image: "",
    });
    setImageFile(null);
    setShowSareeModal(true);
  };

  const handleEditSaree = (saree) => {
    setEditingSaree(saree._id);
    setSareeForm({
      name: saree.name,
      pricePerDay: saree.pricePerDay,
      description: saree.description,
      material: saree.material,
      color: saree.color,
      occasion: saree.occasion,
      size: saree.size,
      available: saree.available,
      image: saree.image,
    });
    setImageFile(null);
    setShowSareeModal(true);
  };

  const handleSareeSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const token = localStorage.getItem("token");
      const formData = new FormData();

      // Append all fields to FormData
      Object.keys(sareeForm).forEach((key) => {
        if (key !== 'image' || !imageFile) {
          formData.append(key, sareeForm[key]);
        }
      });

      // Append image file if selected
      if (imageFile) {
        formData.append("image", imageFile);
      }

      const url = editingSaree
        ? `http://localhost:5001/api/sarees/${editingSaree}`
        : "http://localhost:5001/api/sarees";
      const method = editingSaree ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setMessage(
          editingSaree
            ? "Saree updated successfully!"
            : "Saree added successfully!"
        );
        fetchSarees();
        setTimeout(() => {
          setShowSareeModal(false);
          setMessage("");
        }, 1500);
      } else {
        setMessage(data.message || "Failed to save saree");
      }
    } catch (error) {
      setMessage("Error saving saree");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteSaree = async (sareeId) => {
    if (!window.confirm("Are you sure you want to delete this saree?")) {
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `http://localhost:5001/api/sarees/${sareeId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        setMessage("Saree deleted successfully");
        fetchSarees();
      } else {
        setMessage("Failed to delete saree");
      }
    } catch (error) {
      setMessage("Error deleting saree");
      console.error(error);
    }
  };

  const pendingRentalsCount = rentals.filter((r) => r.status === "pending").length;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
              <p className="text-gray-600 mt-1">Manage users and rentals</p>
            </div>
            <div className="flex gap-4 items-center">
              <Link
                to="/"
                className="px-4 py-2 text-gray-700 hover:text-pink-600 transition"
              >
                Home
              </Link>
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700 transition"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Tab Navigation */}
        <div className="mb-6 border-b border-gray-200">
          <nav className="-mb-px flex gap-8">
            <button
              onClick={() => setActiveTab("users")}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === "users"
                  ? "border-pink-600 text-pink-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              Users Management
            </button>
            <button
              onClick={() => setActiveTab("rentals")}
              className={`py-4 px-1 border-b-2 font-medium text-sm relative ${
                activeTab === "rentals"
                  ? "border-pink-600 text-pink-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              Rental Requests
              {pendingRentalsCount > 0 && (
                <span className="ml-2 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white bg-red-600 rounded-full">
                  {pendingRentalsCount}
                </span>
              )}
            </button>
            <button
              onClick={() => setActiveTab("sarees")}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === "sarees"
                  ? "border-pink-600 text-pink-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              Manage Sarees
            </button>
          </nav>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-gray-600 text-sm font-medium">Total Users</h3>
            <p className="text-3xl font-bold text-gray-900 mt-2">{users.length}</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-gray-600 text-sm font-medium">Total Sarees</h3>
            <p className="text-3xl font-bold text-gray-900 mt-2">{sarees.length}</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-gray-600 text-sm font-medium">Pending Rentals</h3>
            <p className="text-3xl font-bold text-yellow-600 mt-2">
              {pendingRentalsCount}
            </p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-gray-600 text-sm font-medium">Total Rentals</h3>
            <p className="text-3xl font-bold text-green-600 mt-2">
              {rentals.length}
            </p>
          </div>
        </div>

        {/* Message */}
        {message && (
          <div
            className={`mb-4 p-4 rounded-lg ${
              message.includes("successfully")
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {message}
          </div>
        )}

        {/* Users Table */}
        {activeTab === "users" && (
          <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-xl font-bold text-gray-900">All Users</h2>
          </div>
          {loading ? (
            <div className="p-6 text-center">Loading...</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Email
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Role
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Created At
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {users.map((userItem) => (
                    <tr key={userItem._id}>
                      {editingUser === userItem._id ? (
                        <>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <input
                              type="text"
                              value={editForm.name}
                              onChange={(e) =>
                                setEditForm({ ...editForm, name: e.target.value })
                              }
                              className="w-full px-3 py-2 border border-gray-300 rounded-md"
                            />
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <input
                              type="email"
                              value={editForm.email}
                              onChange={(e) =>
                                setEditForm({ ...editForm, email: e.target.value })
                              }
                              className="w-full px-3 py-2 border border-gray-300 rounded-md"
                            />
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <select
                              value={editForm.isAdmin}
                              onChange={(e) =>
                                setEditForm({
                                  ...editForm,
                                  isAdmin: e.target.value === "true",
                                })
                              }
                              className="w-full px-3 py-2 border border-gray-300 rounded-md"
                            >
                              <option value={false}>Customer</option>
                              <option value={true}>Admin</option>
                            </select>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {userItem.createdAt ? new Date(userItem.createdAt).toLocaleDateString() : "N/A"}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <button
                              onClick={() => handleUpdate(userItem._id)}
                              className="text-green-600 hover:text-green-900 mr-3"
                            >
                              Save
                            </button>
                            <button
                              onClick={handleCancelEdit}
                              className="text-gray-600 hover:text-gray-900"
                            >
                              Cancel
                            </button>
                          </td>
                        </>
                      ) : (
                        <>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            {userItem.name}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {userItem.email}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span
                              className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                userItem.isAdmin
                                  ? "bg-purple-100 text-purple-800"
                                  : "bg-green-100 text-green-800"
                              }`}
                            >
                              {userItem.isAdmin ? "Admin" : "Customer"}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {userItem.createdAt ? new Date(userItem.createdAt).toLocaleDateString() : "N/A"}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <button
                              onClick={() => handleEdit(userItem)}
                              className="text-indigo-600 hover:text-indigo-900 mr-3"
                            >
                              Edit
                            </button>
                            {userItem._id?.toString() !== user?.id?.toString() && (
                              <button
                                onClick={() => handleDelete(userItem._id)}
                                className="text-red-600 hover:text-red-900"
                              >
                                Delete
                              </button>
                            )}
                          </td>
                        </>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          </div>
        )}

        {/* Rentals Table */}
        {activeTab === "rentals" && (
          <div className="bg-white rounded-lg shadow">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-xl font-bold text-gray-900">Rental Requests</h2>
            </div>
            {loading ? (
              <div className="p-6 text-center">Loading...</div>
            ) : rentals.length === 0 ? (
              <div className="p-6 text-center text-gray-500">
                No rental requests yet
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Saree
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Customer
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Duration
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Price
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {rentals.map((rental) => (
                      <tr key={rental._id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <img
                              src={rental.sareeImage}
                              alt={rental.sareeName}
                              className="h-10 w-10 rounded-lg object-cover"
                            />
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">
                                {rental.sareeName}
                              </div>
                              <div className="text-sm text-gray-500">
                                ID: {rental.sareeId}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">
                            {rental.userName}
                          </div>
                          <div className="text-sm text-gray-500">
                            {rental.userEmail}
                          </div>
                          <div className="text-sm text-gray-500">
                            {rental.phone}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            {rental.rentalDays} days
                          </div>
                          <div className="text-sm text-gray-500">
                            {new Date(rental.startDate).toLocaleDateString()} -{" "}
                            {new Date(rental.endDate).toLocaleDateString()}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          TK {rental.rentalPrice}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(
                              rental.status
                            )}`}
                          >
                            {rental.status.charAt(0).toUpperCase() +
                              rental.status.slice(1)}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          {rental.status === "pending" && (
                            <div className="flex gap-2">
                              <button
                                onClick={() =>
                                  handleRentalStatusUpdate(rental._id, "approved")
                                }
                                className="text-green-600 hover:text-green-900"
                              >
                                Approve
                              </button>
                              <button
                                onClick={() =>
                                  handleRentalStatusUpdate(rental._id, "rejected")
                                }
                                className="text-red-600 hover:text-red-900"
                              >
                                Reject
                              </button>
                            </div>
                          )}
                          {rental.status === "approved" && (
                            <button
                              onClick={() =>
                                handleRentalStatusUpdate(rental._id, "completed")
                              }
                              className="text-blue-600 hover:text-blue-900"
                            >
                              Mark Complete
                            </button>
                          )}
                          {(rental.status === "rejected" ||
                            rental.status === "completed") && (
                            <span className="text-gray-400">No actions</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* Sarees Table */}
        {activeTab === "sarees" && (
          <div className="bg-white rounded-lg shadow">
            <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
              <h2 className="text-xl font-bold text-gray-900">Saree Collection</h2>
              <button
                onClick={handleAddSaree}
                className="px-4 py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700 transition"
              >
                Add New Saree
              </button>
            </div>
            {loading ? (
              <div className="p-6 text-center">Loading...</div>
            ) : sarees.length === 0 ? (
              <div className="p-6 text-center text-gray-500">
                No sarees added yet. Click "Add New Saree" to get started.
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Image
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Name
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Price/Day
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Occasion
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {sarees.map((saree) => (
                      <tr key={saree._id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <img
                            src={saree.image.startsWith('/') ? `http://localhost:5001${saree.image}` : saree.image}
                            alt={saree.name}
                            className="h-16 w-16 rounded-lg object-cover"
                          />
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm font-medium text-gray-900">
                            {saree.name}
                          </div>
                          <div className="text-sm text-gray-500">
                            {saree.material} - {saree.color}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          Tk {saree.pricePerDay}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {saree.occasion}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                              saree.available
                                ? "bg-green-100 text-green-800"
                                : "bg-red-100 text-red-800"
                            }`}
                          >
                            {saree.available ? "Available" : "Unavailable"}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <button
                            onClick={() => handleEditSaree(saree)}
                            className="text-indigo-600 hover:text-indigo-900 mr-3"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDeleteSaree(saree._id)}
                            className="text-red-600 hover:text-red-900"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Saree Modal */}
      {showSareeModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-6 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-gray-800">
                {editingSaree ? "Edit Saree" : "Add New Saree"}
              </h2>
              <button
                onClick={() => setShowSareeModal(false)}
                className="text-gray-500 hover:text-gray-700 text-2xl"
              >
                ×
              </button>
            </div>

            <form onSubmit={handleSareeSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Saree Name
                  </label>
                  <input
                    type="text"
                    value={sareeForm.name}
                    onChange={(e) =>
                      setSareeForm({ ...sareeForm, name: e.target.value })
                    }
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-400 outline-none"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Price Per Day (Tk)
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={sareeForm.pricePerDay}
                    onChange={(e) =>
                      setSareeForm({
                        ...sareeForm,
                        pricePerDay: e.target.value,
                      })
                    }
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-400 outline-none"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Occasion
                  </label>
                  <select
                    value={sareeForm.occasion}
                    onChange={(e) =>
                      setSareeForm({ ...sareeForm, occasion: e.target.value })
                    }
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-400 outline-none"
                    required
                  >
                    <option value="Wedding">Wedding</option>
                    <option value="Party">Party</option>
                    <option value="Festival">Festival</option>
                    <option value="Casual">Casual</option>
                    <option value="Traditional">Traditional</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Material
                  </label>
                  <input
                    type="text"
                    value={sareeForm.material}
                    onChange={(e) =>
                      setSareeForm({ ...sareeForm, material: e.target.value })
                    }
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-400 outline-none"
                    placeholder="e.g., Silk, Cotton, Georgette"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Color
                  </label>
                  <input
                    type="text"
                    value={sareeForm.color}
                    onChange={(e) =>
                      setSareeForm({ ...sareeForm, color: e.target.value })
                    }
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-400 outline-none"
                    placeholder="e.g., Red, Blue, Green"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Size
                  </label>
                  <input
                    type="text"
                    value={sareeForm.size}
                    onChange={(e) =>
                      setSareeForm({ ...sareeForm, size: e.target.value })
                    }
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-400 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Available
                  </label>
                  <select
                    value={sareeForm.available}
                    onChange={(e) =>
                      setSareeForm({
                        ...sareeForm,
                        available: e.target.value === "true",
                      })
                    }
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-400 outline-none"
                  >
                    <option value="true">Yes</option>
                    <option value="false">No</option>
                  </select>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description
                  </label>
                  <textarea
                    value={sareeForm.description}
                    onChange={(e) =>
                      setSareeForm({
                        ...sareeForm,
                        description: e.target.value,
                      })
                    }
                    rows="3"
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-400 outline-none"
                    placeholder="Describe the saree..."
                    required
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Image
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setImageFile(e.target.files[0])}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-400 outline-none"
                  />
                  {!imageFile && !editingSaree && (
                    <div className="mt-2">
                      <label className="block text-sm text-gray-600 mb-1">
                        Or use image URL:
                      </label>
                      <input
                        type="url"
                        value={sareeForm.image}
                        onChange={(e) =>
                          setSareeForm({ ...sareeForm, image: e.target.value })
                        }
                        className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-400 outline-none"
                        placeholder="https://example.com/image.jpg"
                      />
                    </div>
                  )}
                  {editingSaree && sareeForm.image && (
                    <div className="mt-2">
                      <p className="text-sm text-gray-600">Current image:</p>
                      <img
                        src={sareeForm.image.startsWith('/') ? `http://localhost:5001${sareeForm.image}` : sareeForm.image}
                        alt="Current"
                        className="h-20 w-20 object-cover rounded mt-1"
                      />
                    </div>
                  )}
                </div>
              </div>

              {message && (
                <p
                  className={`mt-4 text-center text-sm font-medium ${
                    message.includes("success")
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  {message}
                </p>
              )}

              <div className="flex gap-4 mt-6">
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 bg-pink-600 text-white py-3 rounded-lg hover:bg-pink-700 transition disabled:bg-gray-400"
                >
                  {loading
                    ? "Saving..."
                    : editingSaree
                    ? "Update Saree"
                    : "Add Saree"}
                </button>
                <button
                  type="button"
                  onClick={() => setShowSareeModal(false)}
                  className="flex-1 bg-gray-200 text-gray-800 py-3 rounded-lg hover:bg-gray-300 transition"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;

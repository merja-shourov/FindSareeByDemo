import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import { useAuth } from "../utils/AuthContext";

const SareeDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [showRentalModal, setShowRentalModal] = useState(false);
  const [rentalDays, setRentalDays] = useState(3);
  const [startDate, setStartDate] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [saree, setSaree] = useState(null);
  const [fetchLoading, setFetchLoading] = useState(true);

  useEffect(() => {
    fetchSareeDetails();
  }, [id]);

  const fetchSareeDetails = async () => {
    try {
      const response = await fetch(`http://localhost:5001/api/sarees/${id}`);
      if (response.ok) {
        const data = await response.json();
        setSaree(data.saree);
      } else {
        setMessage("Saree not found");
      }
    } catch (error) {
      console.error("Error fetching saree details:", error);
      setMessage("Error loading saree details");
    } finally {
      setFetchLoading(false);
    }
  };

  const handleRentClick = () => {
    if (!isAuthenticated()) {
      navigate("/login");
      return;
    }
    setShowRentalModal(true);
  };

  const handleRentalSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    if (!startDate || !phone || !address) {
      setMessage("Please fill all fields");
      setLoading(false);
      return;
    }

    try {
      // Calculate end date
      const start = new Date(startDate);
      const end = new Date(start);
      end.setDate(start.getDate() + rentalDays);

      const rentalData = {
        sareeId: saree._id,
        sareeName: saree.name,
        sareeImage: saree.image.startsWith('/') ? `http://localhost:5001${saree.image}` : saree.image,
        rentalPrice: saree.pricePerDay * rentalDays,
        rentalDays,
        startDate: start.toISOString(),
        endDate: end.toISOString(),
        phone,
        address,
      };

      const token = localStorage.getItem("token");
      const res = await fetch("http://localhost:5001/api/rentals", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(rentalData),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setMessage("✅ Rental request submitted! Check your dashboard.");
        setTimeout(() => {
          setShowRentalModal(false);
          navigate("/dashboard");
        }, 2000);
      } else {
        setMessage(`❌ ${data.message}`);
      }
    } catch (error) {
      setMessage("❌ Failed to submit rental request");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (fetchLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-xl text-gray-600">Loading saree details...</p>
      </div>
    );
  }

  if (!saree) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-xl text-gray-600 mb-4">Saree not found</p>
          <button
            onClick={() => navigate("/saree")}
            className="px-6 py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700"
          >
            Back to Collection
          </button>
        </div>
      </div>
    );
  }

  const imageUrl = saree.image?.startsWith('/') ? `http://localhost:5001${saree.image}` : saree.image;

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-8 lg:px-16">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 bg-white p-8 rounded-2xl shadow-xl">
        {/* Saree Image */}
        <div className="flex justify-center items-center">
          <img
            src={imageUrl}
            alt={saree.name}
            className="rounded-2xl w-full max-h-[600px] object-cover shadow-md"
          />
        </div>

        {/* Saree Info */}
        <div className="flex flex-col justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              {saree.name}
            </h1>
            <p className="text-gray-600 mb-4">{saree.description}</p>

            <div className="space-y-2 mb-6">
              <p>
                <span className="font-semibold text-gray-700">Material:</span>{" "}
                {saree.material}
              </p>
              <p>
                <span className="font-semibold text-gray-700">Color:</span>{" "}
                {saree.color}
              </p>
              <p>
                <span className="font-semibold text-gray-700">Occasion:</span>{" "}
                {saree.occasion}
              </p>
              <p>
                <span className="font-semibold text-gray-700">Size:</span>{" "}
                {saree.size}
              </p>
            </div>

            <div className="text-2xl font-bold text-pink-600 mb-4">
              TK {saree.pricePerDay} / day
            </div>

            <button
              onClick={handleRentClick}
              className={`w-full py-3 rounded-xl text-white font-semibold transition ${
                saree.available
                  ? "bg-pink-600 hover:bg-pink-700"
                  : "bg-gray-400 cursor-not-allowed"
              }`}
              disabled={!saree.available}
            >
              {saree.available ? "Rent Now" : "Not Available"}
            </button>
          </div>

          {/* Delivery info */}
          <div className="mt-6 text-sm text-gray-500 border-t pt-4">
            <p>✔ Free delivery within 24 hours inside Dhaka</p>
            <p>✔ Easy return & cleaning included</p>
          </div>
        </div>
      </div>

      {/* Rental Modal */}
      {showRentalModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-gray-800">Rent Saree</h2>
              <button
                onClick={() => setShowRentalModal(false)}
                className="text-gray-500 hover:text-gray-700 text-2xl"
              >
                ×
              </button>
            </div>

            <div className="mb-4">
              <img
                src={imageUrl}
                alt={saree.name}
                className="w-full h-40 object-cover rounded-lg"
              />
              <h3 className="font-semibold text-lg mt-2">{saree.name}</h3>
              <p className="text-pink-600 font-bold">
                Tk {saree.pricePerDay} / day
              </p>
            </div>

            <form onSubmit={handleRentalSubmit}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Rental Duration (days)
                </label>
                <input
                  type="number"
                  min="1"
                  max="30"
                  value={rentalDays}
                  onChange={(e) => setRentalDays(parseInt(e.target.value))}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-400 outline-none"
                />
                <p className="text-sm text-gray-600 mt-1">
                  Total: Tk   {saree.pricePerDay * rentalDays}
                </p>
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Start Date
                </label>
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  min={new Date().toISOString().split("T")[0]}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-400 outline-none"
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Your phone number"
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-400 outline-none"
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Delivery Address
                </label>
                <textarea
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Your delivery address"
                  rows="3"
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-400 outline-none"
                  required
                />
              </div>

              {message && (
                <p className="mb-4 text-center text-sm font-medium">
                  {message}
                </p>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-pink-600 text-white py-3 rounded-lg hover:bg-pink-700 transition disabled:bg-gray-400"
              >
                {loading ? "Submitting..." : "Submit Rental Request"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default SareeDetails;

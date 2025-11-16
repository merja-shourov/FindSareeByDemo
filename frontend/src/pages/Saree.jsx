import React, { useState, useEffect } from "react";
import SareeCard from "../components/SareeCard";

const Saree = () => {
  const [search, setSearch] = useState("");
  const [occasion, setOccasion] = useState("All");
  const [sareesData, setSareesData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSarees();
  }, []);

  const fetchSarees = async () => {
    try {
      const response = await fetch("http://localhost:5001/api/sarees");
      if (response.ok) {
        const data = await response.json();
        setSareesData(data.sarees);
      }
    } catch (error) {
      console.error("Error fetching sarees:", error);
    } finally {
      setLoading(false);
    }
  };

  const filteredSarees = sareesData.filter((saree) => {
    const matchSearch = saree.name.toLowerCase().includes(search.toLowerCase());
    const matchOccasion =
      occasion === "All" || saree.occasion === occasion;
    return matchSearch && matchOccasion;
  });

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-3xl font-bold text-center mb-8 text-pink-600">
        Saree Collection
      </h1>

      {/* Filter and Search */}
      <div className="flex flex-col md:flex-row justify-center items-center gap-4 mb-8">
        <input
          type="text"
          placeholder="Search saree..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border border-gray-300 rounded-lg p-2 w-64 focus:outline-none focus:ring-2 focus:ring-pink-400"
        />

        <select
          value={occasion}
          onChange={(e) => setOccasion(e.target.value)}
          className="border border-gray-300 rounded-lg p-2 w-48 focus:outline-none focus:ring-2 focus:ring-pink-400"
        >
          <option value="All">All Occasions</option>
          <option value="Wedding">Wedding</option>
          <option value="Party">Party</option>
          <option value="Festival">Festival</option>
          <option value="Casual">Casual</option>
        </select>
      </div>

      {/* Saree Cards */}
      {loading ? (
        <p className="text-center text-gray-500">Loading sarees...</p>
      ) : filteredSarees.length === 0 ? (
        <p className="text-center text-gray-500">No sarees found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredSarees.map((saree) => (
            <SareeCard key={saree._id} saree={saree} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Saree;

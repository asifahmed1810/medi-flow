import React, { useState } from "react";
import JoinCampModal from "../JoinCampModal/JoinCampModal";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import { useQuery } from "@tanstack/react-query";

const AvailableCamps = () => {
  const [selectedCamp, setSelectedCamp] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortCriteria, setSortCriteria] = useState("");
  const [isTwoColumn, setIsTwoColumn] = useState(false);
  const navigate = useNavigate();

  // Fetch camps using TanStack Query
  const { data: camps = [], isLoading, error } = useQuery({
    queryKey: ["camps"],
    queryFn: async () => {
      const res = await fetch("http://localhost:5000/camps");
      if (!res.ok) throw new Error("Failed to fetch camps");
      return res.json();
    },
  });

  // Filtered camps based on search and sort
  const filteredCamps = camps
    .filter(
      (camp) =>
        camp.campName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        camp.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        camp.dateTime.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => {
      if (sortCriteria === "Most Registered") {
        return b.participantCount - a.participantCount;
      } else if (sortCriteria === "Camp Fees") {
        return a.campFees - b.campFees;
      } else if (sortCriteria === "Alphabetical Order") {
        return a.campName.localeCompare(b.campName);
      }
      return 0;
    });

  // Toggle layout
  const toggleLayout = () => {
    setIsTwoColumn(!isTwoColumn);
  };

  // Modal toggling
  const toggleModal = (camp) => {
    setSelectedCamp(camp);
    setIsModalVisible(!isModalVisible);
  };

  // Loading state
  if (isLoading) {
    return <div className="min-h-screen p-8">Loading camps...</div>;
  }

  // Error state
  if (error) {
    return <div className="min-h-screen p-8">Error loading camps: {error.message}</div>;
  }

  return (
    <>
      <Helmet>
        <title>Mediflow | Available Camps</title>
      </Helmet>
      <div className="min-h-screen p-8">
        <h1 className="text-2xl font-bold mb-6">Available Camps</h1>

        {/* Search and Sorting */}
        <div className="mb-6 flex flex-col sm:flex-row justify-between items-center gap-4">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search camps..."
            className="w-full sm:w-1/3 p-2 border rounded"
          />
          <select
            value={sortCriteria}
            onChange={(e) => setSortCriteria(e.target.value)}
            className="w-full sm:w-1/4 p-2 border rounded"
          >
            <option value="">Sort By</option>
            <option value="Most Registered">Most Registered</option>
            <option value="Camp Fees">Camp Fees</option>
            <option value="Alphabetical Order">Alphabetical Order</option>
          </select>
          <button
            onClick={toggleLayout}
            className="px-4 max-sm:hidden py-2 bg-blue-500 text-white rounded"
          >
            {isTwoColumn ? "Switch to Three Columns" : "Switch to Two Columns"}
          </button>
        </div>

        {/* Camp Cards */}
        <div
          className={`grid gap-6 ${
            isTwoColumn
              ? "grid-cols-1 sm:grid-cols-2"
              : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
          }`}
        >
          {filteredCamps.map((camp) => (
            <div key={camp._id} className="bg-white p-4 rounded shadow">
              <img
                src={camp.image}
                alt={camp.campName}
                className="w-full h-48 object-cover rounded mb-4"
              />
              <h2 className="text-lg font-bold">{camp.campName}</h2>
              <p>Fees: ${camp.campFees}</p>
              <p>Location: {camp.location}</p>
              <p>Participants: {camp.participantCount}</p>
              <button
                onClick={() => navigate(`/camp-details/${camp._id}`)}
                className="mt-4 px-4 py-2 bg-green-500 text-white rounded"
              >
                Details
              </button>
            </div>
          ))}
        </div>

        {/* Modal */}
        {isModalVisible && (
          <JoinCampModal toggleModal={toggleModal} camp={selectedCamp} />
        )}
      </div>
    </>
  );
};

export default AvailableCamps;

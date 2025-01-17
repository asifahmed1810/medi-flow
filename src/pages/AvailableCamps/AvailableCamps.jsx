import React, { useEffect, useState } from 'react';
import JoinCampModal from '../JoinCampModal/JoinCampModal';
import { useNavigate } from 'react-router-dom';

const AvailableCamps = () => {
    const [camps, setCamps] = useState([]);
    const [filteredCamps, setFilteredCamps] = useState([]);
    const [selectedCamp, setSelectedCamp] = useState(null);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [sortCriteria, setSortCriteria] = useState('');
    const [isTwoColumn, setIsTwoColumn] = useState(false);
    const navigate = useNavigate();

    // Fetch camps from the server
    useEffect(() => {
        fetch('http://localhost:5000/camps')
            .then((res) => res.json())
            .then((data) => {
                setCamps(data);
                setFilteredCamps(data);
            })
            .catch((err) => console.error('Error fetching camps:', err));
    }, []);

    // Handle search
    const handleSearch = (e) => {
        const query = e.target.value.toLowerCase();
        setSearchQuery(query);

        const filtered = camps.filter(
            (camp) =>
                camp.campName.toLowerCase().includes(query) ||
                camp.location.toLowerCase().includes(query) ||
                camp.dateTime.toLowerCase().includes(query)
        );
        setFilteredCamps(filtered);
    };

    // Handle sort
    const handleSort = (criteria) => {
        setSortCriteria(criteria);

        const sorted = [...filteredCamps].sort((a, b) => {
            if (criteria === 'Most Registered') {
                return b.participantCount - a.participantCount;
            } else if (criteria === 'Camp Fees') {
                return a.campFees - b.campFees;
            } else if (criteria === 'Alphabetical Order') {
                return a.campName.localeCompare(b.campName);
            }
            return 0;
        });

        setFilteredCamps(sorted);
    };

    // Toggle layout
    const toggleLayout = () => {
        setIsTwoColumn(!isTwoColumn);
    };

    const toggleModal = (camp) => {
        setSelectedCamp(camp);
        setIsModalVisible(!isModalVisible);
    };

    return (
        <div className="min-h-screen p-8">
            <h1 className="text-2xl font-bold mb-6">Available Camps</h1>

            {/* Search and Sorting */}
            <div className="mb-6 flex flex-col sm:flex-row justify-between items-center gap-4">
                <input
                    type="text"
                    value={searchQuery}
                    onChange={handleSearch}
                    placeholder="Search camps..."
                    className="w-full sm:w-1/3 p-2 border rounded"
                />
                <select
                    value={sortCriteria}
                    onChange={(e) => handleSort(e.target.value)}
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
                    {isTwoColumn ? 'Switch to Three Columns' : 'Switch to Two Columns'}
                </button>
            </div>

            {/* Camp Cards */}
            <div
                className={`grid gap-6 ${
                    isTwoColumn ? 'grid-cols-1 sm:grid-cols-2' : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
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
                <JoinCampModal
                    toggleModal={toggleModal}
                    camp={selectedCamp}
                />
            )}
        </div>
    );
};

export default AvailableCamps;

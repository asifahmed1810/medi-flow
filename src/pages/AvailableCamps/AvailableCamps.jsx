import React, { useEffect, useState } from 'react';
import JoinCampModal from '../JoinCampModal/JoinCampModal';
import { useNavigate } from 'react-router-dom';

const AvailableCamps = () => {
    const [camps, setCamps] = useState([]);
    const [selectedCamp, setSelectedCamp] = useState(null);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const navigate=useNavigate();

    // Fetch camps from the server
    useEffect(() => {
        fetch('http://localhost:5000/camps')
            .then((res) => res.json())
            .then((data) => setCamps(data))
            .catch((err) => console.error('Error fetching camps:', err));
    }, []);

    const toggleModal = (camp) => {
        setSelectedCamp(camp);
        setIsModalVisible(!isModalVisible);
    };

    return (
        <div className="min-h-screen p-8">
            <h1 className="text-2xl font-bold mb-6">Available Camps</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {camps.map((camp) => (
                    <div key={camp._id} className="bg-white p-4 rounded shadow">
                        <img src={camp.image} alt={camp.campName} className="w-full h-48 object-cover rounded mb-4" />
                        <h2 className="text-lg font-bold">{camp.campName}</h2>
                        <p>Fees: ${camp.campFees}</p>
                        <p>Location: {camp.location}</p>
                        <button
                            onClick={() => navigate(`/camp-details/${camp._id}`)}
                            className="mt-4 px-4 py-2 bg-green-500 text-white rounded"
                        >
                            Details
                        </button>
                    </div>
                ))}
            </div>

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

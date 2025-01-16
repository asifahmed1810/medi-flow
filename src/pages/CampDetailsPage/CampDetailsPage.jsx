import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import JoinCampModal from '../JoinCampModal/JoinCampModal';

const CampDetailsPage = () => {
  const { campId } = useParams();
  const [camp, setCamp] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    fetch(`http://localhost:5000/camps/${campId}`)
        .then((res) => {
            if (!res.ok) {
                throw new Error(`HTTP error! status: ${res.status}`);
            }
            return res.json();
        })
        .then((data) => setCamp(data))
        .catch((err) => console.error('Error fetching camp:', err));
}, [campId]);


  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  if (!camp) return <p>Loading...</p>;

  return (
    <div className="min-h-screen p-8">
      <h1 className="text-2xl font-bold mb-4">{camp.campName}</h1>
      <img src={camp.image} alt={camp.campName} className="w-full h-96 object-cover rounded mb-4" />
      <p>Fees: ${camp.campFees}</p>
      <p>Date & Time: {camp.dateTime}</p>
      <p>Location: {camp.location}</p>
      <p>Healthcare Professional: {camp.healthcareProfessionalName}</p>
      <p>Participant Count: {camp.participantCount}</p>
      <p className="mt-4">{camp.description}</p>
      <button onClick={toggleModal} className="mt-4 px-4 py-2 bg-blue-500 text-white rounded">
        Join Camp
      </button>

      {isModalVisible && <JoinCampModal toggleModal={toggleModal} camp={camp} />}
    </div>
  );
};

export default CampDetailsPage;

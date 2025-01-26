import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import JoinCampModal from '../JoinCampModal/JoinCampModal';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { Helmet } from 'react-helmet';


const CampDetailsPage = () => {
  const { campId } = useParams();
  const [camp, setCamp] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const axiosSecure = useAxiosSecure(); // Initialize the secure Axios instance

  // Fetch camp details securely
  useEffect(() => {
    const fetchCampDetails = async () => {
      try {
        const response = await axiosSecure.get(`/camps/${campId}`);
        setCamp(response.data);
      } catch (error) {
        console.error('Error fetching camp:', error);
      }
    };

    fetchCampDetails();
  }, [campId, axiosSecure]);

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  if (!camp) return <p>Loading...</p>;

  return (
    <>
      <Helmet>
        <title>Mediflow | CampDetails</title>
      </Helmet>

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
    </>

  );
};

export default CampDetailsPage;

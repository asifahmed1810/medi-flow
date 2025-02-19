import React from 'react';
import { useNavigate } from 'react-router-dom';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';

const PopularCamps = () => {
    const navigate = useNavigate();
    const axiosSecure = useAxiosSecure();

    const { data: camps = [], isLoading, error } = useQuery({
        queryKey: ['popularCamps'],
        queryFn: async () => {
            const res = await axiosSecure.get('/camps');
            return res.data;
        }
    })

    const popularCamps = camps
        .sort((a, b) => b.participantCount - a.participantCount)
        .slice(0, 6);

    if (isLoading) {
        return <div className="min-h-screen p-8">Loading popular camps...</div>;
    }

    if (error) {
        return (
            <div className="min-h-screen p-8">
                Error loading popular camps: {error.message}
            </div>
        );
    }

    return (

        <div className="min-h-screen p-8">
            <h1 className="text-2xl font-bold text-center mb-6">Popular Medical Camps</h1>

            {/* Popular Camps Grid */}
            <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                {popularCamps.map((camp) => (
                    <div key={camp._id} className="bg-white dark:bg-gray-800 p-4 rounded shadow">
                        <img
                            src={camp.image}
                            alt={camp.campName}
                            className="w-full h-48 object-cover rounded mb-4"
                        />
                        <h2 className="text-lg font-bold">{camp.campName}</h2>
                        <p>Fees: ${camp.campFees}</p>
                        <p>Date & Time: {camp.dateTime}</p>
                        <p>Location: {camp.location}</p>
                        <p>Healthcare Professional: {camp.healthcareProfessional}</p>
                        <p>Participants: {camp.participantCount}</p>
                        <button
                            onClick={() => navigate(`/camp-details/${camp._id}`)}
                            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
                        >
                            Details
                        </button>
                    </div>
                ))}
            </div>

            {/* See All Camps Button */}
            <div className="mt-8 text-center">
                <button
                    onClick={() => navigate("/availablecamps")}
                    className="px-6 py-3 bg-green-500 text-white font-bold rounded"
                >
                    See All Camps
                </button>
            </div>
        </div>
    );
};



export default PopularCamps;
import React, { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../../providers/AuthProvider'; // Update the path as needed
import Swal from 'sweetalert2';
import axios from 'axios';
const JoinCampModal = ({ toggleModal, camp }) => {
    const { user } = useContext(AuthContext);
    const [participantInfo, setParticipantInfo] = useState({
        participantName: '',
        participantEmail: '',
        age: '',
        phoneNumber: '',
        gender: '',
        emergencyContact: '',
    });

    useEffect(() => {
        if (user) {
            setParticipantInfo((prev) => ({
                ...prev,
                participantName: user.displayName || '',
                participantEmail: user.email || '',
            }));
        }
    }, [user]);

    const handleChange = (e) => {
        setParticipantInfo({ ...participantInfo, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const registrationData = {
            ...participantInfo,
            campId: camp._id,
            campName: camp.campName,
            campFees: camp.campFees,
            location: camp.location,
            healthcareProfessionalName: camp.healthcareProfessionalName,
        };

        try {
            const res = await axios.post('https://mediflow-server-eight.vercel.app/registerCamps', registrationData);

            if (res.status === 201) {
                const updatedCamp = res.data.updatedCamp;
                Swal.fire({
                    icon: 'success',
                    title: 'Registration Successful!',
                    text: `You have successfully registered for the camp.`,
                    confirmButtonText: 'OK',
                });

                if (updatedCamp) {
                    toggleModal({
                        ...camp,
                        participantCount: updatedCamp.participantCount,
                    });
                } else {
                    toggleModal(null);
                }
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Registration Failed',
                    text: res.data.message || 'An error occurred while registering.',
                    confirmButtonText: 'Try Again',
                });
            }
        } catch (err) {
            console.error('Error registering:', err.response?.data || err.message);
            Swal.fire({
                icon: 'error',
                title: 'Registration Failed',
                text: err.response?.data?.message || 'An error occurred while registering.',
                confirmButtonText: 'Try Again',
            });
        }
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white p-6 rounded shadow-lg w-96">
                <h2 className="text-xl font-bold mb-4">Join Medical Camp</h2>
                <form onSubmit={handleSubmit}>
                    <p className="font-semibold">Camp Name: {camp.campName}</p>
                    <p className="font-semibold">Fees: ${camp.campFees}</p>
                    <p className="font-semibold">Location: {camp.location}</p>
                    <p className="font-semibold">Healthcare Professional: {camp.healthcareProfessionalName}</p>
                    <div className="mt-4">
                        <input
                            name="participantName"
                            placeholder="Participant Name"
                            value={participantInfo.participantName}
                            onChange={handleChange}
                            className="w-full p-2 border rounded mb-2 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white border-gray-300 dark:border-gray-700"
                            required
                        />
                        <input
                            name="participantEmail"
                            type="email"
                            placeholder="Participant Email"
                            value={participantInfo.participantEmail}
                            onChange={handleChange}
                            className="w-full p-2 border rounded mb-2 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white border-gray-300 dark:border-gray-700"
                            required
                        />
                        <input
                            name="age"
                            type="number"
                            placeholder="Age"
                            value={participantInfo.age}
                            onChange={handleChange}
                            className="w-full p-2 border rounded mb-2 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white border-gray-300 dark:border-gray-700"
                            required
                        />
                        <input
                            name="phoneNumber"
                            placeholder="Phone Number"
                            value={participantInfo.phoneNumber}
                            onChange={handleChange}
                            className="w-full p-2 border rounded mb-2 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white border-gray-300 dark:border-gray-700"
                            required
                        />
                        <input
                            name="gender"
                            placeholder="Gender"
                            value={participantInfo.gender}
                            onChange={handleChange}
                            className="w-full p-2 border rounded mb-2 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white border-gray-300 dark:border-gray-700"
                            required
                        />
                        <input
                            name="emergencyContact"
                            placeholder="Emergency Contact"
                            value={participantInfo.emergencyContact}
                            onChange={handleChange}
                            className="w-full p-2 border rounded mb-4 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white border-gray-300 dark:border-gray-700"
                            required
                        />
                        <div className="flex justify-end">
                            <button
                                onClick={() => toggleModal(null)}
                                type="button"
                                className="px-4 py-2 bg-gray-300 dark:bg-gray-700 text-gray-800 dark:text-white rounded mr-2"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="px-4 py-2 bg-blue-500 dark:bg-blue-600 text-white rounded"
                            >
                                Register
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default JoinCampModal;

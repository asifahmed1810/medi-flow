import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../../providers/AuthProvider';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2'; // Import SweetAlert
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { Helmet } from 'react-helmet';

const RegisteredCamp = () => {
    const { user } = useContext(AuthContext);
    const [registeredCamps, setRegisteredCamps] = useState([]);
    const navigate = useNavigate();
    const axiosSecure = useAxiosSecure();

    // Fetch registered camps for the user
    useEffect(() => {
        if (user?.email) {
            axiosSecure.get(`/registerCamps?email=${user.email}`)
                .then(response => {
                    setRegisteredCamps(response.data);
                })
                .catch(error => {
                    console.error('Error fetching registered camps:', error);
                });
        }
    }, [user]);

    // Handle payment
    const handlePayment = async (camp) => {
        try {
            const response = await axios.post('/create-payment-intent', { price: camp.fees });
            const clientSecret = response.data.clientSecret;

            // Redirect to payment page or open payment modal
            navigate('/payment', { state: { clientSecret, campId: camp.id } });
        } catch (error) {
            console.error('Error initiating payment:', error);
        }
    };

    // Handle cancellation
    const handleCancel = async (campId) => {
        try {
            const result = await Swal.fire({
                title: 'Are you sure?',
                text: "You won't be able to undo this!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#d33',
                cancelButtonColor: '#3085d6',
                confirmButtonText: 'Yes, cancel it!'
            });

            if (result.isConfirmed) {
                await axios.delete(`/api/registered-camps/${campId}`);
                setRegisteredCamps(registeredCamps.filter(camp => camp.id !== campId));
                Swal.fire('Canceled!', 'Your registration has been canceled.', 'success');
            }
        } catch (error) {
            console.error('Error canceling registration:', error);
        }
    };

    // Handle feedback
    const handleFeedback = (campId) => {
        navigate(`/feedback/${campId}`);
    };

    return (
        <>
            <Helmet>
                <title>Mediflow | Registered Camps</title>
            </Helmet>
            <div className="p-6 bg-white dark:bg-gray-900 text-gray-900 dark:text-white min-h-screen">
                <h2 className="text-2xl font-bold mb-6">Registered Camps</h2>
                {registeredCamps.length > 0 ? (
                    <table className="table-auto w-full border-collapse border border-gray-300 dark:border-gray-700">
                        <thead>
                            <tr className="bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white">
                                <th className="border border-gray-300 dark:border-gray-700 px-4 py-2">Camp Name</th>
                                <th className="border border-gray-300 dark:border-gray-700 px-4 py-2">Camp Fees</th>
                                <th className="border border-gray-300 dark:border-gray-700 px-4 py-2">Participant Name</th>
                                <th className="border border-gray-300 dark:border-gray-700 px-4 py-2">Payment Status</th>
                                <th className="border border-gray-300 dark:border-gray-700 px-4 py-2">Confirmation Status</th>
                                <th className="border border-gray-300 dark:border-gray-700 px-4 py-2">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {registeredCamps.map(camp => (
                                <tr key={camp.id} className="dark:bg-gray-800">
                                    <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">{camp.name}</td>
                                    <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">${camp.fees}</td>
                                    <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">{user.displayName}</td>
                                    <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">
                                        {camp.paymentStatus === 'paid' ? (
                                            <button className="px-4 py-2 bg-green-500 text-white rounded" disabled>
                                                Paid
                                            </button>
                                        ) : (
                                            <button
                                                className="px-4 py-2 bg-blue-500 text-white rounded"
                                                onClick={() => handlePayment(camp)}
                                            >
                                                Pay
                                            </button>
                                        )}
                                    </td>
                                    <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">
                                        {camp.confirmationStatus}
                                    </td>
                                    <td className="border border-gray-300 dark:border-gray-700 px-4 py-2 flex gap-2">
                                        <button
                                            className={`px-4 py-2 rounded ${camp.paymentStatus === 'paid' ? 'bg-gray-400 text-white' : 'bg-red-500 text-white'}`}
                                            onClick={() => handleCancel(camp.id)}
                                            disabled={camp.paymentStatus === 'paid'}
                                        >
                                            Cancel
                                        </button>
                                        {camp.paymentStatus === 'paid' && camp.confirmationStatus === 'Confirmed' && (
                                            <button
                                                className="px-4 py-2 bg-yellow-500 text-white rounded"
                                                onClick={() => handleFeedback(camp.id)}
                                            >
                                                Feedback
                                            </button>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <p>No camps registered yet.</p>
                )}
            </div>
        </>
    );
    
};

export default RegisteredCamp;

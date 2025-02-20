import React, { useContext, useState } from 'react';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { AuthContext } from '../../../providers/AuthProvider';

const FeedbackSection = () => {
    const { user } = useContext(AuthContext);
    const [feedback, setFeedback] = useState('');
    const [rating, setRating] = useState(5);
    const [participantEmail, setParticipantEmail] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const axiosSecure = useAxiosSecure();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMessage('');

        try {
            const response = await axiosSecure.post('/api/feedback', {
                feedback,
                rating,
                participantEmail,
            });

            if (response.data.success) {
                Swal.fire({
                    icon: 'success',
                    title: 'Feedback Submitted!',
                    text: 'Thank you for your valuable feedback.',
                });

                setFeedback('');
                setRating(5);
                setParticipantEmail('');
            } else {
                setErrorMessage('Failed to submit feedback. Please try again.');
            }
        } catch (error) {
            setErrorMessage('An error occurred while submitting feedback.');
        }
    };

    return (
        <div className="feedback-form mt-10 bg-gray-100 dark:bg-gray-800 dark:text-white w-3/5 mx-auto p-6 rounded-lg shadow-lg transition-all">
            <h2 className="text-xl font-bold text-center mb-4">Submit Your Feedback</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-sm font-medium mb-2">Your Email</label>
                    <input
                        type="email"
                        className="w-full p-2 border rounded dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                        placeholder="Enter your email"
                        value={participantEmail}
                        onChange={(e) => setParticipantEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium mb-2">Feedback</label>
                    <textarea
                        className="w-full p-2 border rounded dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                        placeholder="Write your feedback here"
                        value={feedback}
                        onChange={(e) => setFeedback(e.target.value)}
                        required
                    ></textarea>
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium mb-2">Rating (1 to 5)</label>
                    <input
                        type="number"
                        min="1"
                        max="5"
                        className="w-full p-2 border rounded dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                        value={rating}
                        onChange={(e) => setRating(e.target.value)}
                        required
                    />
                </div>
                {errorMessage && (
                    <p className="text-red-500 text-sm mb-4">{errorMessage}</p>
                )}
                <button
                    type="submit"
                    className={`bg-blue-500 dark:bg-blue-700 text-white px-4 py-2 rounded ${
                        user ? 'hover:bg-blue-600 dark:hover:bg-blue-800' : 'opacity-50 cursor-not-allowed'
                    }`}
                    disabled={!user}
                >
                    Submit Feedback
                </button>
            </form>
        </div>
    );
};

export default FeedbackSection;

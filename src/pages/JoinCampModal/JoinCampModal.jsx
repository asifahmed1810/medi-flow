import React from 'react';

const JoinCampModal = ({ toggleModal }) => {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded shadow-lg">
                <h2 className="text-xl font-bold mb-4">Join Medical Camp</h2>
                <p className="mb-4">Please confirm your participation in the medical camp.</p>
                <div className="flex justify-end">
                    <button
                        onClick={toggleModal}
                        className="px-4 py-2 bg-gray-300 text-gray-800 rounded mr-2"
                    >
                        Cancel
                    </button>
                    <button
                        className="px-4 py-2 bg-blue-500 text-white rounded"
                    >
                        Confirm
                    </button>
                </div>
            </div>
        </div>

    );
};

export default JoinCampModal;
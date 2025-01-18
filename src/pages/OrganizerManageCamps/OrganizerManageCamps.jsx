import React, { useEffect, useState } from "react";
import Swal from "sweetalert2"; // Import SweetAlert
import { useNavigate } from "react-router-dom";
import useAxiosSecure from "../../hooks/useAxiosSecure";
// Import the secure Axios hook

const OrganizerManageCamps = () => {
    const [camps, setCamps] = useState([]);
    const navigate = useNavigate();
    const axiosSecure = useAxiosSecure(); // Initialize the secure Axios instance

    // Fetch camps from the server
    useEffect(() => {
        const fetchCamps = async () => {
            try {
                const response = await axiosSecure.get("/camps"); // Use the secure Axios instance
                setCamps(response.data);
            } catch (error) {
                console.error("Error fetching camps:", error);
            }
        };
        fetchCamps();
    }, [axiosSecure]);

    // Handle Delete Camp
    const handleDelete = async (campId) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Yes, delete it!",
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    await axiosSecure.delete(`/camps/${campId}`); // Use the secure Axios instance
                    setCamps((prevCamps) =>
                        prevCamps.filter((camp) => camp._id !== campId)
                    );
                    Swal.fire("Deleted!", "The camp has been deleted.", "success");
                } catch (error) {
                    console.error("Error deleting camp:", error);
                    Swal.fire("Error!", "Failed to delete the camp.", "error");
                }
            }
        });
    };

    // Redirect to Update Camp Page
    const handleUpdate = (campId) => {
        navigate(`/dashboard/updateCamp/${campId}`);
    };

    return (
        <div className="container mx-auto p-6">
            <h1 className="text-2xl font-bold mb-4">Manage Camps</h1>
            <table className="min-w-full table-auto border-collapse border border-gray-200">
                <thead>
                    <tr className="bg-gray-100">
                        <th className="border px-4 py-2">Name</th>
                        <th className="border px-4 py-2">Date & Time</th>
                        <th className="border px-4 py-2">Location</th>
                        <th className="border px-4 py-2">Healthcare Professional</th>
                        <th className="border px-4 py-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {camps.map((camp) => (
                        <tr key={camp._id} className="text-center">
                            <td className="border px-4 py-2">{camp.campName}</td>
                            <td className="border px-4 py-2">{camp.dateTime}</td>
                            <td className="border px-4 py-2">{camp.location}</td>
                            <td className="border px-4 py-2">
                                {camp.healthcareProfessionalName}
                            </td>
                            <td className="border px-4 py-2">
                                <button
                                    className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
                                    onClick={() => handleUpdate(camp._id)}
                                >
                                    Update
                                </button>
                                <button
                                    className="bg-red-500 text-white px-4 py-2 rounded"
                                    onClick={() => handleDelete(camp._id)}
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default OrganizerManageCamps;

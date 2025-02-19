import React, { useEffect, useState } from "react";
import Swal from "sweetalert2"; // Import SweetAlert
import { useNavigate } from "react-router-dom";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { Helmet } from "react-helmet";

const OrganizerManageCamps = () => {
    const [camps, setCamps] = useState([]);
    const [filteredCamps, setFilteredCamps] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const navigate = useNavigate();
    const axiosSecure = useAxiosSecure(); // Initialize the secure Axios instance

    // Fetch camps from the server
    useEffect(() => {
        const fetchCamps = async () => {
            try {
                const response = await axiosSecure.get("/camps"); // Use the secure Axios instance
                setCamps(response.data);
                setFilteredCamps(response.data); // Initialize filteredCamps with all camps
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
                    setFilteredCamps((prevCamps) =>
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

    // Handle Search Input
    const handleSearch = (e) => {
        const query = e.target.value.toLowerCase();
        setSearchQuery(query);

        // Filter camps based on the search query
        const filtered = camps.filter(
            (camp) =>
                camp.campName.toLowerCase().includes(query) ||
                camp.healthcareProfessionalName.toLowerCase().includes(query)
        );
        setFilteredCamps(filtered);
    };

    return (
        <>
            <Helmet>
                <title>Mediflow | ManageCamps</title>
            </Helmet>

            <div className="container mx-auto p-6">
                <h1 className="text-2xl font-bold mb-4">Manage Camps</h1>

                {/* Search Bar */}
                <div className="mb-4">
                    <input
                        type="text"
                        placeholder="Search by camp name or healthcare professional"
                        value={searchQuery}
                        onChange={handleSearch}
                        className="border bg-white dark:bg-gray-800  border-gray-300 px-4 py-2 rounded w-1/2"
                    />
                </div>

                {/* Table */}
                <div className="overflow-x-auto">
                    <table className="table-auto  w-full border-collapse border border-gray-200">
                        <thead>
                            <tr className="bg-white dark:bg-gray-800 ">
                                <th className="border px-4 py-2">Name</th>
                                <th className="border px-4 py-2">Date & Time</th>
                                <th className="border px-4 py-2">Location</th>
                                <th className="border px-4 py-2">Healthcare Professional</th>
                                <th className="border px-4 py-2">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredCamps.map((camp) => (
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
            </div>
        </>
    );
};

export default OrganizerManageCamps;

import React, { useEffect, useState } from "react";

import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const ManageRegisteredCamp = () => {
    const axiosSecure = useAxiosSecure();
    const [camps, setCamps] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCamps = async () => {
            try {
                const { data } = await axiosSecure.get("/registerCamps");
                setCamps(data);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching camps:", error);
                setLoading(false);
            }
        };
        fetchCamps();
    }, [axiosSecure]);

    const handleConfirm = async (id) => {
        try {
            const result = await Swal.fire({
                title: "Are you sure?",
                text: "You want to confirm this payment?",
                icon: "question",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, confirm it!",
            });

            if (result.isConfirmed) {
                await axiosSecure.put(`/registerCamps/${id}`, {
                    confirmationStatus: "Confirmed",
                });
                setCamps((prevCamps) =>
                    prevCamps.map((camp) =>
                        camp._id === id
                            ? { ...camp, confirmationStatus: "Confirmed" }
                            : camp
                    )
                );
                Swal.fire("Confirmed!", "Payment has been confirmed.", "success");
            }
        } catch (error) {
            console.error("Error confirming payment:", error);
        }
    };

    const handleCancel = async (id) => {
        const campToCancel = camps.find((camp) => camp._id === id);
        if (
            campToCancel.paymentStatus === "Paid" &&
            campToCancel.confirmationStatus === "Confirmed"
        ) {
            Swal.fire("Error", "You cannot cancel a confirmed and paid registration.", "error");
            return;
        }

        const result = await Swal.fire({
            title: "Are you sure?",
            text: "You want to cancel this registration?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Yes, cancel it!",
        });

        if (result.isConfirmed) {
            try {
                await axiosSecure.delete(`/registerCamps/${id}`);
                setCamps((prevCamps) => prevCamps.filter((camp) => camp._id !== id));
                Swal.fire("Cancelled!", "The registration has been canceled.", "success");
            } catch (error) {
                console.error("Error canceling registration:", error);
            }
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Manage Registered Camps</h1>
            <div className="overflow-x-auto">
                <table className="table-auto w-full border-collapse border border-gray-300">
                    <thead>
                        <tr className="bg-gray-200">
                            <th className="border px-4 py-2">Camp Name</th>
                            <th className="border px-4 py-2">Camp Fees</th>
                            <th className="border px-4 py-2">Participant Name</th>
                            <th className="border px-4 py-2">Payment Status</th>
                            <th className="border px-4 py-2">Confirmation Status</th>
                            <th className="border px-4 py-2">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {camps.map((camp) => (
                            <tr key={camp._id} className="hover:bg-gray-100">
                                <td className="border px-4 py-2">{camp.campName}</td>
                                <td className="border px-4 py-2">${camp.campFees}</td>
                                <td className="border px-4 py-2">{camp.participantName}</td>
                                <td className="border px-4 py-2">
                                    {camp.paymentStatus === "Paid" ? (
                                        <span className="text-green-600">Paid</span>
                                    ) : (
                                        <span className="text-red-600">Unpaid</span>
                                    )}
                                </td>
                                <td className="border px-4 py-2">
                                    {camp.confirmationStatus === "Confirmed" ? (
                                        <span className="text-green-600">Confirmed</span>
                                    ) : (
                                        <button
                                            className="bg-yellow-400 text-white px-3 py-1 rounded"
                                            onClick={() => handleConfirm(camp._id)}
                                        >
                                            Pending
                                        </button>
                                    )}
                                </td>
                                <td className="border px-4 py-2">
                                    <button
                                        className={`bg-red-500 text-white px-3 py-1 rounded ${
                                            camp.paymentStatus === "Paid" &&
                                            camp.confirmationStatus === "Confirmed"
                                                ? "opacity-50 cursor-not-allowed"
                                                : ""
                                        }`}
                                        onClick={() => handleCancel(camp._id)}
                                        disabled={
                                            camp.paymentStatus === "Paid" &&
                                            camp.confirmationStatus === "Confirmed"
                                        }
                                    >
                                        Cancel
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManageRegisteredCamp;

import { Link, useNavigate } from "react-router-dom";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useCampCart from "../../../hooks/useCampCart";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet";

const CampCart = () => {
    const { camp = [], refetch, isLoading, error } = useCampCart();
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();
    const totalPrice = camp.reduce((total, item) => total + (parseFloat(item.campFees) || 0), 0);

    const handleCancel = async (id) => {
        try {
            await axiosSecure.delete(`/registerCamps/${id}`);
            refetch();
            Swal.fire("Cancelled", "Your registration has been cancelled.", "info");
        } catch (error) {
            Swal.fire("Error", "Cancellation failed. Please try again.", "error");
        }
    };

    const handlePayment = (item) => {
        navigate('/dashboard/payment', { state: { campItem: item } });
    };

    const handleFeedback = (campId) => {
        navigate(`/dashboard/feedback/${campId}`);
    };

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error fetching data</div>;
    }

    return (
        <>
            <Helmet>
                <title>Mediflow | CampCart</title>
            </Helmet>

            <div className="p-6 bg-white dark:bg-gray-900 text-gray-900 dark:text-white min-h-screen">
                {camp.length === 0 ? (
                    <div className="text-center text-lg text-gray-500 dark:text-gray-300">
                        <p>No registered camps found.</p>
                        <p>Go back to the camps list and register for one!</p>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <div className="flex justify-evenly mb-8">
                            <h2 className="text-4xl">Camps: {camp.length}</h2>
                            <h2 className="text-4xl">Total Price: {totalPrice}</h2>
                            {camp.length ? (
                                <Link to="/dashboard/payment">
                                    <button className="btn btn-primary">Pay</button>
                                </Link>
                            ) : (
                                <button disabled className="btn btn-primary">Pay</button>
                            )}
                        </div>
                        <table className="table w-full border-collapse border border-gray-300 dark:border-gray-700">
                            <thead>
                                <tr className="bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white">
                                    <th className="border border-gray-300 dark:border-gray-700 px-4 py-2">#</th>
                                    <th className="border border-gray-300 dark:border-gray-700 px-4 py-2">Camp Name</th>
                                    <th className="border border-gray-300 dark:border-gray-700 px-4 py-2">Participant</th>
                                    <th className="border border-gray-300 dark:border-gray-700 px-4 py-2">Fee</th>
                                    <th className="border border-gray-300 dark:border-gray-700 px-4 py-2">Status</th>
                                    <th className="border border-gray-300 dark:border-gray-700 px-4 py-2">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {camp.map((item, index) => (
                                    <tr key={item._id} className="dark:bg-gray-800">
                                        <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">{index + 1}</td>
                                        <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">{item.campName}</td>
                                        <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">{item.participantName}</td>
                                        <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">${item.campFees}</td>
                                        <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">
                                            {item.paid ? (
                                                <span className="text-green-600">Paid</span>
                                            ) : (
                                                <span className="text-red-600">Unpaid</span>
                                            )}
                                        </td>
                                        <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">
                                            {!item.paid && (
                                                <button
                                                    onClick={() => handleCancel(item._id)}
                                                    className="btn btn-warning mr-2"
                                                >
                                                    Cancel
                                                </button>
                                            )}
                                            {item.paid && item.confirmed && (
                                                <button
                                                    onClick={() => handleFeedback(item._id)}
                                                    className="btn btn-success"
                                                >
                                                    Feedback
                                                </button>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </>
    );
};

export default CampCart;

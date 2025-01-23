import { Link, useNavigate } from "react-router-dom";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useCampCart from "../../../hooks/useCampCart";
import Swal from "sweetalert2";

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
        <div>
            <h2 className="text-4xl mb-8">Registered Camps</h2>
            {camp.length === 0 ? (
                <div className="text-center text-lg text-gray-500">
                    <p>No registered camps found.</p>
                    <p>Go back to the camps list and register for one!</p>
                </div>
            ) : (
                <div className="overflow-x-auto">
                    <div className="flex justify-evenly mb-8">
                        <h2 className="text-4xl">Camps: {camp.length}</h2>
                        <h2 className="text-4xl">Total Price: {totalPrice}</h2>
                        {camp.length ? <Link to="/dashboard/payment">
                            <button className="btn btn-primary">Pay</button>
                        </Link> :
                            <button disabled className="btn btn-primary">Pay</button>
                        }

                    </div>
                    <table className="table w-full">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Camp Name</th>
                                <th>Participant</th>
                                <th>Fee</th>
                                <th>Status</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {camp.map((item, index) => (
                                <tr key={item._id}>
                                    <td>{index + 1}</td>
                                    <td>{item.campName}</td>
                                    <td>{item.participantName}</td>
                                    <td>${item.campFees}</td>
                                    <td>
                                        {item.paid ? (
                                            <span className="text-green-600">Paid</span>
                                        ) : (
                                            <span className="text-red-600">Unpaid</span>
                                        )}
                                    </td>
                                    <td>

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
    );
};

export default CampCart;

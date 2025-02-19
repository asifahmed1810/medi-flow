import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useContext } from "react";
import { AuthContext } from "../../../providers/AuthProvider";
import { Helmet } from "react-helmet";

const PaymentHistory = () => {
    const { user } = useContext(AuthContext);
    const axiosSecure = useAxiosSecure();

    // Prevent running the query if user or user.email is not available
    const { data: payments = [] } = useQuery({
        queryKey: ['payments', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/payments/${user.email}`);
            return res.data;
        },
        enabled: !!user?.email, // Only run query if user.email exists
    });

    return (
        <>
            <Helmet>
                <title>Mediflow | PaymentHistory</title>
            </Helmet>
            <div>
                <h2 className="text-3xl">Total Payments: {payments.length}</h2>
                <div className="overflow-x-auto">
                    <table className="table table-zebra">
                        {/* head */}
                        <thead>
                            <tr className="bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white">
                                <th>#</th>
                                <th>Price</th>
                                <th>Transaction Id</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {payments.map((payment, index) => (
                                <tr key={payment._id}>
                                    <th>{index + 1}</th>
                                    <td>${payment.price}</td>
                                    <td>{payment.transactionId}</td>
                                    <td>{payment.status}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>

    );
};

export default PaymentHistory;

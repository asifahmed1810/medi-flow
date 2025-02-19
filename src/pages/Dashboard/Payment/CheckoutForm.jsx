import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useContext, useEffect, useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import useCampCart from "../../../hooks/useCampCart";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../providers/AuthProvider";

const CheckoutForm = ({ campItem }) => {
    const [error, setError] = useState("");
    const [clientSecret, setClientSecret] = useState("");
    const [transactionId, setTransactionId] = useState("");
    const stripe = useStripe();
    const elements = useElements();
    const { user } = useContext(AuthContext);
    const axiosSecure = useAxiosSecure();
    const { camp, refetch } = useCampCart();
    const navigate = useNavigate();
    const totalPrice = camp.reduce((total, item) => total + (parseFloat(item.campFees) || 0), 0);

    useEffect(() => {
        if (totalPrice > 0) {
            axiosSecure.post('/create-payment-intent', { price: totalPrice })
                .then(res => {
                    console.log(res.data.clientSecret);
                    setClientSecret(res.data.clientSecret);
                })
        }

    }, [axiosSecure, totalPrice])

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) {
            return; // Ensure Stripe and Elements are loaded
        }

        const card = elements.getElement(CardElement);

        if (!card) {
            setError("Card element not found.");
            return;
        }

        // Create a payment method
        const { error: paymentError, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card,
        });

        if (paymentError) {
            console.error('Payment method creation error:', paymentError);
            setError(paymentError.message);
            return;
        }

        setError(''); // Clear any existing errors

        // Confirm the payment intent
        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card,
                billing_details: {
                    email: user?.email || 'anonymous',
                    name: user?.displayName || 'anonymous',
                },
            },
        });

        if (confirmError) {
            console.error('Payment confirmation error:', confirmError);
            setError(confirmError.message);
            return;
        }

        if (paymentIntent.status === 'succeeded') {
            setTransactionId(paymentIntent.id);

            // Prepare payment data for saving
            const payment = {
                email: user.email,
                price: totalPrice,
                transactionId: paymentIntent.id,
                date: new Date().toISOString(), // Ensure UTC format
                campIds: camp.map((item) => item._id), // Fixed: Replaced cart with camp
                status: 'pending',
            };

            try {
                // Save payment details to the server
                const response = await axiosSecure.post('/payments', payment);
                console.log('Payment saved:', response.data);

                // Refetch data and navigate on success
                refetch();
                if (response.data?.paymentResult?.insertedId) {
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "Payment successful! Thank you.",
                        showConfirmButton: false,
                        timer: 1500,
                    });
                    navigate('/dashboard/paymentHistory');
                }
            } catch (saveError) {
                console.error('Error saving payment:', saveError);
                Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: "Payment was processed, but saving details failed. Contact support.",
                });
            }
        }
    };








    return (
        <div className="p-6 bg-white dark:bg-gray-900 text-gray-900 dark:text-white min-h-screen">
        <form onSubmit={handleSubmit}>
            <CardElement className="bg-gray-100 dark:bg-gray-800 p-3 rounded-md" />
            <button className="btn btn-primary my-4" type="submit" disabled={!stripe || !clientSecret}>
                Pay
            </button>
            {error && <p className="text-red-600">{error}</p>}
            {transactionId && <p className="text-green-600">Transaction ID: {transactionId}</p>}
        </form>
    </div>
    
    );
};

export default CheckoutForm;

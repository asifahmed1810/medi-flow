import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { useLocation } from "react-router-dom";
import CheckoutForm from "./CheckoutForm";
import { Helmet } from "react-helmet";

const stripePromise = loadStripe(import.meta.env.VITE_Payment_Gateway_PK);

const Payment = () => {
    const location = useLocation();
    const campItem = location.state?.campItem; // Get camp item from state

    return (
        <>
            <Helmet>
                <title>Mediflow | Payment</title>
            </Helmet>

            <div>
                <h2 className="text-2xl">Payment for {campItem?.campName}</h2>
                <p className="text-lg">Amount: ${campItem?.campFees}</p>
                <div>
                    <Elements stripe={stripePromise}>
                        <CheckoutForm campItem={campItem} /> {/* Pass camp item */}
                    </Elements>
                </div>
            </div>
        </>

    );
};

export default Payment;

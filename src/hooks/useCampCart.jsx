import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";

const useCampCart = () => {
    const axiosSecure = useAxiosSecure();
    const { user } = useContext(AuthContext); // Get the user from context

    const { data: camp = [], refetch, isLoading, error } = useQuery(
        {
            queryKey: ["registerCamps", user?.email], // Query key with email to ensure it's unique
            queryFn: async () => {
                if (!user?.email) {
                    return []; // If user is not logged in, return empty array
                }
                const res = await axiosSecure.get(`/registerCamps?email=${user.email}`); // Send email as query parameter
                return res.data;
            },
            enabled: !!user?.email, // Only run the query if the user is logged in (email is present)
        }
    );

    return { camp , refetch, isLoading, error } 
};

export default useCampCart;

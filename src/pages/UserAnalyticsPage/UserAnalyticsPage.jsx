import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

const UserAnalyticsPage = () => {
    const { user } = useContext(AuthContext);
    const axiosSecure = useAxiosSecure();
    const [analyticsData, setAnalyticsData] = useState([]);

    useEffect(() => {
        const fetchAnalyticsData = async () => {
            try {
                const response = await axiosSecure.get(`/analytics/${user.email}`);
                setAnalyticsData(response.data);
            } catch (error) {
                console.error("Error fetching analytics data:", error);
            }
        };

        if (user?.email) {
            fetchAnalyticsData();
        }
    }, [user, axiosSecure]);

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">User Analytics</h2>
            {analyticsData.length > 0 ? (
                <ResponsiveContainer width="100%" height={400}>
                    <BarChart data={analyticsData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="campName" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="campFees" fill="#82ca9d" />
                    </BarChart>
                </ResponsiveContainer>
            ) : (
                <p>No analytics data available for registered camps.</p>
            )}
        </div>
    );
};

export default UserAnalyticsPage;

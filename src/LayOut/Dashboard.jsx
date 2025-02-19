import React from "react";
import { FaUser, FaList, FaSearch, FaEnvelope, FaHome } from "react-icons/fa";
import { IoMdAdd } from "react-icons/io";
import { MdAnalytics, MdManageHistory, MdPayment } from "react-icons/md";
import { NavLink, Outlet, Navigate } from "react-router-dom";
import useAdmin from "../hooks/useAdmin";
import { FaCashRegister } from "react-icons/fa6";

const Dashboard = () => {
    const [isAdmin] = useAdmin();

    return (
        <div className="flex flex-col md:flex-row min-h-screen dark:bg-gray-900 dark:text-gray-200 transition-all">
            {/* Sidebar */}
            <div className="w-full md:w-64 bg-cyan-100 dark:bg-gray-800 dark:text-gray-200 transition-all">
                <div className="md:sticky md:top-0">
                    <ul className="menu p-4 md:py-8">
                        {/* Admin Links */}
                        {isAdmin ? (
                            <>
                                <li>
                                    <NavLink to={"/dashboard/organizerProfile"} className="dark:hover:text-gray-400">
                                        <FaUser className="mr-2" /> Organizer Profile
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to={"/dashboard/addcamp"} className="dark:hover:text-gray-400">
                                        <IoMdAdd className="mr-2 font-bold" />
                                        Add A Camp
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to={"/dashboard/manageCamp"} className="dark:hover:text-gray-400">
                                        <FaList className="mr-2" />
                                        Manage Camps
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to={"/dashboard/manageregisteredcamps"} className="dark:hover:text-gray-400">
                                        <MdManageHistory className="mr-2 text-lg" />
                                        Manage Registered Camps
                                    </NavLink>
                                </li>
                            </>
                        ) : (
                            // User Links
                            <>
                                <li>
                                    <NavLink to="/dashboard/analytics" className="dark:hover:text-gray-400">
                                        <MdAnalytics className="mr-2" />
                                        Analytics
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to="/dashboard/userProfile" className="dark:hover:text-gray-400">
                                        <FaUser className="mr-2" />
                                        Profile
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to="/dashboard/campcart" className="dark:hover:text-gray-400">
                                        <FaCashRegister className="mr-2"/>
                                        Registered Camps
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to="/dashboard/paymentHistory" className="dark:hover:text-gray-400">
                                        <MdPayment className="mr-2" />
                                        Payment History
                                    </NavLink>
                                </li>
                            </>
                        )}

                        <div className="divider dark:bg-gray-600"></div>

                        {/* Common Links */}
                        <li>
                            <NavLink to={"/"} className="dark:hover:text-gray-400">
                                <FaHome className="mr-2" /> Home
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to={"/availablecamps"} className="dark:hover:text-gray-400">
                                <FaSearch className="mr-2" /> Available Camps
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to={"/contactUs"} className="dark:hover:text-gray-400">
                                <FaEnvelope className="mr-2" /> Contact Us
                            </NavLink>
                        </li>
                    </ul>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 p-4 md:p-8 dark:bg-gray-900 dark:text-gray-200">
                {/* Conditionally Navigate to the Default Page */}
                {isAdmin ? (
                    <Navigate to="/dashboard/organizerProfile" replace />
                ) : (
                    <Navigate to="/dashboard/analytics" replace />
                )}
                <Outlet />
            </div>
        </div>
    );
};

export default Dashboard;

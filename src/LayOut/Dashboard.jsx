import React from "react";
import { FaUser, FaList, FaSearch, FaEnvelope, FaHome } from "react-icons/fa";
import { IoMdAdd } from "react-icons/io";
import { MdManageHistory } from "react-icons/md";
import { NavLink, Outlet, Navigate } from "react-router-dom";
import useAdmin from "../hooks/useAdmin";

const Dashboard = () => {
    const [isAdmin] = useAdmin();

    return (
        <div className="flex flex-col md:flex-row min-h-screen">
            {/* Sidebar */}
            <div className="w-full md:w-64 bg-cyan-100">
                <div className="md:sticky md:top-0">
                    <ul className="menu p-4 md:py-8">
                        {/* Admin Links */}
                        {isAdmin ? (
                            <>
                                <li>
                                    <NavLink to={"/dashboard/organizerProfile"}>
                                        <FaUser className="mr-2" /> Organizer Profile
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to={"/dashboard/addcamp"}>
                                        <IoMdAdd className="mr-2 font-bold" />
                                        Add A Camp
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to={"/dashboard/manageCamp"}>
                                        <FaList className="mr-2" />
                                        Manage Camps
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to={"/dashboard/manageregisteredcamps"}>
                                        <MdManageHistory className="mr-2 text-lg" />
                                        Manage Registered Camps
                                    </NavLink>
                                </li>
                              
                            </>
                        ) : (
                            // User Links
                            <>
                                <li>
                                    <NavLink to="/dashboard/analytics">
                                        <FaHome className="mr-2" />
                                        Analytics
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to="/dashboard/userProfile">
                                        <FaList className="mr-2" />
                                        Profile
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to="/dashboard/registeredCamps">
                                        <FaList className="mr-2" />
                                        Registered Camps
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to="/dashboard/paymentHistory">
                                        <FaList className="mr-2" />
                                        Payment History
                                    </NavLink>
                                </li>
                            </>
                        )}

                        <div className="divider"></div>

                        {/* Common Links */}
                        <li>
                            <NavLink to={"/"}>
                                <FaHome className="mr-2" /> Home
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to={"/availablecamps"}>
                                <FaSearch className="mr-2" /> Available Camps
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to={"/contactUs"}>
                                <FaEnvelope className="mr-2" /> Contact Us
                            </NavLink>
                        </li>
                    </ul>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 p-4 md:p-8">
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

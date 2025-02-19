import React, { useContext, useEffect, useState } from 'react';
import medilogo from '../../assets/medilogo.png';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../providers/AuthProvider';
import { CiLight } from "react-icons/ci";
import { MdDarkMode } from "react-icons/md";

const Navbar = () => {
    const { user, logOut } = useContext(AuthContext);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');

    // Apply theme on mount
    useEffect(() => {
        if (theme === 'dark') {
            document.documentElement.classList.add('dark');
            document.documentElement.classList.remove('light');
        } else {
            document.documentElement.classList.add('light');
            document.documentElement.classList.remove('dark');
        }
        localStorage.setItem('theme', theme); // Store theme preference
    }, [theme]);

    // Toggle theme function
    const toggleTheme = () => {
        setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
    };

    // Handle Logout
    const handleLogOut = () => {
        logOut()
            .then(() => { })
            .catch(error => console.log(error));
    };

    // Toggle dropdown visibility
    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    const links = (
        <>
            <li><Link to={'/'}>Home</Link></li>
            <li><Link to={'/availablecamps'}>Available Camps</Link></li>
            <li><Link to={'/contactUs'}>Contact Us</Link></li>
        </>
    );

    return (
        <div className="navbar fixed z-10 w-full top-0 bg-cyan-100 dark:bg-gray-900 dark:text-white rounded-xl px-20 transition-colors">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor">
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M4 6h16M4 12h8m-8 6h16" />
                        </svg>
                    </div>
                    <ul
                        tabIndex={0}
                        className="menu menu-sm font-semibold dropdown-content bg-base-100 dark:bg-gray-800 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                        {links}
                    </ul>
                </div>
                <img className="w-14 h-14 rounded-full" src={medilogo} alt="Logo" />
            </div>
            <div className="navbar-center font-semibold hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    {links}
                </ul>
            </div>
            <div className="navbar-end space-x-3">
                {/* Theme Toggle Button */}
                <button
                    className="btn bg-base-300 dark:bg-gray-700"
                    onClick={toggleTheme}
                >
                    {theme === 'light' ? <MdDarkMode className="text-xl font-bold" /> : <CiLight className="text-xl font-bold" />}
                </button>

                {user ? (
                    <div className="relative">
                        <img
                            className="w-14 h-14 rounded-full cursor-pointer"
                            src={user.photoURL || 'https://via.placeholder.com/150'}
                            alt="User Profile"
                            onClick={toggleDropdown}
                        />
                        {isDropdownOpen && (
                            <ul className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg z-10">
                                <li className="px-4 py-2 text-gray-700 dark:text-white">{user.displayName || 'User'}</li>
                                <li>
                                    <Link
                                        to="/dashboard"
                                        className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-white">
                                        Dashboard
                                    </Link>
                                </li>
                                <li>
                                    <button
                                        onClick={handleLogOut}
                                        className="block w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-white">
                                        Logout
                                    </button>
                                </li>
                            </ul>
                        )}
                    </div>
                ) : (
                    <Link to={'/login'}>
                        <button className="btn">Join Us</button>
                    </Link>
                )}
            </div>
        </div>
    );
};

export default Navbar;

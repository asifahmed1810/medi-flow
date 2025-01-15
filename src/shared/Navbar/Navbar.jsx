import React, { useContext, useState } from 'react';
import medilogo from '../../assets/medilogo.png';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../providers/AuthProvider';

const Navbar = () => {
    const { user, logOut } = useContext(AuthContext);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

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
        <div className="navbar fixed z-10 max-w-screen-xl mx-auto top-0 bg-cyan-100 rounded-xl px-10">
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
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                        {links}
                    </ul>
                </div>
                <img className="w-14 h-14 rounded-full" src={medilogo} alt="Logo" />
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    {links}
                </ul>
            </div>
            <div className="navbar-end">
                {user ? (
                    <div className="relative">
                        <img
                            className="w-10 h-10 rounded-full cursor-pointer"
                            src={user.photoURL || 'https://via.placeholder.com/150'}
                            alt="User Profile"
                            onClick={toggleDropdown}
                        />
                        {isDropdownOpen && (
                            <ul className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10">
                                <li className="px-4 py-2 text-gray-700">{user.displayName || 'User'}</li>
                                <li>
                                    <Link
                                        to="/dashboard"
                                        className="block px-4 py-2 hover:bg-gray-100 text-gray-700">
                                        Dashboard
                                    </Link>
                                </li>
                                <li>
                                    <button
                                        onClick={handleLogOut}
                                        className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-gray-700">
                                        Logout
                                    </button>
                                </li>
                            </ul>
                        )}
                    </div>
                ) : (
                    <Link to={'/login'}>
                        <button className="btn">Join US</button>
                    </Link>
                )}
            </div>
        </div>
    );
};

export default Navbar;

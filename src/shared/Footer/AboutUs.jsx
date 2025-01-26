import React from "react";
import { Helmet } from "react-helmet";

const AboutUs = () => {
    return (
        <>
            <Helmet>
                <title>Mediflow | About us</title>
            </Helmet>

            <div className="p-6 mt-24 bg-gray-50 min-h-screen">
                <div className="container mx-auto">
                    <h1 className="text-4xl font-bold text-center mb-6 text-blue-600">About Us</h1>
                    <div className="bg-white p-8 shadow-lg rounded-lg">
                        <p className="text-lg text-gray-700 mb-4">
                            Welcome to <span className="font-bold text-blue-600">Manage Camps Platform</span>,
                            your trusted solution for organizing and managing events, camps, and participant registrations.
                            Our goal is to streamline camp organization, ensuring seamless event execution and efficient participant management.
                        </p>
                        <p className="text-lg text-gray-700 mb-4">
                            Whether you’re hosting healthcare camps, educational workshops, or recreational events,
                            our platform empowers you with all the tools you need to create and manage your events effortlessly.
                        </p>
                        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Our Mission</h2>
                        <p className="text-lg text-gray-700 mb-4">
                            Our mission is to simplify event management for organizers and enhance the experience for participants.
                            We aim to bring innovation and efficiency to event organization through cutting-edge technology.
                        </p>
                        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Why Choose Us?</h2>
                        <ul className="list-disc pl-6 text-lg text-gray-700">
                            <li>Secure and user-friendly platform for managing camps and registrations.</li>
                            <li>Real-time updates and seamless data synchronization.</li>
                            <li>Powerful tools to track payment and confirmation status.</li>
                            <li>Responsive design for easy access on any device.</li>
                            <li>Dynamic management of participants and event information.</li>
                            <li>Customizable event settings for diverse needs.</li>
                        </ul>
                        <h2 className="text-2xl font-semibold text-gray-800 mt-6 mb-4">Contact Us</h2>
                        <p className="text-lg text-gray-700">
                            Have questions or need support? Feel free to reach out to us at:
                            <span className="font-semibold text-blue-600"> support@managecamps.com</span>.
                        </p>
                    </div>
                </div>
            </div>
        </>

    );
};

export default AboutUs;

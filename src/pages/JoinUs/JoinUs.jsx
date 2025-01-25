import React from 'react';
import { Helmet } from 'react-helmet';

const JoinUs = () => {
    return (
        <>
            <Helmet>
                <title>Mediflow | Contact Us</title>
            </Helmet>
            <div className="container mx-auto my-20 px-6 lg:px-20">
                <h1 className="text-4xl font-bold text-center mb-8">Contact Us</h1>
                <p className="text-center text-lg mb-12">
                    Have any questions, feedback, or need support? We’d love to hear from you! Reach out to us using the information below, and our team will get back to you promptly.
                </p>

                <div className="grid lg:grid-cols-2 gap-12">
                    {/* Contact Form */}
                    <div className="bg-base-200 dark:bg-gray-700 p-8 rounded-2xl shadow-lg">
                        <h2 className="text-2xl font-semibold mb-6">Get in Touch</h2>
                        <form>
                            <div className="mb-6">
                                <label className="block text-sm font-medium mb-2" htmlFor="name">
                                    Your Name
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    placeholder="Enter your name"
                                    className="w-full p-3 rounded-lg border border-gray-300 focus:ring focus:ring-indigo-300"
                                />
                            </div>
                            <div className="mb-6">
                                <label className="block text-sm font-medium mb-2" htmlFor="email">
                                    Email Address
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    placeholder="Enter your email"
                                    className="w-full p-3 rounded-lg border border-gray-300 focus:ring focus:ring-indigo-300"
                                />
                            </div>
                            <div className="mb-6">
                                <label className="block text-sm font-medium mb-2" htmlFor="message">
                                    Your Message
                                </label>
                                <textarea
                                    id="message"
                                    rows="5"
                                    placeholder="Write your message here"
                                    className="w-full p-3 rounded-lg border border-gray-300 focus:ring focus:ring-indigo-300"
                                ></textarea>
                            </div>
                            <button
                                type="submit"
                                className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg w-full font-medium"
                            >
                                Send Message
                            </button>
                        </form>
                    </div>

                    {/* Contact Info */}
                    <div className="bg-base-200 dark:bg-gray-700 p-8 rounded-2xl shadow-lg">
                        <h2 className="text-2xl font-semibold mb-6">Contact Information</h2>
                        <p className="mb-6">
                            Feel free to reach out to us for any inquiries related to Mediflow. We’re here to assist you!
                        </p>
                        <div className="mb-6">
                            <h3 className="text-lg font-medium">Email</h3>
                            <p>support@mediflow.com</p>
                        </div>
                        <div className="mb-6">
                            <h3 className="text-lg font-medium">Phone</h3>
                            <p>+1 (555) 123-4567</p>
                        </div>
                        <div className="mb-6">
                            <h3 className="text-lg font-medium">Address</h3>
                            <p>
                                123 Mediflow Street, <br />
                                HealthTech City, <br />
                                USA
                            </p>
                        </div>
                        <div>
                            <h3 className="text-lg font-medium">Follow Us</h3>
                            <div className="flex space-x-4 mt-4">
                                <a href="https://facebook.com/mediflow" target="_blank" rel="noreferrer" className="text-blue-600">
                                    Facebook
                                </a>
                                <a href="https://twitter.com/mediflow" target="_blank" rel="noreferrer" className="text-blue-400">
                                    Twitter
                                </a>
                                <a href="https://linkedin.com/company/mediflow" target="_blank" rel="noreferrer" className="text-blue-700">
                                    LinkedIn
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default JoinUs;

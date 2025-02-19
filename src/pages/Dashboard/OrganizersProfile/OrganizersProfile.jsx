import React, { useContext, useState, useEffect } from "react";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure"; // Import the hook
import { AuthContext } from "../../../providers/AuthProvider";
import { Helmet } from "react-helmet";

const OrganizersProfile = () => {
    const { user, updateUserProfile } = useContext(AuthContext);
    const axiosSecure = useAxiosSecure(); // Use the secure Axios instance
    const [profile, setProfile] = useState({
        name: "",
        image: "",
        contact: "",
        email: "",
    });

    const [initialProfile, setInitialProfile] = useState({
        name: "",
        image: "",
        contact: "",
        email: "",
    });

    const [loading, setLoading] = useState(true);

    // Fetch user data from the backend
    useEffect(() => {
        if (!user?.email) return;

        console.log("Fetching profile for user:", user.email);

        axiosSecure
            .get(`/users?email=${user.email}`) // Use the secure Axios instance
            .then((response) => {
                console.log("Fetched profile data:", response.data);

                if (Array.isArray(response.data) && response.data.length > 0) {
                    const userData = { ...response.data[0], email: user.email };
                    setProfile(userData);
                    setInitialProfile(userData);
                    setLoading(false);
                } else {
                    console.error("Profile data is not in expected format.");
                    setLoading(false);
                }
            })
            .catch((error) => {
                console.error("Error fetching profile data:", error);
                setLoading(false);
            });
    }, [user?.email, axiosSecure]);

    // Handle input changes
    const handleChange = (event) => {
        const { name, value } = event.target;
        setProfile({ ...profile, [name]: value });
    };

    // Check if the profile data has changed
    const isProfileUpdated = () => {
        return (
            profile.name !== initialProfile.name ||
            profile.image !== initialProfile.image ||
            profile.contact !== initialProfile.contact
        );
    };

    // Handle form submission
    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!profile.email) {
            Swal.fire({
                icon: "error",
                title: "Email is required to update the profile.",
                showConfirmButton: false,
                timer: 1500,
            });
            return;
        }

        try {
            // Update Firebase user profile
            await updateUserProfile(profile.name, profile.image);

            // Update backend profile if any changes are made
            if (isProfileUpdated()) {
                const response = await axiosSecure.put("/users", profile); // Use the secure Axios instance

                if (response.data.modifiedCount > 0) {
                    setInitialProfile(profile); // Update the initial profile
                    Swal.fire({
                        icon: "success",
                        title: "Profile updated successfully!",
                        showConfirmButton: false,
                        timer: 1500,
                    });
                } else {
                    Swal.fire({
                        icon: "success",
                        title: "Profile updated successfully!",
                        showConfirmButton: false,
                        timer: 1500,
                    });
                }
            } else {
                Swal.fire({
                    icon: "info",
                    title: "No changes were made to the profile.",
                    showConfirmButton: false,
                    timer: 1500,
                });
            }
        } catch (error) {
            console.error("Error updating profile:", error);
            Swal.fire({
                icon: "error",
                title: "Failed to update profile. Please try again.",
                showConfirmButton: false,
                timer: 1500,
            });
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <Helmet>
                <title>Mediflow | Profile</title>
            </Helmet>

            <div className="container mx-auto mt-10 p-5 max-w-2xl">
                <h2 className="text-3xl font-bold mb-5">Manage Organizer Profile</h2>
                <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="form-control">
                        <label className="label font-bold" htmlFor="name">
                            Name
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={profile.name} // Prefilled with profile.name
                            onChange={handleChange}
                            className="input bg-white dark:bg-gray-800  input-bordered w-full"
                            required
                        />
                    </div>
                    <div className="form-control">
                        <label className="label font-bold" htmlFor="image">
                            Profile Image URL
                        </label>
                        <input
                            type="text"
                            id="image"
                            name="image"
                            value={profile.image} // Prefilled with profile.image
                            onChange={handleChange}
                            className="input bg-white dark:bg-gray-800  input-bordered w-full"
                            required
                        />
                    </div>
                    <div className="form-control">
                        <label className="label font-bold" htmlFor="contact">
                            Contact Details
                        </label>
                        <input
                            type="text"
                            id="contact"
                            name="contact"
                            value={profile.contact} // Prefilled with profile.contact
                            onChange={handleChange}
                            className="input bg-white dark:bg-gray-800  input-bordered w-full"
                            placeholder="Enter your contact details"
                        />
                    </div>
                    <button type="submit" className="btn btn-primary">
                        Update Profile
                    </button>
                </form>
            </div>
        </>

    );
};

export default OrganizersProfile;

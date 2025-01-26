import React, { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../../providers/AuthProvider';
import Swal from 'sweetalert2';
import axios from 'axios'; // Import axios to make HTTP requests
import { Helmet } from 'react-helmet';

const UserProfile = () => {
  const { user } = useContext(AuthContext); // Access user data from context
  const [profile, setProfile] = useState({
    name: '',
    image: '',
    contact: '',
  });

  const [isEditing, setIsEditing] = useState(false); // State to toggle between viewing and editing mode

  useEffect(() => {
    if (user) {
      // Prefill the profile with logged-in user's data
      setProfile({
        name: user.displayName || '',
        image: user.photoURL || 'https://via.placeholder.com/150', // Default image if not available
        contact: '', // Assuming contact info is not available by default
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();

    if (!user || !user.email) {
      Swal.fire({
        icon: 'error',
        title: 'Email is required to update the profile.',
        showConfirmButton: false,
        timer: 1500,
      });
      return;
    }

    try {
      // Send the profile update request to the backend
      const response = await axios.put('https://mediflow-server-eight.vercel.app/users', {
        email: user.email,  // Send email as part of the update request
        name: profile.name,
        image: profile.image,
        contact: profile.contact,
      });

      if (response.status === 200) {
        Swal.fire({
          icon: 'success',
          title: 'Profile updated successfully!',
          showConfirmButton: false,
          timer: 1500,
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: response.data.message || 'Failed to update profile. Please try again.',
          showConfirmButton: false,
          timer: 1500,
        });
      }

      // After successful update, exit the editing mode
      setIsEditing(false);
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Failed to update profile. Please try again.',
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  if (!user) {
    return <p>Please log in to view and manage your profile.</p>;
  }

  return (
    <>
      <Helmet>
        <title>Mediflow | Profile</title>
      </Helmet>
      <div className="container mx-auto mt-10 p-5 max-w-2xl">
        <h2 className="text-3xl font-bold mb-5">Manage Your Profile</h2>

        {!isEditing ? (
          // Display profile if not editing
          <div>
            <div className="mb-5">
              <img
                src={profile.image}
                alt="Profile"
                className="w-32 h-32 rounded-full object-cover"
              />
            </div>
            <div className="mb-5">
              <p className="text-xl font-semibold">{profile.name}</p>
              <p>{profile.contact}</p>
            </div>
            <button
              onClick={() => setIsEditing(true)}
              className="btn btn-primary"
            >
              Update Profile
            </button>
          </div>
        ) : (
          // Show form if editing
          <form onSubmit={handleUpdateProfile} className="space-y-5">
            <div className="form-control">
              <label className="label font-bold" htmlFor="name">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={profile.name}
                onChange={handleChange}
                className="input input-bordered w-full"
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
                value={profile.image}
                onChange={handleChange}
                className="input input-bordered w-full"
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
                value={profile.contact}
                onChange={handleChange}
                className="input input-bordered w-full"
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Save Changes
            </button>
            <button
              type="button"
              onClick={() => setIsEditing(false)}
              className="btn btn-secondary ml-3"
            >
              Cancel
            </button>
          </form>
        )}
      </div>
    </>

  );
};

export default UserProfile;

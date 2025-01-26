import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet";

// Add Camp Form Component
const OrganizerAddCamp = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm();

    // Form submission handler
    const onSubmit = async (data) => {
        // Manual validation
        if (!data.campName || !data.image || !data.campFees || !data.dateTime || !data.location || !data.healthcareProfessionalName || !data.participantCount || !data.description) {
            Swal.fire({
                icon: "error",
                title: "All fields are required!",
                showConfirmButton: false,
                timer: 1500,
            });
            return;
        }

        try {
            // Post the form data to the backend
            const response = await axios.post("http://localhost:5000/camps", data);

            if (response.data) {
                Swal.fire({
                    icon: "success",
                    title: "Camp added successfully!",
                    showConfirmButton: false,
                    timer: 1500,
                });

                // Reset the form after successful submission
                reset();
            }
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Error adding camp. Please try again.",
                showConfirmButton: false,
                timer: 1500,
            });
        }
    };

    return (
        <>
            <Helmet>
                <title>Mediflow | AddCamp</title>
            </Helmet>

            <div className="container mx-auto p-5">
                <h2 className="text-3xl font-bold mb-5">Add New Camp</h2>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                    {/* Camp Name */}
                    <div className="form-control">
                        <label htmlFor="campName" className="label font-bold">
                            Camp Name
                        </label>
                        <input
                            type="text"
                            id="campName"
                            {...register("campName", { required: "Camp Name is required" })}
                            className="input input-bordered w-full"
                        />
                        {errors.campName && <p className="text-red-500 text-sm">{errors.campName.message}</p>}
                    </div>

                    {/* Image URL */}
                    <div className="form-control">
                        <label htmlFor="image" className="label font-bold">
                            Image URL
                        </label>
                        <input
                            type="text"
                            id="image"
                            {...register("image", { required: "Image URL is required" })}
                            className="input input-bordered w-full"
                        />
                        {errors.image && <p className="text-red-500 text-sm">{errors.image.message}</p>}
                    </div>

                    {/* Camp Fees */}
                    <div className="form-control">
                        <label htmlFor="campFees" className="label font-bold">
                            Camp Fees
                        </label>
                        <input
                            type="number"
                            id="campFees"
                            {...register("campFees", { required: "Camp Fees are required", min: { value: 0, message: "Camp Fees cannot be negative" } })}
                            className="input input-bordered w-full"
                        />
                        {errors.campFees && <p className="text-red-500 text-sm">{errors.campFees.message}</p>}
                    </div>

                    {/* Date & Time */}
                    <div className="form-control">
                        <label htmlFor="dateTime" className="label font-bold">
                            Date & Time
                        </label>
                        <input
                            type="datetime-local"
                            id="dateTime"
                            {...register("dateTime", { required: "Date & Time is required" })}
                            className="input input-bordered w-full"
                        />
                        {errors.dateTime && <p className="text-red-500 text-sm">{errors.dateTime.message}</p>}
                    </div>

                    {/* Location */}
                    <div className="form-control">
                        <label htmlFor="location" className="label font-bold">
                            Location
                        </label>
                        <input
                            type="text"
                            id="location"
                            {...register("location", { required: "Location is required" })}
                            className="input input-bordered w-full"
                        />
                        {errors.location && <p className="text-red-500 text-sm">{errors.location.message}</p>}
                    </div>

                    {/* Healthcare Professional Name */}
                    <div className="form-control">
                        <label htmlFor="healthcareProfessionalName" className="label font-bold">
                            Healthcare Professional Name
                        </label>
                        <input
                            type="text"
                            id="healthcareProfessionalName"
                            {...register("healthcareProfessionalName", { required: "Healthcare Professional Name is required" })}
                            className="input input-bordered w-full"
                        />
                        {errors.healthcareProfessionalName && <p className="text-red-500 text-sm">{errors.healthcareProfessionalName.message}</p>}
                    </div>

                    {/* Participant Count */}
                    <div className="form-control">
                        <label htmlFor="participantCount" className="label font-bold">
                            Participant Count
                        </label>
                        <input
                            type="number"
                            id="participantCount"
                            {...register("participantCount", { required: "Participant count is required", min: { value: 0, message: "Participant count cannot be negative" } })}
                            className="input input-bordered w-full"
                        />
                        {errors.participantCount && <p className="text-red-500 text-sm">{errors.participantCount.message}</p>}
                    </div>

                    {/* Description */}
                    <div className="form-control">
                        <label htmlFor="description" className="label font-bold">
                            Description
                        </label>
                        <textarea
                            id="description"
                            {...register("description", { required: "Description is required" })}
                            className="textarea textarea-bordered w-full"
                            rows="4"
                        />
                        {errors.description && <p className="text-red-500 text-sm">{errors.description.message}</p>}
                    </div>

                    <button type="submit" className="btn btn-primary">
                        Add Camp
                    </button>
                </form>
            </div>
        </>

    );
};

export default OrganizerAddCamp;

import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

const OrganizerUpdateCamp = () => {
    const { campId } = useParams(); // Get the camp ID from the URL params
    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm();

    // Fetch the camp details and prefill the form
    useEffect(() => {
        const fetchCampDetails = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/camps/${campId}`);
                const { _id, ...campData } = response.data; // Exclude _id from prefilled values

                Object.keys(campData).forEach((key) => {
                    setValue(key, campData[key]);
                });
            } catch (error) {
                Swal.fire({
                    icon: "error",
                    title: "Error fetching camp details.",
                    text: "Please try again later.",
                });
            }
        };

        fetchCampDetails();
    }, [campId, setValue]);

    // Form submission handler
    const onSubmit = async (data) => {
        try {
            const { _id, ...updateData } = data; // Exclude _id from the update payload

            const response = await axios.put(`http://localhost:5000/camps/${campId}`, updateData);

            if (response.data) {
                Swal.fire({
                    icon: "success",
                    title: "Camp updated successfully!",
                    showConfirmButton: false,
                    timer: 1500,
                });
            }
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Error updating camp. Please try again.",
                showConfirmButton: false,
                timer: 1500,
            });
        }
    };


    return (
        <div className="container mx-auto p-5">
            <h2 className="text-3xl font-bold mb-5">Update Camp</h2>
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
                        {...register("campFees", { required: "Camp Fees are required" })}
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
                        {...register("participantCount", { required: "Participant count is required" })}
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
                    Update Camp
                </button>
            </form>
        </div>
    );
};

export default OrganizerUpdateCamp;

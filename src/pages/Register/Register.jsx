import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { AuthContext } from '../../providers/AuthProvider';
import { Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import axios from 'axios';
import Swal from 'sweetalert2';
import SocialLogin from '../SocialLogin/SocialLogin';

const Register = () => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const { createUser, updateUserProfile } = useContext(AuthContext);
    const navigate = useNavigate();

    const onSubmit = async (data) => {
        try {
            const result = await createUser(data.email, data.password);
            const loggedUser = result.user;
    
            await updateUserProfile(data.name, data.photoURL);
    
            const userInfo = { name: data.name, email: data.email };
            const res = await axios.post('https://mediflow-server-eight.vercel.app/users', userInfo);
    
            if (res.data.insertedId) {
                reset();
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'User created successfully.',
                    showConfirmButton: false,
                    timer: 1500
                });
                navigate('/');
            }
        } catch (error) {
            console.error('Registration error:', error);
            if (error.code === 'auth/email-already-in-use') {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'The email address is already in use. Please log in or use a different email.'
                });
            }
        }
    };

    return (
        <>
            <Helmet>
                <title>Mediflow | Sign Up</title>
            </Helmet>
            <div className="hero mt-20 min-h-screen bg-base-100 dark:bg-gray-900 dark:text-gray-200 transition-all">
                <div className="hero-content flex-col lg:flex">
                    <div className="text-center lg:text-left">
                        <h1 className="text-5xl mb-8 font-bold">Sign up now!</h1>
                    </div>
                    <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100 dark:bg-gray-800 dark:text-white">
                        <form onSubmit={handleSubmit(onSubmit)} className="card-body">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text dark:text-gray-300">Name</span>
                                </label>
                                <input 
                                    type="text" 
                                    {...register("name", { required: true })} 
                                    placeholder="Name" 
                                    className="input input-bordered dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                />
                                {errors.name && <span className="text-red-600">Name is required</span>}
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text dark:text-gray-300">Photo URL</span>
                                </label>
                                <input 
                                    type="text"  
                                    {...register("photoURL", { required: true })} 
                                    placeholder="Photo URL" 
                                    className="input input-bordered dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                />
                                {errors.photoURL && <span className="text-red-600">Photo URL is required</span>}
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text dark:text-gray-300">Email</span>
                                </label>
                                <input 
                                    type="email"  
                                    {...register("email", { required: true })} 
                                    placeholder="Email" 
                                    className="input input-bordered dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                />
                                {errors.email && <span className="text-red-600">Email is required</span>}
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text dark:text-gray-300">Password</span>
                                </label>
                                <input 
                                    type="password"  
                                    {...register("password", {
                                        required: true,
                                        minLength: 6,
                                        maxLength: 20,
                                        pattern: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z])/
                                    })} 
                                    placeholder="Password" 
                                    className="input input-bordered dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                />
                                {errors.password?.type === 'required' && <p className="text-red-600">Password is required</p>}
                                {errors.password?.type === 'minLength' && <p className="text-red-600">Password must be 6 characters</p>}
                                {errors.password?.type === 'maxLength' && <p className="text-red-600">Password must be less than 20 characters</p>}
                                {errors.password?.type === 'pattern' && <p className="text-red-600">Password must have one Uppercase, one lowercase, one number, and one special character.</p>}
                                <label className="label">
                                    <a href="#" className="label-text-alt link link-hover dark:text-gray-400">Forgot password?</a>
                                </label>
                            </div>
                            <div className="form-control mt-6">
                                <input className="btn btn-primary dark:bg-gray-700 dark:hover:bg-gray-600" type="submit" value="Sign Up" />
                            </div>
                        </form>
                        <div className='p-4'> 
                            <p>
                                <small>Already have an account?</small> 
                                <Link className='font-semibold dark:text-blue-400' to={'/login'}>Login</Link>
                            </p>
                            <SocialLogin />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Register;

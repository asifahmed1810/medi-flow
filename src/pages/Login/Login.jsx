import React, { useContext } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../providers/AuthProvider';
import { Helmet } from 'react-helmet';
import Swal from 'sweetalert2';
import SocialLogin from '../SocialLogin/SocialLogin';

const Login = () => {
    const { signIn } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";

    const handleLogin = event => {
        event.preventDefault();
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;

        signIn(email, password)
            .then(result => {
                Swal.fire({
                    title: 'User Login Successful.',
                    showClass: {
                        popup: 'animate__animated animate__fadeInDown'
                    },
                    hideClass: {
                        popup: 'animate__animated animate__fadeOutUp'
                    }
                });
                navigate(from, { replace: true });
            });
    };

    return (
        <>
            <Helmet>
                <title>Mediflow | Login</title>
            </Helmet>
            <div className="hero mt-10 min-h-screen dark:bg-gray-900 dark:text-gray-200 transition-all">
                <div className="hero-content flex-col lg:flex">
                    <div className="text-center lg:text-left">
                        <h1 className="text-5xl font-bold">Login now!</h1>
                    </div>
                    <div className="card bg-base-100 dark:bg-gray-800 dark:text-white w-full max-w-sm shrink-0 shadow-2xl">
                        <form onSubmit={handleLogin} className="card-body">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text dark:text-gray-300">Email</span>
                                </label>
                                <input
                                    type="email"
                                    name='email'
                                    placeholder="email"
                                    className="input input-bordered dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                    required 
                                />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text dark:text-gray-300">Password</span>
                                </label>
                                <input
                                    type="password"
                                    name='password'
                                    placeholder="password"
                                    className="input input-bordered dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                    required 
                                />
                                <label className="label">
                                    <a href="#" className="label-text-alt link link-hover dark:text-gray-400">Forgot password?</a>
                                </label>
                            </div>
                            <div className="form-control mt-6">
                                <button className="btn btn-primary dark:bg-gray-700 dark:hover:bg-gray-600">Login</button>
                            </div>
                        </form>
                        <div className='p-4'>
                            <p>
                                <small>New Here?</small> 
                                <Link className='font-semibold dark:text-blue-400' to={'/register'}>
                                    Create an Account
                                </Link>
                            </p>
                            <SocialLogin />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Login;

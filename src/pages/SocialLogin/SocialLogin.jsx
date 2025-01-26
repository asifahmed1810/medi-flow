import React, { useContext } from 'react';
import { FaGoogle } from 'react-icons/fa6';

import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../providers/AuthProvider';
import axios from 'axios';

const SocialLogin = () => {
    const {googleSignIn}=useContext(AuthContext);
    
    const navigate=useNavigate();
    const handleGoogleSignIn=()=>{
        googleSignIn()
        .then(result=>{
            console.log(result.user)
            const userInfo={
                email:result.user?.email,
                name:result.user?.displayName
            }
            axios.post('https://mediflow-server-eight.vercel.app/users',userInfo)
            .then(res=>{
                console.log(res.data)
                navigate('/')
            })
        })
    }
    return (
        <div>
            <div className='divider'></div>
            <div>
                <button onClick={handleGoogleSignIn} className='btn'>
                    <FaGoogle className='mr-2'></FaGoogle>
                    Google
                </button>
            </div>
        </div>
    );
};

export default SocialLogin;
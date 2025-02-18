import React from 'react';
import { Link } from 'react-router-dom';

const Errorpage = () => {
    return (
        <div className='flex flex-col items-center justify-center mt-72 w-11/12 mx-auto '>
            <h1 className='text-2xl'>   <span className='font-bold '>404</span> | <span>This page could not be found.</span> </h1>
            <div className='mt-8'>
                <h2 className='text-xl'>Go to <span><Link to={'/'}><button className='btn font-semibold'>Home</button></Link></span> page</h2>
            </div>
            
        </div>
    );
};

export default Errorpage;
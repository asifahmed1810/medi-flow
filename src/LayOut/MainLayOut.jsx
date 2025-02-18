import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../shared/Navbar/Navbar';
import Footer from '../shared/Footer/Footer';
import { Pagination } from 'swiper/modules';

const MainLayOut = () => {
    return (
        <div>
            <Navbar></Navbar>
            <div className='max-w-screen-xl mx-auto'>
            <Outlet></Outlet>
            </div>
            
            
            <Footer></Footer>
        </div>
    );
};

export default MainLayOut;
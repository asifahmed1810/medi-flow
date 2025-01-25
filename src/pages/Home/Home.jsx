import React from 'react';

import Banner from './Banner/Banner';
import { Helmet } from 'react-helmet';
import PopularCamps from './PopularCamps/PopularCamps';

const Home = () => {
    return (
        <>
            <Helmet>
                <title>Mediflow | Home</title>
            </Helmet>
            <div className='mt-20'>
                <Banner></Banner>
            </div>
            <div className='mt-10'>
                <PopularCamps></PopularCamps>
            </div>
        </>

    );
};

export default Home;
import React from 'react';

import Banner from './Banner/Banner';
import { Helmet } from 'react-helmet';

const Home = () => {
    return (
        <>
            <Helmet>
                <title>Mediflow | Home</title>
            </Helmet>
            <div className='mt-20'>
                <Banner></Banner>
            </div>
        </>

    );
};

export default Home;
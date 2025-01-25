import React from 'react';

import Banner from './Banner/Banner';
import { Helmet } from 'react-helmet';
import PopularCamps from './PopularCamps/PopularCamps';
import FeedbackSection from './Feedback and Analytics/FeedbackSection';

import Faq from './Feedback and Analytics/Faq';



  

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
            <div>
                <FeedbackSection ></FeedbackSection>
                <Faq></Faq>
            </div>
        </>

    );
};

export default Home;
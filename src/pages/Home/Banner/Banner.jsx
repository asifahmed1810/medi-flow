import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Pagination, Navigation, Autoplay } from 'swiper/modules';
import health from '../../../assets/health.jpg';
import dental from '../../../assets/dental.jpg';
import mental from '../../../assets/Mental Health Awareness Camp.jpg';

const Banner = () => {
    // Array of success stories
    const slides = [
        {
            image: health,
            title: 'Free Health Check-Up Camp',
            description: 'Provided health services to over 500 participants.',
        },
        {
            image: dental,
            title: 'Specialized Dental Care Camp',
            description: 'Improved dental health for 300 children.',
        },
        {
            image: mental,
            title: 'Women Health Awareness Camp',
            description: 'Empowered over 200 women with essential health education.',
        },
    ];

    return (
        <div className="banner w-full">
            <div className='w-3/4 space-y-3 mx-auto mt-24 mb-8'>
                <h1 className='text-3xl font-semibold text-center'>Empowering Communities Through Free Healthcare Services</h1>
                <p className='text-center'>Join us for a free medical camp dedicated to promoting health and wellness in our community. Receive expert consultations, basic health check-ups, and essential medical guidance from qualified professionals—all at no cost. This initiative aims to provide accessible healthcare services, raise awareness about preventive measures, and ensure everyone has the opportunity to prioritize their health. Together, let’s build a healthier tomorrow!</p>
            </div>
            <Swiper
                modules={[Pagination, Navigation, Autoplay]}
                pagination={{ clickable: true }}
                navigation={true}
                autoplay={{ delay: 3000, disableOnInteraction: false }}
                loop={true}
                className="h-[400px] rounded-lg"
            >
                {slides.map((slide, index) => (
                    <SwiperSlide key={index}>
                        <div
                            className="relative  h-full"
                            style={{
                                backgroundImage: `url(${slide.image})`,
                                backgroundSize: 'cover',
                                backgroundPosition: 'center',
                            }}
                        >
                            <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center text-center text-white p-6">
                                <h2 className="text-3xl font-bold mb-2">{slide.title}</h2>
                                <p className="text-lg">{slide.description}</p>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default Banner;

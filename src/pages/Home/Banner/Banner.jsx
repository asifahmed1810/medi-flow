import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Pagination, Navigation, Autoplay } from 'swiper/modules';

const Banner = () => {
    // Array of success stories
    const slides = [
        {
            image: 'https://via.placeholder.com/1200x400?text=Medical+Camp+1',
            title: 'Free Health Check-Up Camp',
            description: 'Provided health services to over 500 participants.',
        },
        {
            image: 'https://via.placeholder.com/1200x400?text=Medical+Camp+2',
            title: 'Specialized Dental Care Camp',
            description: 'Improved dental health for 300 children.',
        },
        {
            image: 'https://via.placeholder.com/1200x400?text=Medical+Camp+3',
            title: 'Women Health Awareness Camp',
            description: 'Empowered over 200 women with essential health education.',
        },
    ];

    return (
        <div className="banner w-full">
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

import React from 'react';
import Slider from 'react-slick'; // React Slick
import { FaApple } from 'react-icons/fa';
import { SiAutodesk, SiI3 } from 'react-icons/si';
import { SiAdobe } from 'react-icons/si';
import { BsPeopleFill } from 'react-icons/bs';
import { GrCertificate } from 'react-icons/gr';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css"; 

const EducationPartner = () => {
  // Settings for the slider
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <div className="bg-gray-100 h-[250px] p-8">
      {/* Partners Section */}
      <div className='pt-6'>
      <section className="text-center mb-12">
        <h2 className="text-3xl font-bold mb-6">Our Educational Partners</h2>
        
        <div className="w-full pt-8">
          <Slider {...sliderSettings}>
            <div className="flex justify-center">
              <SiAutodesk className="text-5xl text-black" />
            </div>
            <div className="flex justify-center">
              <SiAdobe className="text-5xl text-red-600" />
            </div>
            <div className="flex justify-center">
              <FaApple className="text-5xl text-black" />
            </div>
            <div className="flex justify-center">
              <SiI3 className="text-5xl text-green-600" />
            </div>
            <div className="flex justify-center">
              <GrCertificate className="text-5xl text-orange-600" />
            </div>
            <div className="flex justify-center">
              <BsPeopleFill className="text-5xl text-yellow-600" />
            </div>
          </Slider>
        </div>
      </section>
      </div>
    </div>
  );
};

export default EducationPartner;

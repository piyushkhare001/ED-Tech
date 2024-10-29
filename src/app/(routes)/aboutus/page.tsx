"use client";
import NavBar from '@/components/frontend/Navbar';
import Image from 'next/image';
import React from 'react';
import { FaCheckCircle } from 'react-icons/fa';
import aboutusimg from '@/assets/aboutusimg.jpg';
import EducationPartner from '@/components/frontend/EducationPartner';
import Counter from '@/components/frontend/Counter';
import Footer from '@/components/frontend/footer';

const AboutUs: React.FC = () => {
  return (
   <div>
     <NavBar/>
    <div className="min-h-screen bg-gray-50 p-6 md:p-12 flex items-center justify-center">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between">
          {/* Left Section: Text */}
          <div className="md:w-1/2 p-4 lg:-ml-7 lg:-mt-16">
            <h1 className="sm:text-4xl lg:text-5xl font-bold mb-4">
              We Providing The <span className="text-red-500">Best Quality</span> Online Courses
            </h1>
            <p className="text-gray-600 font-medium mb-4">
              Desiznideaz Private Limited is an IT services and IT consulting company that offers software development and training courses. The company is based in Patna, Bihar and was founded in 2021. Desiznideaz is a training partner of Autodesk, Microsoft, EC-Council, Cisco, and Adobe.
            </p>
            <ul className="space-y-2">
              <li className="flex items-center text-lg font-medium">
                <FaCheckCircle className="text-yellow-500 mr-2" />
                Flexible Classes
              </li>
              <li className="flex items-center text-lg font-medium">
                <FaCheckCircle className="text-yellow-500 mr-2" />
                Offline Class Mode
              </li>
              <li className="flex items-center text-lg font-medium">
                <FaCheckCircle className="text-yellow-500 mr-2" />
                Educator Support
              </li>
            </ul>
          </div>

          {/* Right Section: Image */}
          <div className="md:w-1/2 p-4 flex justify-center lg:-mr-10 lg:-mt-16">
            <div className="relative">
              <Image
                  src={aboutusimg}
                  alt='about'
                  width={500}
                  height={100}
                  className='h-[300px] w-[500px] rounded-lg'
              />
            </div>
          </div>
        </div>
      </div>
    </div>
    <EducationPartner/>
     <Counter/>
     <div className="h-[350px]">
        <div className="pt-12">
          <h1
            className="text-xl lg:text-3xl font-bold leading-snug text-black text-center"
          >
            Want to Work With Us ?
          </h1>
          <p
            className="text-2xl lg:text-4xl font-bold text-black text-center pt-10"
          >
            Register As{" "}
            <span className="text-red-500 font-bold">DESIZNIDEAZ</span>{" "}
            Student Partner
          </p>
          <div
            className="transition-all duration-300 justify-center items-center text-center pt-10"
          >
            <button className="w-[160px] h-[60px] font-semibold text-xl rounded-md bg-[#26b89f] text-white hover:bg-[#1e8f7c] hover:text-white">
                Register Now
            </button>
          </div>
        </div>

      </div>
      <Footer/>
    </div>
  );
};

export default AboutUs;

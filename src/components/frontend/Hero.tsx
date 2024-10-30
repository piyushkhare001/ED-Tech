import React from "react";
import hero from "../../assets/hero.png";
import certification from "../../assets/certification.jpg";
import Image from "next/image";
import {motion} from "framer-motion";
import { AiFillStar } from 'react-icons/ai';
import {
  FaBusinessTime,
  FaCamera,
  FaChalkboardTeacher,
  FaLaptopCode,
  FaPaintBrush,
  FaSearchDollar,
} from "react-icons/fa";
import { SiAlwaysdata } from "react-icons/si";
import { FaMoneyBillTrendUp } from "react-icons/fa6";
import { IoLanguage } from "react-icons/io5";
import EducationPartner from "./EducationPartner";
import Stats from "./Stats";
import Counter from "./Counter";

export const FadeUp = (delay: number) => {
  return {
    initial: {
      opacity: 0,
      y: 50,
    },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        duration: 0.5,
        delay: delay,
        ease: "easeInOut",
      },
    },
  };
};

const ServicesData = [
  { title: "Business Management", icon: <FaBusinessTime className="text-4xl text-teal-500" /> },
    { title: "Programming", icon: <FaLaptopCode className="text-4xl text-red-400" /> },
    { title: "Art & Craft", icon: <FaPaintBrush className="text-4xl text-yellow-500" /> },
    { title: "Data Science", icon: <FaChalkboardTeacher className="text-4xl text-green-500" /> },
    { title: "Video & Photography", icon: <FaCamera className="text-4xl text-purple-500" /> },
    { title: "Finance", icon: <FaSearchDollar className="text-4xl text-pink-500" /> },
    { title: "Language", icon: <FaChalkboardTeacher className="text-4xl text-indigo-500" /> },
]

const Certification = [
  {
    id: 1,
    title: "Web Development",
    icon: (
      <Image
        src={certification}
        alt="Pic"
        width={50}
        height={20}
        className="w-[70px] h-[65px] rounded-full"
      />
    ),
    delay: 0.2,
  },
  {
    id: 2,
    title: "Programing with Python",
    icon: (
      <Image
        src={certification}
        alt="Pic"
        width={50}
        height={20}
        className="w-[70px] h-[65px] rounded-full"
      />
    ),
    delay: 0.3,
  },
  {
    id: 1,
    title: "Digital Marketing",
    icon: (
      <Image
        src={certification}
        alt="Pic"
        width={50}
        height={20}
        className="w-[70px] h-[65px] rounded-full"
      />
    ),
    delay: 0.4,
  },
  {
    id: 1,
    title: "Machine Learning",
    icon: (
      <Image
        src={certification}
        alt="Pic"
        width={50}
        height={20}
        className="w-[70px] h-[65px] rounded-full"
      />
    ),
    delay: 0.5,
  },
];

const SlideLeft = (delay: number) => {
  return {
    initial: {
      opacity: 0,
      x: 50,
    },
    animate: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.5,
        delay: delay,
        ease: "easeInOut",
      },
    },
  };
};

const courses = [
  {
    title: 'Web Development',
    rating: 4.2,
    students: '91,233',
    weeks: '6 Weeks',
  },
  {
    title: 'Programming with Python',
    rating: 4.1,
    students: '94,243',
    weeks: '8 Weeks',
  },
  {
    title: 'Digital Marketing',
    rating: 4.4,
    students: '50,233',
    weeks: '5 Weeks',
  },
  {
    title: 'Machine Learning',
    rating: 4.1,
    students: '81,233',
    weeks: '10 Weeks',
  },
];

const CourseCard = ({
  title,
  rating,
  students,
  weeks,
}: {
  title: string;
  rating: number;
  students: string;
  weeks: string;
}) => (
  <div className="bg-white shadow-md rounded-lg p-6 text-center flex flex-col items-center space-y-4">
    <div className="flex items-center justify-center w-16 h-16 rounded-full bg-blue-100">
      {/* Placeholder for the icon/image */}
      <span className="text-3xl text-blue-500">💻</span>
    </div>
    <h3 className="text-lg font-semibold">{title}</h3>
    <p>{weeks}</p>
    <div className="flex items-center space-x-1">
      <AiFillStar className="text-yellow-500" />
      <span className="font-semibold">{rating.toFixed(1)}</span>
    </div>
    <p className="text-gray-600">{students} students</p>
    <button className="mt-4 text-blue-500 hover:underline">Know more</button>
  </div>
);

const Hero = () => {
  return (
    <section className="bg-[#f7f8f8] overflow-hidden relative">
      <div className="container grid grid-cols-1 md:grid-cols-2 min-h-[650px] pb-6">
        {/* info section */}
        <div className="flex flex-col justify-center py-14 md:py-0 relative z-20">
          <div className="text-center md:text-left space-y-10 lg:max-w-[400px]">
            <motion.h1
              variants={FadeUp(0.6)}
              initial="initial"
              animate="animate"
              className="text-3xl lg:text-5xl font-bold leading-snug text-black"
            >
              A broad Selection of Courses
            </motion.h1>
            <motion.p
              variants={FadeUp(0.6)}
              initial="initial"
              animate="animate"
              className="text-lg lg:text-xl text-gray-600 font-medium  "
            >
              Choose from several online courses with new additions published
              every month
            </motion.p>
            <motion.div
              variants={FadeUp(0.7)}
              initial="initial"
              animate="animate"
              className="justify-center flex md:justify-start transition-all duration-300"
            >
              <button className="w-[150px] h-[60px] font-semibold text-xl rounded-md bg-[#2dccb2] text-white hover:bg-[#1e8f7c] hover:text-white">
                Find Courses
              </button>
            </motion.div>
          </div>
        </div>
        {/* Image section */}
        <motion.div
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4, ease: "easeInOut" }}
          className="flex justify-center items-center"
        >
          <Image
            src={hero}
            alt="Hero"
            width={700}
            height={10}
            className='xl:w-[600px] relative z-10 h-[390px] w-[500px] rounded-3xl" />
'
          />
        </motion.div>
      </div>
      <div className="min-h-screen bg-gradient-to-r from-green-100 to-purple-100 py-12">
        <div className="text-center mb-10">
          <motion.h2 
            variants={FadeUp(0.6)}
            initial="initial"
            animate="animate"
            className="text-red-500 text-sm font-semibold tracking-wide">CATEGORIES</motion.h2>
          <motion.h1 
            variants={FadeUp(0.6)}
            initial="initial"
            animate="animate" 
            className="text-2xl md:text-5xl font-bold text-gray-900">
            Online <span className="text-teal-500">Classes</span> For Remote Learning
          </motion.h1>
        </div>

        <div className="container mx-auto px-4">
          <motion.div 
            variants={FadeUp(0.6)}
            initial="initial"
            animate="animate"  
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {ServicesData.map((category, index) => (
              <div key={index} className="bg-white shadow-md rounded-lg p-6 flex flex-col items-center justify-center hover:shadow-xl transition duration-300 h-[240px] hover:bg-[#f7f8f8]">
                <p className="bg-[#cbe2e2] w-[70px] h-[70px] items-center rounded-full pt-[15px] pl-[15px] ">{category.icon}</p>
                <h3 className="text-lg font-semibold text-gray-700 mt-12 text-center">{category.title}</h3>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
      
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center py-12">
        <motion.h1 
            variants={FadeUp(0.6)}
            initial="initial"
            animate="animate" 
            className="sm:text-3xl lg:text-4xl font-bold mb-4">Certification Course</motion.h1>
        <motion.p
          variants={FadeUp(0.6)}
          initial="initial"
          animate="animate" 
          className="text-gray-600 mb-12 font-normal sm:text-sm lg:text-xl">Fastest way to build your CV</motion.p>
        <motion.div 
          variants={FadeUp(0.6)}
          initial="initial"
          animate="animate"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {courses.map((course, index) => (
            <CourseCard
              key={index}
              title={course.title}
              rating={course.rating}
              students={course.students}
              weeks={course.weeks}
            />
          ))}
        </motion.div>
      </div>
      <div className="min-h-screen bg-gradient-to-r from-green-50 to-purple-50 flex flex-col items-center justify-center py-12">
        <h1 className="sm:text-3xl lg:text-4xl font-bold mb-4 -pt-6">Career Advancement Courses</h1>
        <p className="text-gray-600 mb-12 font-normal sm:text-sm lg:text-xl">Guaranteed Placement Get 100% refund if you not hired Become job ready</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {courses.map((course, index) => (
            <CourseCard
              key={index}
              title={course.title}
              rating={course.rating}
              students={course.students}
              weeks={course.weeks}
            />
          ))}
        </div>
      </div>
      <EducationPartner/>
      <Counter/>
      <div className="h-[350px]">
        <div className="pt-12">
          <motion.h1
            variants={FadeUp(0.6)}
            initial="initial"
            animate="animate"
            className="text-xl lg:text-3xl font-bold leading-snug text-black text-center"
          >
            Want to Work With Us ?
          </motion.h1>
          <motion.p
            variants={FadeUp(0.6)}
            initial="initial"
            animate="animate"
            className="text-2xl lg:text-4xl font-bold text-black text-center pt-10"
          >
            Register As{" "}
            <span className="text-red-500 font-bold">DESIZNIDEAZ</span>{" "}
            Student Partner
          </motion.p>
          <motion.div
            variants={FadeUp(0.7)}
            initial="initial"
            animate="animate"
            className="transition-all duration-300 justify-center items-center text-center pt-10"
          >
            <button className="w-[160px] h-[60px] font-semibold text-xl rounded-md bg-[#26b89f] text-white hover:bg-[#1e8f7c] hover:text-white">
                Register Now
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
